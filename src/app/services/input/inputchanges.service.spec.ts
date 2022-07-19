import { TestBed } from '@angular/core/testing';

import { InputchangesService } from './inputchanges.service';

describe('InputchangesService', () => {
  let service: InputchangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputchangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
