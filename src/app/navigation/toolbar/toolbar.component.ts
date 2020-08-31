import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../sidenav.service';
import { AuthService } from '../../security/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private sidenavService : SidenavService, public AuthService : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  toggleSidenav() : void {
    this.sidenavService.toggle();
  }

  logout() : void {
    this.AuthService.logout();
    this.router.navigateByUrl("/login");
  }
}
