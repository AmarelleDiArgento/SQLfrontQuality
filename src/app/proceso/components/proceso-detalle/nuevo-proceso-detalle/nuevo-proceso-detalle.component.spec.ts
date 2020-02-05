import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProcesosdetalleComponent } from './nuevo-proceso-detalle.component';

describe('NuevoProcesoDetalleComponent', () => {
  let component: NuevoProcesosdetalleComponent;
  let fixture: ComponentFixture<NuevoProcesosdetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoProcesosdetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoProcesosdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
