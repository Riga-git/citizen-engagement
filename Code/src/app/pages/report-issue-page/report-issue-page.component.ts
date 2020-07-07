import { Component, OnInit } from '@angular/core';
import { IssueTypeService } from 'src/app/api/issue-type.service';
import { latLng, MapOptions, tileLayer, Map, Marker, marker, LeafletMouseEvent } from 'leaflet';

@Component({
  selector: 'app-report-issue-page',
  templateUrl: './report-issue-page.component.html',
  styleUrls: ['./report-issue-page.component.scss']
})
export class ReportIssuePageComponent implements OnInit {

  description : string = "";
  tagsString  : string = "";
  tasStringArray  : string[];
  mapOptions : MapOptions;
  map : Map;
  mapMarkers : Marker[] = [];

  constructor(private issueTypeService: IssueTypeService) { 
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

    /*this.mapMarkers = [
      marker([ 46.778186, 6.641524 ])
    ];*/
  }

  ngOnInit(): void {
    // Ask the service to make an API call on component initialisation
    this.issueTypeService.loadAllIssueTypes().subscribe({
      next: (result) => console.log("Issue types", result),
      error: (error) => console.warn("Error", error),
    });
  }

  onMapReady(map : Map) : void {
    this.map = map;
  }

  updateMarker(e : LeafletMouseEvent) : void {
    let tmpMarker : Marker = marker([0,0]).setLatLng(e.latlng);
    if (!this.mapMarkers.length){
      this.mapMarkers.push(tmpMarker);
    }else{
      this.mapMarkers[0] = tmpMarker;
    }
  }
}