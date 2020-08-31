import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from "./security/login-page/login-page.component";
import { AuthGuard } from "./security/guards/auth.guard";
import { AdminGuard } from "./security/guards/admin.guard";

import { PagesModule } from './pages/pages.module'
import { ReportIssuePageComponent } from './pages/report-issue-page/report-issue-page.component';
import { AllIssuesPageComponent } from './pages/all-issues/all-issues-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { IssueDetailsPageComponent } from './pages/issue-details-page/issue-details-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';


const routes: Routes = [
  // Add this default route to redirect to dummy
  { path: "", redirectTo: "reportIssue", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "singUp", component: SignUpPageComponent},
  { path: "reportIssue", component: ReportIssuePageComponent, canActivate: [AuthGuard] },
  { path: "allIssues", component: AllIssuesPageComponent, canActivate: [AuthGuard]},
  { path: "myIssues", component:  AllIssuesPageComponent, canActivate: [AuthGuard]},
  { path: "myAccount", component:  UserPageComponent, canActivate: [AuthGuard]},
  { path: "admin", component:  AdminPageComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: "issue/:id", component:  IssueDetailsPageComponent, canActivate: [AuthGuard]},
  // Add the route to display the dummy page
];

@NgModule({
  imports: [RouterModule.forRoot(routes) , PagesModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
