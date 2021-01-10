import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASpotComponent } from './a-spot.component';

describe('ASpotComponent', () => {
  let component: ASpotComponent;
  let fixture: ComponentFixture<ASpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ASpotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ASpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
