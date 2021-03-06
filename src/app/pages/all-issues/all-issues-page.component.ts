import { Component, OnInit, ViewChild } from '@angular/core';
import { IssueService } from 'src/app/api/issue.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IssuesDataSources } from '../../dataSources/issue-data-sources';
import { Issue, IssueState } from 'src/app/models/issue';
import { latLng, MapOptions, tileLayer, Map, Marker, marker } from 'leaflet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable} from '@angular/material/table';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-all-issues',
  templateUrl: './all-issues-page.component.html',
  styleUrls: ['./all-issues-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AllIssuesPageComponent implements OnInit {

  dataSource: IssuesDataSources;
  displayedColumns: string[] = ['Description'];
  mapOptions : MapOptions = {};
  issueList : Issue[] = [];
  map : Map;
  mapMarkers : Marker[] = [];
  itemsPerPage : Number;
  expandedIssue : Issue | null;
  searchText : string = "";
  issueStatus : IssueState;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) Table: MatTable<any>;

  constructor(private issueService: IssueService, 
              private router : Router, 
              private snackBar: MatSnackBar,
              public auth : AuthService) {}

  ngOnInit(): void {

    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
    
    this.itemsPerPage = this.issueService.defaultPaginatorPageSize;

    this.dataSource = new IssuesDataSources(this.issueService);
    this.dataSource.loadIssues();
    this.dataSource.issuesList$.subscribe({
      next: (issueList) => this.issueList = issueList
    });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe({
          next : () => this.dataSource.loadIssues(this.paginator.pageIndex+1, 
                                                  this.paginator.pageSize)
        });
}

  onRowClickedExpand(row): void {
    //in a GeoJson object latitude and longitude are reversed relative to a marker.
  
    this.expandedIssue = this.expandedIssue === row ? null : row ;
    let lat : number;
    let lon : number;
    lon = row.location.coordinates[0];
    lat = row.location.coordinates[1];
    let tmpMarker : Marker = marker([0,0]).setLatLng([lat, lon]);
    if (!this.mapMarkers.length){
      this.mapMarkers.push(tmpMarker);
    }else{
      this.mapMarkers[0] = tmpMarker;
    }
    // recenter the map on the marker 
    this.map.panTo(this.mapMarkers[0].getLatLng());
  }

  onCardClicked(id) : void{
    let clickedCard = this.issueList.find(issue => issue.id === id)
    if (clickedCard !== undefined)
    {
      this.onRowClickedExpand(clickedCard);
    } 
  }

  onMapReady(map : Map) : void {
    this.map = map;
  }

  moreDetails(id) : void {
    this.router.navigate([ '/issue', id ]);
  }

  deleteIssue(id) : void {
    this.issueService.deleteIssue(id).subscribe({
      next : () => {  this.snackBar.open('Issue deleted with succes','',
                      {panelClass : 'SnackBarSuccess', duration : 2500}), 
                     this.dataSource.loadIssues();},
      error : (error) => this.snackBar.open('Sorry we were unable to delete the issue.  Detail : ' + error.error, 
                                            'x', {panelClass : ['SnackBarError', 'SnackBarButton']})
    });
  }

  filterIssue() : void{
    this.dataSource.loadIssues(undefined, undefined, this.searchText, [this.issueStatus]);
  }
}
