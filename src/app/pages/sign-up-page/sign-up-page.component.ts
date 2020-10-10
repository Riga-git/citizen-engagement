import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from '../../api/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  userName : string;
  password : string;
  firstName : string;
  lastName : string;
  phone : string;

  constructor(private userService: UserService, private router: Router, private snackBar : MatSnackBar) {}

  ngOnInit(): void {
  }

  addNewUser(form: NgForm) {
    // Only do something if the form is valid
    if (form.valid) {
      this.userService.addNewUser(
        this.userName,
        this.password,
        this.firstName,
        this.lastName,
        undefined,
        this.phone,
      ).subscribe({
        next : () => {this.snackBar.open('User added','',{panelClass : 'SnackBarSuccess', 
                                          duration : 2500}); 
                      this.navigateToLoginPage();},
        error : () => {this.snackBar.open('Sorry something went wrong...', 'x', 
                            {panelClass : ['SnackBarError', 'SnackBarButton']});}
      });
    }
  }

  navigateToLoginPage () : void {
    this.router.navigateByUrl('/login');
  }
}
