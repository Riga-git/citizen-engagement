import { Component, OnInit, ViewChild } from '@angular/core';
import { IssueService } from 'src/app/api/issue.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IssuesDataSources } from '../../models/issue-data-sources';
import { Issue } from 'src/app/models/issue';
import { latLng, MapOptions, tileLayer, Map, Marker } from 'leaflet';
import { tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableModule } from '@angular/material/table';



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
    this.paginator.page
        .pipe(
            tap(() => {this.dataSource.loadIssues(this.paginator.pageIndex, this.paginator.pageSize)})
        )
        .subscribe();
}

  onRowClicked(row): void {
    console.log(row)
    console.log('issuelist', this.issueList);
  }

  updateMap() : void{
;
  }

  onMapReady(map : Map) : void {
    this.map = map;
  }

}
