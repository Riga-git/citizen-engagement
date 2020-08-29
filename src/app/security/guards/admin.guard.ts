import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../auth.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return (
        this.auth
          // Use this to check if the user is authenticated
          .getUser()
          // If they're authenticated, return true, otherwise, returns an UrlTree to redirect to the login page
          .pipe(map((user) => (user.roles.toString().includes('staff') ? true : false)))
      );
    }
  }