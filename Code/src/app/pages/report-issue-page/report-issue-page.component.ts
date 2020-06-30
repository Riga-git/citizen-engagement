import { Component, OnInit } from '@angular/core';
import { IssueTypeService } from 'src/app/api/issue-type.service';

@Component({
  selector: 'app-report-issue-page',
  templateUrl: './report-issue-page.component.html',
  styleUrls: ['./report-issue-page.component.scss']
})
export class ReportIssuePageComponent implements OnInit {

  description : string = "fkjsfjgklfjglksjdglk";
  tagsString  : string;
  tasStringArray  : string[];

  constructor(private issueTypeService: IssueTypeService) { }

  ngOnInit(): void {
    // Ask the service to make an API call on component initialisation
    this.issueTypeService.loadAllIssueTypes().subscribe({
      next: (result) => console.log("Issue types", result),
      error: (error) => console.warn("Error", error),
    });
  }
}
