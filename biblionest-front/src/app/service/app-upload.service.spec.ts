import { TestBed } from '@angular/core/testing';

import { AppUploadService } from './app-upload.service';

describe('AppUploadService', () => {
  let service: AppUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
