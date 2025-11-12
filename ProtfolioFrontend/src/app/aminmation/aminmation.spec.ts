import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aminmation } from './aminmation';

describe('Aminmation', () => {
  let component: Aminmation;
  let fixture: ComponentFixture<Aminmation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aminmation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Aminmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
