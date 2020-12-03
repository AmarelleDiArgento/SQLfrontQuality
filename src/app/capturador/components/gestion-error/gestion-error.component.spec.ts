import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionErrorComponent } from './gestion-error.component';

describe('GestionErrorComponent', () => {
  let component: GestionErrorComponent;
  let fixture: ComponentFixture<GestionErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
