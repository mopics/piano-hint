import { TestBed, inject } from '@angular/core/testing';

import { GlobalSelectionsService } from './global-selections.service';

describe('GlobalSelectionsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalSelectionsService]
    });
  });

  it('should be created', inject([GlobalSelectionsService], (service: GlobalSelectionsService) => {
    expect(service).toBeTruthy();
  }));
});
