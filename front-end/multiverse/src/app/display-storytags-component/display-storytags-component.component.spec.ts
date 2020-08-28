import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayStorytagsComponentComponent } from './display-storytags-component.component';

describe('DisplayStorytagsComponentComponent', () => {
  let component: DisplayStorytagsComponentComponent;
  let fixture: ComponentFixture<DisplayStorytagsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayStorytagsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayStorytagsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
