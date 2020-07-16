import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphWriteComponent } from './paragraph-write.component';

describe('ParagraphWriteComponent', () => {
  let component: ParagraphWriteComponent;
  let fixture: ComponentFixture<ParagraphWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagraphWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
