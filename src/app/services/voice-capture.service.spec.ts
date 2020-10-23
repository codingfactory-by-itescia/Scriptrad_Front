import { TestBed } from '@angular/core/testing';

import { VoiceCaptureService } from './voice-capture.service';

describe('VoiceCaptureService', () => {
  let service: VoiceCaptureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceCaptureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
