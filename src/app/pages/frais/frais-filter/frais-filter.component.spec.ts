import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisFilterComponent } from './frais-filter.component';

describe('FraisFilterComponent', () => {
  let component: FraisFilterComponent;
  let fixture: ComponentFixture<FraisFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FraisFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FraisFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
