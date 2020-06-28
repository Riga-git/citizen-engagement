import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../sidenav.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private sidenavService : SidenavService) { }

  ngOnInit(): void { }
  
  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
  
}
