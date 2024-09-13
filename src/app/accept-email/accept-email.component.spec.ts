import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptEmailComponent } from './accept-email.component';

describe('AcceptEmailComponent', () => {
  let component: AcceptEmailComponent;
  let fixture: ComponentFixture<AcceptEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcceptEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
