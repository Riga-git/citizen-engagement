import { IssueState } from './issue';

export type IssueActions = "start" |"reject" | "resolve"; 

export class ChangeIssueStatusResponse {
        createdAt : string;
        href : string;
        id : string;
        issueHref : string;
        reason : string;
        type : IssueActions;
        userHref : string;
}

