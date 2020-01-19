import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDesplegableComponent } from './nuevo-desplegable.component';

describe('NuevoDesplegableComponent', () => {
  let component: NuevoDesplegableComponent;
  let fixture: ComponentFixture<NuevoDesplegableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoDesplegableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDesplegableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
