import { TestBed } from '@angular/core/testing';

import { DynamicLoadClientAreaService } from './dynamic-load-client-area.service';

describe('DynamicLoadClientAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicLoadClientAreaService = TestBed.get(DynamicLoadClientAreaService);
    expect(service).toBeTruthy();
  });
});
