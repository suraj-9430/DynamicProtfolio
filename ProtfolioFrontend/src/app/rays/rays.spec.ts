import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rays } from './rays';

describe('Rays', () => {
  let component: Rays;
  let fixture: ComponentFixture<Rays>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rays]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rays);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
