import { Component, Inject, OnInit } from '@angular/core';
import { IssueService } from 'src/app/api/issue.service';
import { latLng, MapOptions, tileLayer, Map, Marker, marker, LeafletMouseEvent, Point } from 'leaflet';
import { NgForm } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, map, pluck, tap } from 'rxjs/operators';
import { Issue, IssueState } from 'src/app/models/issue';
import { IssueActions } from 'src/app/models/change-issue-status-response';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IssueComment } from 'src/app/models/IssueComment';
import { AuthService } from 'src/app/security/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-issue-details-page',
  templateUrl: './issue-details-page.component.html',
  styleUrls: ['./issue-details-page.component.scss']
})

export class IssueDetailsPageComponent implements OnInit{

  description : string = "";
  tagsString : string = "";
  issueState : IssueState;
  mapOptions : MapOptions = {};
  map : Map;
  mapMarkers : Marker[] = [];
  images = new FileInput(null);
  chosesIssueType : string = "";
  editMode  : Boolean;
  currentIssue : Issue = new Issue;
  updateFormIssue : Issue = new Issue;
  commentText : string = '';
  comments : IssueComment[] = [];
  commentPage : number = 1;
  totalComments : number

  constructor(private issueService: IssueService, private snackBar: MatSnackBar, 
                      private route: ActivatedRoute, private location :Location, 
                      public auth : AuthService, private dialogBox : MatDialog ) {}

  ngOnInit(){

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
          .subscribe({ next: (issue) => {this.currentIssue = issue, 
                                        this.displayMarker(), 
                                        this.getcomments(this.currentIssue.id,this.commentPage,this.issueService.getCommentsPageSize), 
                                        this.tagsString = this.tagsToString(this.currentIssue.tags),
                                        this.description = this.currentIssue.description,
                                        this.issueState = this.currentIssue.state
                                      }});
      });
  }

  private tagsToString(tags : Array<string>) : string {
    return '#' + tags.toString().split(',').join(' #');
  }

  private stringToTags(tagsString : string) : string[]{
    return tagsString.replace(/\s/g, "").split('#').slice(1,tagsString.length);
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
        this.description,
        this.mapMarkers[0].toGeoJSON().geometry,
        this.currentIssue.issueTypeHref,
        // ignore the index 0 because is a empty string because the separator is located before the tagName 
        this.stringToTags(this.tagsString)
      ).subscribe({
        next : () => {this.snackBar.open('Issue reported with succes','',{panelClass : 'SnackBarSuccess', duration : 2500}), this.editMode = false, this.currentIssue.tags = this.stringToTags(this.tagsString), this.currentIssue.description = this.description},
        error : (error) => {this.snackBar.open('Sorry we were unable to update the issue. Detail : '+ error.message, 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})}
      });
    }
  }

  navigateBack() : void{
    this.location.back();
  }

  postComment() : void {
    this.issueService.postComments(this.currentIssue.id, this.commentText)
      .subscribe({
        next : (comment) => {},
        error : (error) => {this.snackBar.open("Sorry we were unable to post your comment. Detail :" + error.message, 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})}
      });
  }

  getcomments(issueId: string, currentPage : number, pageSize : number) : void {
    this.issueService.getComments(issueId, currentPage, pageSize)
    .pipe(
      tap(response => this.totalComments = + response.headers.get('Pagination-Total')),
      pluck('body')
    )
    .subscribe({
        next : (comments) => {
                                comments.forEach(comment => this.comments.push(comment));
                                if (this.comments.length < this.issueService.getCommentsPageSize){
                                  this.commentPage = 1;}
                                else {  this.commentPage += 1;
                                       this.getcomments(issueId,this.commentPage,this.issueService.getCommentsPageSize);}
                                },
        error : (error) => {this.snackBar.open("Sorry we were unable to load the comments. Detail :" + error.message, 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})}
      });
  }

  imageDialogOpen(src : string){
    this.dialogBox.open(ImageDialogBoxComponent,{data: {src: src}});
  }

  changeIssueStatus(action : IssueActions){
    this.issueService.changeIssueStatus(action,this.currentIssue.id).subscribe({
      next : (response) => {
                              switch(response.type){
                                case 'start' : this.currentIssue.state = 'inProgress'; break;
                                case 'reject' : this.currentIssue.state = 'rejected'; break;
                                case 'resolve' : this.currentIssue.state = 'resolved'; break;}}
                                ,
      error : (error) => this.snackBar.open("Sorry we were unable to change the issue state. Detail :" + error.message, 'x',
                         {panelClass : ['SnackBarError', 'SnackBarButton']})
    });
  }
}

export interface DialogData {
  src: string;
}

@Component({
  selector: 'app-image-dialog-box',
  template: `<div class="imageContainer clickable"><img (clic)="close()" [src]="data.src" alt="image at full size"></div>`,
  styles: ['.imageContainer{display: flex; justify-content: center; align-items: center;}',
           '.imageContainer img{width : 100%;}',
          ]
})
export class ImageDialogBoxComponent{

  constructor(
    public dialogRef: MatDialogRef<ImageDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA)  public data: DialogData) {}

  close(): void {
    this.dialogRef.close();
  }
}