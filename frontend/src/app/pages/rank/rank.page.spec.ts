import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankPage } from './rank.page';

describe('RankPage', () => {
  let component: RankPage;
  let fixture: ComponentFixture<RankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
