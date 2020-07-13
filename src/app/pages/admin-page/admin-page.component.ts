import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueService } from 'src/app/api/issue.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  name : string;
  description : string;

  constructor(private issueService: IssueService) { }

  ngOnInit(): void {
    // Ask the service to make an API call on component initialisation
    this.issueService.loadAllIssueTypes().subscribe({
      next: (result) => console.log("Issue types", result),
      error: (error) => console.warn("Error", error),
    });
  }

  addNewType(form: NgForm) {
    // Only do something if the form is valid
    if (form.valid) {
       this.issueService.addNewType(this.name, this.description).subscribe({
         next: (result) => console.log("answare : ", result),
         error: (error) => console.warn("Error", error),
       });
    }
  }

}
