import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDesplegableComponent } from './editar-desplegable.component';

describe('EditarDesplegableComponent', () => {
  let component: EditarDesplegableComponent;
  let fixture: ComponentFixture<EditarDesplegableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDesplegableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDesplegableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
