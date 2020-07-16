import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteStoryFeedComponent } from './complete-story-feed.component';

describe('CompleteStoryFeedComponent', () => {
  let component: CompleteStoryFeedComponent;
  let fixture: ComponentFixture<CompleteStoryFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteStoryFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteStoryFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
