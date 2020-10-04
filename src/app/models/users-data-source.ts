import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { finalize, pluck, map, tap } from 'rxjs/operators';
import { IssueService } from 'src/app/api/issue.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './user';
import { UserService } from '../api/user.service';

export class UsersDataSource implements DataSource<User> {

    private userSubject = new BehaviorSubject<User[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private snackBar: MatSnackBar;
  
    public loading$ = this.loadingSubject.asObservable();
    public usersList$ = this.userSubject.asObservable();
    public totalItems : number;
  
    constructor(private userService: UserService) {}
  
    connect(collectionViewer: CollectionViewer): Observable<User[]> {
      return this.userSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
      this.userSubject.complete();
      this.loadingSubject.complete();
    }
  
    loadUsers(currentPage= 1 , pageSize=this.userService.defaultPaginatorPageSize, search? :string , state?:string[]) {
      this.loadingSubject.next(true);
      this.userService.getUsers(currentPage,pageSize)
        .pipe(
          tap(response => this.totalItems = + response.headers.get('Pagination-Total')),
          pluck('body'),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe({
          next: (users) => {this.userSubject.next(users)},
          error: (error) => this.snackBar.open("Sorry we were unable to get the user's list! Details "+ error, 'x', {panelClass : ['SnackBarError', 'SnackBarButton']})
        });
    }

  }