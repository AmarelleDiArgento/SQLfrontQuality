import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarprocesoComponent } from './listar-proceso.component';

describe('ListarProcesoComponent', () => {
  let component: ListarprocesoComponent;
  let fixture: ComponentFixture<ListarprocesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarprocesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
