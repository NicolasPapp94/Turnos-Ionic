import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarPage } from './generar.page';

describe('GenerarPage', () => {
  let component: GenerarPage;
  let fixture: ComponentFixture<GenerarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
