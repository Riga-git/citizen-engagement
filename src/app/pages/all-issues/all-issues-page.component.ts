import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/api/issue.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IssuesDataSources } from '../../models/issue-data-sources';
import { Issue } from 'src/app/models/issue';
import { latLng, MapOptions, tileLayer, Map, Marker } from 'leaflet';



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

  constructor(private issueService: IssueService, private snackBar: MatSnackBar) {
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
  }

  ngOnInit(): void {
      this.dataSource= new IssuesDataSources(this.issueService, this.snackBar);
      this.dataSource.loadIssues();
      this.dataSource.issuesList$.subscribe({
        next : (issueList) => {this.issueList = issueList; this.updateMap();}
      });
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
