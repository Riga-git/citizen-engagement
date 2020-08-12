import { Component, OnInit, ViewChild } from '@angular/core';
import { IssueService } from 'src/app/api/issue.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IssuesDataSources } from '../../models/issue-data-sources';
import { Issue } from 'src/app/models/issue';
import { latLng, MapOptions, tileLayer, Map, Marker, marker } from 'leaflet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable} from '@angular/material/table';



@Component({
  selector: 'app-all-issues',
  templateUrl: './all-issues-page.component.html',
  styleUrls: ['./all-issues-page.component.scss']
})

export class AllIssuesPageComponent implements OnInit {

  dataSource: IssuesDataSources;
  displayedColumns: string[] = ['Description'];
  issueList : Issue[] = [];
  mapOptions : MapOptions = {};
  map : Map;
  mapMarkers : Marker[] = [];
  itemsPerPage : Number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) Table: MatTable<any>;

  constructor(private issueService: IssueService) {
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
  }


  ngOnInit(): void {
      this.dataSource= new IssuesDataSources(this.issueService);
      this.dataSource.loadIssues();
      this.dataSource.issuesList$.subscribe({
        next : (issueList) => {this.issueList = issueList; this.updateMap();}
      });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe({
          next : () => this.dataSource.loadIssues(this.paginator.pageIndex+1, this.paginator.pageSize)
        })
}

  onRowClicked(row): void {
    let tmpMarker : Marker = marker([0,0]).setLatLng(row.location.coordinates);
    this.mapMarkers.push(tmpMarker);
  }

  updateMap() : void{
;
  }

  onMapReady(map : Map) : void {
    this.map = map;
  }

}
