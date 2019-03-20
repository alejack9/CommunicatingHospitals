import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPage } from './chart.page';

describe('ChartPage', () => {
  let component: ChartPage;
  let fixture: ComponentFixture<ChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
