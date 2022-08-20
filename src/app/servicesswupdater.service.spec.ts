import { TestBed } from '@angular/core/testing';

import { ServicesswupdaterService } from './servicesswupdater.service';

describe('ServicesswupdaterService', () => {
  let service: ServicesswupdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesswupdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
