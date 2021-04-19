import { TestBed } from '@angular/core/testing';

import { TUsuarioService } from './t-usuario.service';

describe('TUsuarioService', () => {
  let service: TUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
