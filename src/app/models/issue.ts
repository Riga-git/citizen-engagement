import { Geometry } from 'geojson';

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
    state : string; 
    tags : string[];
    updatedAt : string;
}