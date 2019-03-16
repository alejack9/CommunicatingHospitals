import { TestBed } from '@angular/core/testing';

import { PreparationService } from './preparation.service';

describe('PreparationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreparationService = TestBed.get(PreparationService);
    expect(service).toBeTruthy();
  });
});
