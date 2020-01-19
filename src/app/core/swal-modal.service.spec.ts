import { TestBed } from '@angular/core/testing';

import { SwalModalService } from './swal-modal.service';

describe('SwalModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwalModalService = TestBed.get(SwalModalService);
    expect(service).toBeTruthy();
  });
});
