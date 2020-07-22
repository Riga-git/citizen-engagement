
import { Geometry } from 'geojson';

export class ReportIssuePost {
    description : String;
    imageUrl? : String;
    additionalImageUrls? : String[] = [];
    issueTypeHref : String;
    location : Geometry;
    tags? : String[] = [];
}
