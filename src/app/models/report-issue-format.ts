
import { Geometry } from 'geojson';

export class ReportIssueFormat {
    description : String;
    imageUrl? : String;
    additionalImageUrls? : String[] = [];
    issueTypeHref : String;
    location : Geometry;
    tags? : String[] = [];
}
