import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueDetailsPageComponent } from './issue-details-page.component';

describe('IssueDetailsPageComponent', () => {
  let component: IssueDetailsPageComponent;
  let fixture: ComponentFixture<IssueDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
