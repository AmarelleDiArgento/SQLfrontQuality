import { TestBed } from '@angular/core/testing';

import { DesplegableService } from './desplegable.service';

describe('DesplegableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesplegableService = TestBed.get(DesplegableService);
    expect(service).toBeTruthy();
  });
});
