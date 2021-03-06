import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { IssueType } from "src/app/models/issue-type";
import { ReportIssueFormat } from '../models/report-issue-format';
import { ReportIssueResponse } from '../models/report-issue-response';
import { Issue } from '../models/issue';
import { environment } from "../../environments/environement";
import { Geometry } from 'geojson';
import { Router } from '@angular/router';
import { IssueComment } from '../models/IssueComment';
import { ChangeIssueStatusResponse, IssueActions } from 'src/app/models/change-issue-status-response';

@Injectable({
  providedIn: "root",
})
export class IssueService {

  private readonly httpHeaders: HttpHeaders;
  readonly defaultPaginatorPageSize = 6; 
  readonly getCommentsPageSize = 50; 

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders =  new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  }

  loadAllIssueTypes(): Observable<IssueType[]> {
    return this.http.get<IssueType[]>(`${environment.apiUrl}/issueTypes`);
  }

  private prepareIssueToSend ( description: String,
                              location: Geometry,
                              typeHref: string,
                              tags?: string[],
                              imagesUrls?: string[]
                            ): ReportIssueFormat {

    let requestContent = new ReportIssueFormat();
    let additionalImages: string[] = [];

    requestContent.issueTypeHref = typeHref;
    requestContent.description = description;
    requestContent.location = location;
    if (imagesUrls !== undefined){
      requestContent.imageUrl = ((imagesUrls.length > 0) ? imagesUrls[0] : '');
      additionalImages = imagesUrls.slice(1);
      for (const image of additionalImages) {
        requestContent.additionalImageUrls.push(image);
      }
    }
    requestContent.tags = tags;
    return requestContent;
  }
  

  postIssue ( description : String,  location : Geometry, typeHref : string,
             tags? : string[], imagesUrls? : string[]): Observable<ReportIssueResponse>{

    let body = this.prepareIssueToSend(description, location,typeHref,tags,imagesUrls);
    return this.http.post<ReportIssueResponse>(`${environment.apiUrl}/issues`,
                                                body, 
                                                {headers : this.httpHeaders});
  }

  updateIssue (id : string, description : String,  location : Geometry, typeHref : string, 
    tags? : string[]): Observable<ReportIssueResponse>{

    let body = this.prepareIssueToSend(description, location,typeHref,tags);
    //let params = new HttpParams().set('id', id);
    return this.http.patch<ReportIssueResponse>(`${environment.apiUrl}/issues/${id}`,
                                                  body, 
                                                  {headers : this.httpHeaders});
}

  addNewType(name : string, description? : string): Observable<IssueType> {
    let newType = new IssueType();
    newType.name = name;
    newType.description = description;
    console.log(newType);
    return this.http.post<IssueType>(`${environment.apiUrl}/issueTypes`, 
                                      JSON.stringify(newType),
                                      {headers : this.httpHeaders});
  }

  getIssues(currentPage = 1 , 
            pageSize=this.defaultPaginatorPageSize, 
            search? : string , 
            state?:string[]) : Observable<HttpResponse<Issue[]>> {
    
    let params = new HttpParams().set('page', currentPage.toString())
                                .set('pageSize', pageSize.toString());

    if(search !='' && search != undefined) 
      params = params.set('search', search);
    if(state != undefined) 
      if(state.length) 
      params = params.set('state', state.join('&'));
    
    let url =  this.router.url === '/allIssues' ? '/issues' : '/me/issues'
    return this.http.get<Issue[]>(`${environment.apiUrl}${url}`, 
                                  {headers : this.httpHeaders, 
                                    params : params, 
                                    observe: 'response'});
  }

  getIssue(id : string) : Observable<Issue> {
    
    return this.http.get<Issue>(`${environment.apiUrl}/issues/${id}`, 
                                {headers : this.httpHeaders});
  }

  deleteIssue(id :string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/issues/${id}`);
  }

  postComments(issueId : string, commentText : string) : Observable<IssueComment>{
    return this.http.post<IssueComment>(`${environment.apiUrl}/issues/${issueId}/comments`, 
                                        {text: commentText}, 
                                        {headers : this.httpHeaders});
  }

  getComments(issueId: string, 
              currentPage : number, 
              pageSize : number) : Observable<HttpResponse<IssueComment[]>>{
    let params = new HttpParams() .set('include', 'author')
                                  .set('page', currentPage.toString())
                                  .set('pageSize', pageSize.toString());
    return this.http.get<IssueComment[]>(`${environment.apiUrl}/issues/${issueId}/comments`, 
                                        { headers: this.httpHeaders, 
                                        params: params, 
                                        observe: 'response' });
  }

  changeIssueStatus(action : IssueActions, id : string) : Observable<ChangeIssueStatusResponse>{
    return this.http.post<ChangeIssueStatusResponse>(`${environment.apiUrl}/issues/${id}/actions`, 
                                                    {reason: "test", 
                                                    type : action}, 
                                                    {headers : this.httpHeaders});
  }
}