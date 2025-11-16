import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Others1 } from './others1';

describe('Others1', () => {
  let component: Others1;
  let fixture: ComponentFixture<Others1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Others1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Others1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
