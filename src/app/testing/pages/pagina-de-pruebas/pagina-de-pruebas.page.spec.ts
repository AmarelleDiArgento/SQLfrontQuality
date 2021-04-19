import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDePruebasPage } from './pagina-de-pruebas.page';

describe('PaginaDePruebasPage', () => {
  let component: PaginaDePruebasPage;
  let fixture: ComponentFixture<PaginaDePruebasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaDePruebasPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaDePruebasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
