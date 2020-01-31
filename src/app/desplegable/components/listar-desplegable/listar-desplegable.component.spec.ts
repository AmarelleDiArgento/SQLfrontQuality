import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDesplegableComponent } from './listar-desplegable.component';

describe('ListarDesplegableComponent', () => {
  let component: ListarDesplegableComponent;
  let fixture: ComponentFixture<ListarDesplegableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarDesplegableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDesplegableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
