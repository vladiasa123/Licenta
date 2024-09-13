import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../interface/doctor';
import { DoctorService } from '../service/doctor.service';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login-doctor.component.html',
  styleUrl: './login-doctor.component.css'
})
export class LoginDoctorComponent {
  loginDoctorForm!: FormGroup;

  constructor(private authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private router: Router
  ){

  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToUser() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void{
    this.initForm();
  }

  success() {
    const doctor: Doctor = {
      email: this.loginDoctorForm.get('email')?.value,
      password: this.loginDoctorForm.get('password')?.value,
      succes: this.loginDoctorForm.get('succes')?.value
    };
    this.authService.loginDoctor(doctor).subscribe(doctor => {
      if(doctor.succes === true){
        Swal.fire({
          title: "Good job!",
          text: "You successfully logged in!",
          icon: "success"
        }).then(() => {
          console.log("Redirecting...");
          this.router.navigate(['/home']).then(() => {
            setTimeout(() => {
              console.log("Reloading...");
              window.location.reload();
            }, 500); 
          }); 
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email or password incorrect",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    });
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
