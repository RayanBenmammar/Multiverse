import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayAudioComponent } from './play-audio.component';

describe('PlayAudioComponent', () => {
  let component: PlayAudioComponent;
  let fixture: ComponentFixture<PlayAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
