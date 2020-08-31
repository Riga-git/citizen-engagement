import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User, Role } from '../models/user';
import { environment } from 'src/environments/environement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders =  new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  }

  addNewUser (userName : string, password : string, firstName : string, lastName : string, role : Role = 'citizen', phone? : string): Observable<User>{
    let body= new User;
    body.name = userName;
    body.password = password;
    body.firstname = firstName;
    body.lastname = lastName;
    body.phone = phone;
    body.roles.push(role);

    if (phone != undefined && '')
      body.phone = phone;

    return this.http.post<User>(`${environment.apiUrl}/users`,body, {headers : this.httpHeaders});
  }
}
