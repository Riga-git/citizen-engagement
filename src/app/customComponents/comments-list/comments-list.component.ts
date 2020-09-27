import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { IssueComment } from 'src/app/models/IssueComment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  @Input() comments: IssueComment[] = [];
  @Input() display: boolean;

  @Output() postCommentClicked : EventEmitter<string> = new EventEmitter(); 

  commentText : string;
  
  constructor() { }

  ngOnInit(): void {
  }

  postComment(){
    this.postCommentClicked.emit(this.commentText);
  }
}
