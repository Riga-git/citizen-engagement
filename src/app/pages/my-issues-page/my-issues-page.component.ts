import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-issues',
  templateUrl: './my-issues-page.component.html',
  styleUrls: ['./my-issues-page.component.scss']
})
export class MyIssuesPageComponent implements OnInit {

  a : String;

  constructor() { }

  ngOnInit(): void {
  }

}
