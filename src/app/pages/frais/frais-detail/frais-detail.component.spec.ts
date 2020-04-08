import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisDetailComponent } from './frais-detail.component';

describe('FraisDetailComponent', () => {
  let component: FraisDetailComponent;
  let fixture: ComponentFixture<FraisDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FraisDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FraisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
