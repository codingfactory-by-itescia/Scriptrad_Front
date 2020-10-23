import { TestBed } from '@angular/core/testing';

import { ApiManagerServiceService } from './api-manager-service.service';

describe('ApiManagerServiceService', () => {
  let service: ApiManagerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiManagerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
