import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ToolbarComponent, SidebarComponent],
  imports: [CommonModule ,FlexLayoutModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, BrowserAnimationsModule],
  exports : [ ToolbarComponent, SidebarComponent]
})
export class NavigationModule { }
