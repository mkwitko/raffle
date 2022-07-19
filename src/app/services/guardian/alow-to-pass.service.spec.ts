import { TestBed } from '@angular/core/testing';

import { AlowToPassService } from './alow-to-pass.service';

describe('AlowToPassService', () => {
  let service: AlowToPassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlowToPassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
