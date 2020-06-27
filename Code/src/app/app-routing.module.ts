import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent } from "./security/login-page/login-page.component";
import { DummyPageComponent} from "./dummy-page/dummy-page.component";
import { AuthGuard } from "./security/guards/auth.guard";
import { UserPageComponent } from "../app/pages/user-page/user-page/user-page.component";

const routes: Routes = [
  // Add this default route to redirect to dummy
  { path: "", redirectTo: "dummy", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "myAccount", component: UserPageComponent },
  // Add the route to display the dummy page
  {
    path: "dummy",
    component: DummyPageComponent,
    // Prevent access to this page to unauthenticated users
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
