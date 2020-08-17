import { ReportIssueFormat } from './report-issue-format';

export class ReportIssueResponse extends ReportIssueFormat {
    readonly assignedHref : String;
    readonly creatorHref : String;
    readonly description : String;
    readonly href : String;
    readonly id : String;
    readonly updatedAt : String;
}