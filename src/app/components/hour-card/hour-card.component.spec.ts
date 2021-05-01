import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourCardComponent } from './hour-card.component';

describe('HourCardComponent', () => {
  let component: HourCardComponent;
  let fixture: ComponentFixture<HourCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
