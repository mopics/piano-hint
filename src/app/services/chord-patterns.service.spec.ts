import { TestBed, inject } from '@angular/core/testing';

import { ChordPatternsService } from './chord-patterns.service';

describe('ChordPatternsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChordPatternsService]
    });
  });

  it('should be created', inject([ChordPatternsService], (service: ChordPatternsService) => {
    expect(service).toBeTruthy();
  }));
});
