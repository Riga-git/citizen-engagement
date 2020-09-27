import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Issue } from 'src/app/models/issue';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent{

 @Input() issue: Issue = new Issue;
 @Output() deleteClicked : EventEmitter<string> = new EventEmitter(); 
 @Output() moreClicked : EventEmitter<string> = new EventEmitter(); 
 @Output() cardClicked : EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  onCardClicked(id) : void{
    this.cardClicked.emit(id);
  }

  onMoreClicked(id) : void {
    this.moreClicked.emit(id);
  }

  onDeleteClicked(id) : void {
    this.deleteClicked.emit(id);
  }

}
