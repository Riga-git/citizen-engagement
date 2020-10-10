import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../security/auth.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user : User;

  constructor(private authService : AuthService) { 
    this.user = new User();
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next : (user) => this.user = user,
      error: (err) => console.error('Not logged')
    });
  }

}