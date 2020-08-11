import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { IssueType } from "src/app/models/issue-type";
import { ReportIssuePost } from '../models/report-issue-post';
import { ReportIssueResponse } from '../models/report-issue-response';
import { Issue } from '../models/issue';
import { environment } from "../../environments/environement";
import { Geometry } from 'geojson';

@Injectable({
  providedIn: "root",
})
export class IssueService {

  private readonly httpHeaders: HttpHeaders;
  readonly defaultPaginatorPageSize = 10; 

  constructor(private http: HttpClient) {
    this.httpHeaders =  new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  }

  loadAllIssueTypes(): Observable<IssueType[]> {
    return this.http.get<IssueType[]>(`${environment.apiUrl}/issueTypes`);
  }

  postIssue ( description : String, 
              location : Geometry, 
              typeHref : string,
              tags? : string[], 
              imagesUrls? : File[] 
            ): Observable<ReportIssueResponse>{

    let requestContent = new ReportIssuePost();
    let additionalImages : File[] = [];

    requestContent.issueTypeHref = typeHref;
    requestContent.description = description;
    requestContent.location = location;
    requestContent.imageUrl = ((imagesUrls.length > 0) ? imagesUrls[0].name : '');
    additionalImages = imagesUrls.slice(1);
    for (const image of additionalImages) {
      requestContent.additionalImageUrls.push(image.name);
    }
    requestContent.tags = tags;
    console.log('Sent msg: ',JSON.stringify(requestContent));
    return this.http.post<ReportIssueResponse>(`${environment.apiUrl}/issues`,requestContent);
  }

  addNewType(name : string, description? : string): Observable<IssueType> {
    let newType = new IssueType();
    newType.name = name;
    newType.description = description;
    console.log(newType);
    return this.http.post<IssueType>(`${environment.apiUrl}/issueTypes`, JSON.stringify(newType), {headers : this.httpHeaders});
  }

  getIssues(currentPage = 1 , pageSize=this.defaultPaginatorPageSize, search? :String , state?:String[]) : Observable<any> {
    let params = new HttpParams().set('page', currentPage.toString()).set('pageSize', pageSize.toString())

    return this.http.get<any>(`${environment.apiUrl}/issues`, {headers : this.httpHeaders, params : params, observe: 'response'});
  }
}

