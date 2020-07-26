import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/api/issue.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IssuesDataSources } from '../../models/issue-data-sources';

@Component({
  selector: 'app-all-issues',
  templateUrl: './all-issues-page.component.html',
  styleUrls: ['./all-issues-page.component.scss']
})

export class AllIssuesPageComponent implements OnInit {

  dataSource: IssuesDataSources;
  displayedColumns: string[] = ['Description'];

  constructor(private issueService: IssueService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
      this.dataSource= new IssuesDataSources(this.issueService, this.snackBar);
      this.dataSource.loadIssues();
  }

  onRowClicked(row): void {
    console.log(row)
  }

}
