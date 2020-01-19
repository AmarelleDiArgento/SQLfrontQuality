import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProcesoDetalleComponent } from './listar-proceso-detalle.component';

describe('ListarProcesoDetalleComponent', () => {
  let component: ListarProcesoDetalleComponent;
  let fixture: ComponentFixture<ListarProcesoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarProcesoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProcesoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
