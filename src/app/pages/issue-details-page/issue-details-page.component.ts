import { Component, OnInit, ViewChild } from '@angular/core';
import { IssueService } from 'src/app/api/issue.service';
import { latLng, MapOptions, tileLayer, Map, Marker, marker, LeafletMouseEvent, Point } from 'leaflet';
import { NgForm } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, pluck } from 'rxjs/operators';
import { Issue } from 'src/app/models/issue';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IssueComment } from 'src/app/models/IssueComment';

@Component({
  selector: 'app-issue-details-page',
  templateUrl: './issue-details-page.component.html',
  styleUrls: ['./issue-details-page.component.scss']
})

export class IssueDetailsPageComponent {

  description : string = "";
  tagsString : string = "";
  mapOptions : MapOptions = {};
  map : Map;
  mapMarkers : Marker[] = [];
  images = new FileInput(null);
  chosesIssueType : string = "";
  editMode  : Boolean;
  currentIssue : Issue;
  newComment = new IssueComment();
  comments : IssueComment[] = [];

  constructor(private issueService: IssueService, private snackBar: MatSnackBar, private route: ActivatedRoute, private location :Location, private router : Router ) { 
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

    this.currentIssue = new Issue; // avoid error currentIssue 'undifined' before the data are fetched

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.issueService.getIssue(params.get('id'))
          .subscribe({ next: (issue) => {this.currentIssue = issue; this.displayMarker(); this.getcomments(issue.id);}});
      });
  }

  onMapReady(map : Map) : void {
    this.map = map;
  }

  updateMarker(e: LeafletMouseEvent): void {
    if (this.editMode) {
      let tmpMarker: Marker = marker([0, 0]).setLatLng(e.latlng);
      if (!this.mapMarkers.length) {
        this.mapMarkers.push(tmpMarker);
      } else {
        this.mapMarkers[0] = tmpMarker;
      }
    }
  }

  displayMarker(): void {
    //in a GeoJson object latitude and longitude are reversed relative to a marker.
  
    let lat : number;
    let lon : number;
    lon = this.currentIssue.location['coordinates'][0];
    lat = this.currentIssue.location['coordinates'][1];
    let tmpMarker : Marker = marker([0,0]).setLatLng([lat, lon]);
    if (!this.mapMarkers.length){
      this.mapMarkers.push(tmpMarker);
    }else{
      this.mapMarkers[0] = tmpMarker;
    }

    // recenter the map on the marker 
    this.map.panTo(this.mapMarkers[0].getLatLng());
  }

  updateIssue(form: NgForm) {
    // Only do something if the form is valid
    if (form.valid) {
      this.issueService.updateIssue(
        this.currentIssue.id,
        this.currentIssue.description,
        this.mapMarkers[0].toGeoJSON().geometry,
        this.currentIssue.issueTypeHref,
        // ignore the index 0 because is a empty string because the separator is located before the tagName 
        this.tagsString.replace(/\s/g, "").split('#').slice(1,this.tagsString.length)
      )
      .pipe(
        finalize(() => this.editMode = false)
      )
      .subscribe({
        next : () => {this.snackBar.open('Issue reported with succes','',{panelClass : 'SnackBarSuccess', duration : 2500}), this.editMode = false},
        error : (error) => {this.snackBar.open('Sorry we were unable to update the issue. Detail : '+ error.message, 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})}
      });
    }
  }

  navigateBack() : void{
    this.location.back();
  }

  postComment() : void {
    this.issueService.postComments(this.currentIssue.id, this.newComment.text)
      .subscribe({
        next : () => {this.getcomments(this.currentIssue.id); this.newComment.text = ''},
        error : (error) => {this.snackBar.open("Sorry we were unable to post your comment. Detail :" + error.message, 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})}
      });
  }

  getcomments( issueID : string) : void {
    this.issueService.getComments(this.currentIssue.id)
    .pipe(
      pluck('body')
    )
      .subscribe({
        next : (comments) => {this.comments = []; comments.forEach(comment => this.comments.push(comment))},
        error : (error) => {this.snackBar.open("Sorry we were unable to load the comments. Detail :" + error.message, 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})}
      });
  }
}
