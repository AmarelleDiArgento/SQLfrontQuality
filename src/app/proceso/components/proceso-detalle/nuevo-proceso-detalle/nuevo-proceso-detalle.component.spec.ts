import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProcesoDetalleComponent } from './nuevo-proceso-detalle.component';

describe('NuevoProcesoDetalleComponent', () => {
  let component: NuevoProcesoDetalleComponent;
  let fixture: ComponentFixture<NuevoProcesoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoProcesoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoProcesoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
