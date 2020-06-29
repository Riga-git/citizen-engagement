import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component'
import { ReportIssuePageComponent } from './report-issue-page/report-issue-page.component';
import { MyIssuesPageComponent } from './my-issues-page/my-issues-page.component'
import { AllIssuesPageComponent } from './all-issues/all-issues-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ReportIssuePageComponent,
    UserPageComponent,
    MyIssuesPageComponent,
    AllIssuesPageComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  exports : [
    ReportIssuePageComponent,
    UserPageComponent,
    MyIssuesPageComponent,
    AllIssuesPageComponent
  ]
})
export class PagesModule { }