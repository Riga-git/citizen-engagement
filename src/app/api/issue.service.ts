import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { IssueType } from "src/app/models/issue-type";
import { ReportIssuePost } from '../models/report-issue-post';
import { ReportIssueResponse } from '../models/report-issue-response';
import { environment } from "../../environments/environement";
import { Point } from 'leaflet';

@Injectable({
  providedIn: "root",
})
export class IssueService {
  constructor(private http: HttpClient) {}

  loadAllIssueTypes(): Observable<IssueType[]> {
    return this.http.get<IssueType[]>(`${environment.apiUrl}/issueTypes`);
  }

  postIssue ( description : String, 
              location : Point, 
              tags? : String[], 
              imagesUrls? : File[] 
            ): void{

    let requestContent = new ReportIssuePost();
    let additionalImages : File[] = [];

    requestContent.IssueTypeHref = "/api/issueTypes/58c55a0af2dc592bf95e5d86";
    requestContent.description = description;
    requestContent.location = location;
    requestContent.imageUrl = ((imagesUrls.length > 0) ? imagesUrls[0].name : '');
    additionalImages = imagesUrls.slice(1);
    for (const image of additionalImages) {
      requestContent.additionalImageUrls.push(image.name);
    }
    requestContent.tags = tags;
    
    console.log(JSON.stringify(requestContent));

    //this.http.post(`${environment.apiUrl}/issues`,requestContent);
  }
}

