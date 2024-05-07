import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalFormCompletitionComponent } from './medical-form-completition.component';

describe('MedicalFormCompletitionComponent', () => {
  let component: MedicalFormCompletitionComponent;
  let fixture: ComponentFixture<MedicalFormCompletitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalFormCompletitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicalFormCompletitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
