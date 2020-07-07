import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../security/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private sidenavService : SidenavService, private AuthService : AuthService, private router: Router) { }

  ngOnInit(): void { }
  
  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  logout() : void {
    this.AuthService.logout();
    this.router.navigateByUrl("/login");
  }
  
}
