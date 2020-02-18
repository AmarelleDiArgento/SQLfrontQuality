import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorcsvComponent } from './lectorcsv.component';

describe('LectorcsvComponent', () => {
  let component: LectorcsvComponent;
  let fixture: ComponentFixture<LectorcsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectorcsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectorcsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
