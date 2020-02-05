import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProcesosDetalleComponent } from './listar-proceso-detalle.component';

describe('ListarProcesosDetalleComponent', () => {
  let component: ListarProcesosDetalleComponent;
  let fixture: ComponentFixture<ListarProcesosDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarProcesosDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProcesosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
