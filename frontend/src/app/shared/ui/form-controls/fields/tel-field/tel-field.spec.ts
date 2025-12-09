import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelField } from './tel-field';

describe('TelField', () => {
  let component: TelField;
  let fixture: ComponentFixture<TelField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
