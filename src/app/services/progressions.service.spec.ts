import { TestBed, inject } from '@angular/core/testing';

import { ProgressionsService } from './progressions.service';

describe('ProgressionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgressionsService]
    });
  });

  it('should be created', inject([ProgressionsService], (service: ProgressionsService) => {
    expect(service).toBeTruthy();
  }));
});
