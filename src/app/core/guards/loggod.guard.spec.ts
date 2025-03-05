import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loggodGuard } from './loggod.guard';

describe('loggodGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggodGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
