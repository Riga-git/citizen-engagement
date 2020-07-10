import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component'
import { ReportIssuePageComponent } from './report-issue-page/report-issue-page.component';
import { MyIssuesPageComponent } from './my-issues-page/my-issues-page.component'
import { AllIssuesPageComponent } from './all-issues/all-issues-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './admin/admin.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

@NgModule({
  declarations: [
    ReportIssuePageComponent,
    UserPageComponent,
    MyIssuesPageComponent,
    AllIssuesPageComponent,
    AdminComponent,
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    LeafletModule,
    MaterialFileInputModule,
    MatIconModule
  ],
  exports : [
    ReportIssuePageComponent,
    UserPageComponent,
    MyIssuesPageComponent,
    AllIssuesPageComponent
  ]
})
export class PagesModule { }
