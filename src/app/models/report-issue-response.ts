import { ReportIssuePost } from './report-issue-post';

export class ReportIssueResponse extends ReportIssuePost {
    readonly assignedHref : String;
    readonly creatorHref : String;
    readonly description : String;
    readonly href : String;
    readonly id : String;
    readonly updatedAt : String;
}