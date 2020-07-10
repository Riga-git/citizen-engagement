import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from "./security/login-page/login-page.component";
import { DummyPageComponent} from "./dummy-page/dummy-page.component";
import { AuthGuard } from "./security/guards/auth.guard";
import { PagesModule } from './pages/pages.module'
import { ReportIssuePageComponent } from './pages/report-issue-page/report-issue-page.component';
import { AllIssuesPageComponent } from './pages/all-issues/all-issues-page.component';
import { MyIssuesPageComponent } from './pages/my-issues-page/my-issues-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';


const routes: Routes = [
  // Add this default route to redirect to dummy
  { path: "", redirectTo: "reportIssue", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "reportIssue", component: ReportIssuePageComponent, canActivate: [AuthGuard] },
  { path: "allIssues", component: AllIssuesPageComponent, canActivate: [AuthGuard]},
  { path: "myIssues", component:  MyIssuesPageComponent, canActivate: [AuthGuard]},
  { path: "myAccount", component:  UserPageComponent, canActivate: [AuthGuard]},
  { path: "admin", component:  AdminPageComponent, canActivate: [AuthGuard]},
  // Add the route to display the dummy page
  {
    path: "dummy",
    component: DummyPageComponent,
    // Prevent access to this page to unauthenticated users
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes) , PagesModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
