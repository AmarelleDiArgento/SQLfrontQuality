import { TestBed } from '@angular/core/testing';
import { ProcesosDetalleService } from './procesodetalle.service';

describe('ProcesosDetalleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcesosDetalleService = TestBed.get(ProcesosDetalleService);
    expect(service).toBeTruthy();
  });
});
