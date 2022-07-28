import { TestBed } from '@angular/core/testing';

import { CreateImgService } from './create-img.service';

describe('CreateImgService', () => {
  let service: CreateImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
