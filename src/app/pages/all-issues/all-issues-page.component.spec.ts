import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIssuesPageComponent } from './all-issues-page.component';

describe('AllIssuesComponent', () => {
  let component: AllIssuesPageComponent;
  let fixture: ComponentFixture<AllIssuesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllIssuesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllIssuesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
