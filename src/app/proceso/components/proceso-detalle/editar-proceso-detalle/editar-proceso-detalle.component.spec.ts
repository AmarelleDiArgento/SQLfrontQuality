import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProcesoDetalleComponent } from './editar-proceso-detalle.component';

describe('EditarProcesoDetalleComponent', () => {
  let component: EditarProcesoDetalleComponent;
  let fixture: ComponentFixture<EditarProcesoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProcesoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProcesoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
