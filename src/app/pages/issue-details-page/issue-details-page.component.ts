import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/api/issue.service';
import { latLng, MapOptions, tileLayer, Map, Marker, marker, LeafletMouseEvent, Point } from 'leaflet';
import { NgForm } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { IssueType } from 'src/app/models/issue-type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { Issue } from 'src/app/models/issue';
import { ActivatedRoute, ParamMap } from '@angular/router';

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


  constructor(private issueService: IssueService, private snackBar: MatSnackBar, private route: ActivatedRoute ) { 
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

    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.issueService.getIssue(params.get('id'))
          .subscribe({ next: (issue) => this.currentIssue = issue });
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

  UpdateIssue(form: NgForm) {
    // Only do something if the form is valid
    if (form.valid) {
      this.issueService.postIssue(
        this.description,
        this.mapMarkers[0].toGeoJSON().geometry,
        this.chosesIssueType,
        // ignore the index 0 because is a empty string because the separator is located before the tagName 
        this.tagsString.replace(/\s/g, "").split('#').slice(1,this.tagsString.length), 
        this.images.files
      )
      .pipe(
        finalize(() => !this.editMode)
      )
      .subscribe({
        next : () => this.snackBar.open('Issue reported with succes','',{panelClass : 'SnackBarSuccess', duration : 2500}),
        error : (error) => this.snackBar.open('Sorry something went wrong...', 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})
      });
    }
  }
}
