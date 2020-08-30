import { TestBed } from '@angular/core/testing';

import { DynamicLoadHomeService } from './dynamic-load-home.service';

describe('DynamicLoadHomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicLoadHomeService = TestBed.get(DynamicLoadHomeService);
    expect(service).toBeTruthy();
  });
});
