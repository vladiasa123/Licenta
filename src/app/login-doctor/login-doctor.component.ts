import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../interface/doctor';
import { DoctorService } from '../service/doctor.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login-doctor.component.html',
  styleUrl: './login-doctor.component.css'
})
export class LoginDoctorComponent {
  loginDoctorForm!: FormGroup;

  constructor(private authService: AuthService,
    private readonly formBuilder: FormBuilder
  ){

  }

  ngOnInit(): void{
    this.initForm();
  }


  private initForm(): void {
    this.loginDoctorForm = this.formBuilder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
    });
  }


  submitLogInDoctor(): void {
    console.log(this.loginDoctorForm.getRawValue());
    const doctor: Doctor = {
      email: this.loginDoctorForm.get('email')?.value,
      password: this.loginDoctorForm.get('password')?.value
    };
    this.authService.loginDoctor(doctor).subscribe(doctors => console.table(doctors));
  }


}
