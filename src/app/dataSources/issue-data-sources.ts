import { Issue } from '../models/issue';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { finalize, pluck, map, tap } from 'rxjs/operators';
import { IssueService } from '../api/issue.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export class IssuesDataSources implements DataSource<Issue> {

    private issueSubject = new BehaviorSubject<Issue[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private snackBar: MatSnackBar;
  
    public loading$ = this.loadingSubject.asObservable();
    public issuesList$ = this.issueSubject.asObservable();
    public totalItems : number;
  
    constructor(private issueService: IssueService) {}
  
    connect(collectionViewer: CollectionViewer): Observable<Issue[]> {
      return this.issueSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
      this.issueSubject.complete();
      this.loadingSubject.complete();
    }
  
    loadIssues(currentPage= 1 , 
              pageSize=this.issueService.defaultPaginatorPageSize, 
              search? :string , state?:string[]) {
      this.loadingSubject.next(true);
      this.issueService.getIssues(currentPage,pageSize,search,state)
        .pipe(
          tap(response => this.totalItems = + response.headers.get('Pagination-Total')),
          pluck('body'),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe({
          next: (issues) => {this.issueSubject.next(issues)},
          error: (error) => this.snackBar.open('Sorry we were unable to get the issues list! Details '+ error,
                                               'x', {panelClass : ['SnackBarError', 'SnackBarButton']})
        });
    }
  }