import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturadorComponent } from './capturador.component';

describe('CapturadorComponent', () => {
  let component: CapturadorComponent;
  let fixture: ComponentFixture<CapturadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
