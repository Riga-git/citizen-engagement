import { Issue } from './issue';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { finalize } from 'rxjs/operators';
import { IssueService } from 'src/app/api/issue.service';


export class IssuesDataSources implements DataSource<Issue> {

    private issueSubject = new BehaviorSubject<Issue[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
  
    public loading$ = this.loadingSubject.asObservable();
    public issuesList$ = this.issueSubject.asObservable();
  
    constructor(private issueService: IssueService) { }
  
    connect(collectionViewer: CollectionViewer): Observable<Issue[]> {
      return this.issueSubject.asObservable();
    }
  
    disconnect(collectionViewer: CollectionViewer): void {
      this.issueSubject.complete();
      this.loadingSubject.complete();
    }
  
    loadIssues(currentPage = 1 , pageSize= this.issueService.defaultPaginatorPageSize, search? :String , state?:String[]) {
      this.loadingSubject.next(true);
      this.issueService.getIssues(currentPage,pageSize,search,state)
        .pipe(
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(issues => {this.issueSubject.next(issues)});
    }

  }