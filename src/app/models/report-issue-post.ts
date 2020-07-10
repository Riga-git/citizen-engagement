
import { Point } from 'leaflet';

export class ReportIssuePost {
    description : String;
    imageUrl? : String;
    additionalImageUrls? : String[] = [];
    IssueTypeHref : String;
    location : Point;
    tags? : String[] = [];
}
