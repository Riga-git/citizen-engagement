import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/api/issue.service';
import { latLng, MapOptions, tileLayer, Map, Marker, marker, LeafletMouseEvent, Point } from 'leaflet';
import { NgForm } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { IssueType } from 'src/app/models/issue-type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report-issue-page',
  templateUrl: './report-issue-page.component.html',
  styleUrls: ['./report-issue-page.component.scss'],
})
export class ReportIssuePageComponent implements OnInit {

  description : string = "";
  tagsString : string = "";
  mapOptions : MapOptions = {};
  map : Map;
  mapMarkers : Marker[] = [];
  images = new FileInput(null);
  chosesIssueType : string = "";
  issueTypes : IssueType[] = [];

  constructor(private issueService: IssueService, private snackBar: MatSnackBar ) { 
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
    // Ask the service to make an API call on component initialisation
    this.issueService.loadAllIssueTypes().subscribe({
      next: (result) => {result.forEach(element => this.issueTypes.push(element)); console.log(result);},
      error: () => this.snackBar.open('Sorry something went wrong...', 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})
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

  addNewIssue(form: NgForm) {
    // Only do something if the form is valid
    if (form.valid) {
      this.issueService.postIssue(
        this.description,
        this.mapMarkers[0].toGeoJSON().geometry,
        this.chosesIssueType,
        // ignore the index 0 because is a empty string because the separator is located before the tagName 
        this.tagsString.replace(/\s/g, "").split('#').slice(1,this.tagsString.length), 
        this.images.files
      ).subscribe({
        next : () => {this.snackBar.open('Issue reported with succes','',{panelClass : 'SnackBarSuccess', duration : 2500}), this.resetForm(form)},
        error : (error) => {this.snackBar.open('Sorry something went wrong...', 'x', {panelClass : ['SnackBarError', 'SnackBarButton']}); console.log(error);}
      });
    }
  }

  private resetForm(form : NgForm) {
    form.reset();
    this.mapMarkers = [];
    this.images = new FileInput(null);
  }
}
