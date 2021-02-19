import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambiarimagenComponent } from './modal-cambiarimagen.component';

describe('ModalCambiarimagenComponent', () => {
  let component: ModalCambiarimagenComponent;
  let fixture: ComponentFixture<ModalCambiarimagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCambiarimagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCambiarimagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
