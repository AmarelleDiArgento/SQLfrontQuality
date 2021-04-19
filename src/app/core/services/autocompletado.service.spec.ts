import { TestBed } from '@angular/core/testing';

import { AutocompletadoService } from './autocompletado.service';

describe('AutocompletadoService', () => {
  let service: AutocompletadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocompletadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
