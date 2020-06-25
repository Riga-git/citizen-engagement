import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../security/auth.service";
import {User} from "../../../models/user";

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
  }

  getUserInfo(){
    this.user = this.authService.getUser().subscribe() // PIE AND GET ONLY NECESSARY INFO
  }

}
