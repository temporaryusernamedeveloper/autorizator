import { TestBed, inject } from '@angular/core/testing';

import { EnvironmentDataService } from './environment-data.service';

describe('EnvironmentDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentDataService]
    });
  });

  it('should be created', inject([EnvironmentDataService], (service: EnvironmentDataService) => {
    expect(service).toBeTruthy();
  }));
});
