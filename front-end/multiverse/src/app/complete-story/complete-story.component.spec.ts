import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteStoryComponent } from './complete-story.component';

describe('CompleteStoryComponent', () => {
  let component: CompleteStoryComponent;
  let fixture: ComponentFixture<CompleteStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
