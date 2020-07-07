import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIssuesPageComponent } from './my-issues-page.component';

describe('MyIssuesComponent', () => {
  let component: MyIssuesPageComponent;
  let fixture: ComponentFixture<MyIssuesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyIssuesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyIssuesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
