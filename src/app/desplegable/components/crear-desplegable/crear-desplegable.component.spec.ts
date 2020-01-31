import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDesplegableComponent } from './crear-desplegable.component';

describe('CrearDesplegableComponent', () => {
  let component: CrearDesplegableComponent;
  let fixture: ComponentFixture<CrearDesplegableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearDesplegableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDesplegableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
