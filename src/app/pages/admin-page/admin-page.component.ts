import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueService } from 'src/app/api/issue.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent{
  name : string;
  description : string;

  constructor(private issueService: IssueService, private snackBar: MatSnackBar) { }

  addNewType(form: NgForm) {
    // Only do something if the form is valid
    if (form.valid) {
       this.issueService.addNewType(this.name, this.description).subscribe({
        next : () => this.snackBar.open('Type added with succes','',{panelClass : 'SnackBarSuccess', duration : 2500}),
        error : (error) => this.snackBar.open('Sorry we were unable to add the issue type. Detail : '+ error.message, 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})
       });
    }
  }

}
