import { Component, OnInit, Input} from '@angular/core';
import { Issue } from 'src/app/models/issue';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {

 @Input() issue: Issue;

  constructor() { }

  ngOnInit(): void {
  }

  onCardClicked(id) : void{
    ;
  }

  moreDetails() : void {
    ;
  }

  deleteIssue() : void {
    ;
  }

}
