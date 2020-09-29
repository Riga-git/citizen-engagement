import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component'
import { ReportIssuePageComponent } from './report-issue-page/report-issue-page.component';
import { AllIssuesPageComponent } from './all-issues/all-issues-page.component';
import { IssueDetailsPageComponent } from './issue-details-page/issue-details-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router'
import { MatListModule } from '@angular/material/list';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { CardComponent } from '../customComponents/card/card.component';
import { MatChipsModule } from '@angular/material/chips';
import { CommentsListComponent } from '../customComponents/comments-list/comments-list.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ReportIssuePageComponent,
    UserPageComponent,
    AllIssuesPageComponent,
    AdminPageComponent,
    AdminPageComponent,
    IssueDetailsPageComponent,
    SignUpPageComponent,
    CardComponent,
    CommentsListComponent,
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
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCardModule,
    MatDividerModule,
    RouterModule,
    MatListModule,
    MatChipsModule,
    MatDialogModule
  ],
  exports : [
    ReportIssuePageComponent,
    UserPageComponent,
    AllIssuesPageComponent,
    CardComponent
  ]
})
export class PagesModule { }
