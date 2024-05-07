import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSuccesfullComponent } from './login-succesfull.component';

describe('LoginSuccesfullComponent', () => {
  let component: LoginSuccesfullComponent;
  let fixture: ComponentFixture<LoginSuccesfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginSuccesfullComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginSuccesfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
