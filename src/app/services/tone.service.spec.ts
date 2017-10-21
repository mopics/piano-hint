import { TestBed, inject } from '@angular/core/testing';

import { ToneService } from './tone.service';

describe('WebAudioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToneService]
    });
  });

  it('should be created', inject([ToneService], (service: ToneService) => {
    expect(service).toBeTruthy();
  }));
});
