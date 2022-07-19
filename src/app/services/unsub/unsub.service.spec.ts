import { TestBed } from '@angular/core/testing';

import { UnsubService } from './unsub.service';

describe('UnsubService', () => {
  let service: UnsubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
