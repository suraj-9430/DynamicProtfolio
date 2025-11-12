import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Certificactehax } from './certificactehax';

describe('Certificactehax', () => {
  let component: Certificactehax;
  let fixture: ComponentFixture<Certificactehax>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Certificactehax]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Certificactehax);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
