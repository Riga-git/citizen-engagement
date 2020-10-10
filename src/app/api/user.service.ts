import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { User, Role } from '../models/user';
import { environment } from 'src/environments/environement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly httpHeaders: HttpHeaders;
  readonly defaultPaginatorPageSize = 10; 

  constructor(private http: HttpClient) {
    this.httpHeaders =  new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  }

  addNewUser (userName : string, password : string, 
              firstName : string, lastName : string, 
              role : Role = 'citizen', 
              phone? : string): Observable<User>{

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

  getUsers(currentPage = 1 , 
            pageSize=this.defaultPaginatorPageSize) : Observable<HttpResponse<User[]>> {
    let params = new HttpParams().set('page', currentPage.toString())
                                .set('pageSize', pageSize.toString());

    return this.http.get<User[]>(`${environment.apiUrl}/users`, 
                                  {headers : this.httpHeaders,
                                  params : params, 
                                  observe: 'response'});
  }

  makeUserStaff(userId : string): Observable<User>{
    return this.http.patch<User>(`${environment.apiUrl}/users/${userId}`, 
                                  {roles : ['citizen','staff']},
                                  {headers : this.httpHeaders});
  }
}
