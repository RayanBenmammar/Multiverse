import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProfilComponent } from './select-profil.component';

describe('SelectProfilComponent', () => {
  let component: SelectProfilComponent;
  let fixture: ComponentFixture<SelectProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
