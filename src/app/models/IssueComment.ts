import { CommentAuthor } from '../models/comment-author'
import { from } from 'rxjs';
export class IssueComment {
        authorHref : string = "";
        createdAt : string = "";
        id : string = "";
        text : string = "";
        author : CommentAuthor;
}
