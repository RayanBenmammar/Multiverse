import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicesListComponent } from './voices-list.component';

describe('VoicesListComponent', () => {
  let component: VoicesListComponent;
  let fixture: ComponentFixture<VoicesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoicesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
