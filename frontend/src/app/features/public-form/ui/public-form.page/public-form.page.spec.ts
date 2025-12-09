import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFormPage } from './public-form.page';

describe('PublicFormPage', () => {
  let component: PublicFormPage;
  let fixture: ComponentFixture<PublicFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
