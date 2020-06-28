import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component'
import { ReportIssuePageComponent } from './report-issue-page/report-issue-page.component';
import { MyIssuesComponent } from './my-issues/my-issues.component';
import { AllIssuesComponent } from './all-issues/all-issues-page.component';¨


@NgModule({
  declarations: [
    ReportIssuePageComponent,
    UserPageComponent,
    MyIssuesComponent,
    AllIssuesComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    ReportIssuePageComponent,
    UserPageComponent,
    MyIssuesComponent,
    AllIssuesComponent
  ]
})
export class PagesModule { }
