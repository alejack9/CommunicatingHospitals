import { TestBed, async, inject } from '@angular/core/testing';

import { NotLoggedGuard } from './not-logged.guard';

describe('NotLoggedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotLoggedGuard]
    });
  });

  it('should ...', inject([NotLoggedGuard], (guard: NotLoggedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
