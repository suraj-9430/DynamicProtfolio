import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workexperiance } from './workexperiance';

describe('Workexperiance', () => {
  let component: Workexperiance;
  let fixture: ComponentFixture<Workexperiance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workexperiance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Workexperiance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
