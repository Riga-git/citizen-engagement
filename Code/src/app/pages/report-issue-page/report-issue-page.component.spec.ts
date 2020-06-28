import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIssuePageComponent } from './report-issue-page.component';

describe('ReportIssuePageComponent', () => {
  let component: ReportIssuePageComponent;
  let fixture: ComponentFixture<ReportIssuePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIssuePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIssuePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
