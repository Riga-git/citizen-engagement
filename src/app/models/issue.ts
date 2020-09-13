import { Geometry } from 'geojson';

export type IssueState = "all" |"new" | "inProgress" | "rejected" | "resolved"; 

export class Issue {
    assigneeHref : string;
    createdAt : string;
    creatorHref : string;
    description : string;
    href : string;
    id : string;
    imageUrl : string;
    additionalImageUrls : string;
    issueTypeHref : string;
    location : Geometry;
    state : IssueState;
    tags : string[];
    updatedAt : string;
}