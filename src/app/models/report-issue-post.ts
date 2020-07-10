
import { Geometry } from 'geojson';

export class ReportIssuePost {
    description : String;
    imageUrl? : String;
    additionalImageUrls? : String[] = [];
    IssueTypeHref : String;
    location : Geometry;
    tags? : String[] = [];
}
