import { TestBed } from '@angular/core/testing';

import { SliderServService } from './slider-serv.service';

describe('SliderServService', () => {
  let service: SliderServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SliderServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
