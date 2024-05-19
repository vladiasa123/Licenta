import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../interface/user';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  
  loginForm!: FormGroup;

  constructor(private userService: UserService,
    private readonly formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){

  }

  ngOnInit(): void{
    this.initForm();
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToDoctor() {
    this.router.navigate(['/loginDoctor']);
  }



  success() {
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

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
    });
  }


  submitLogIn(): void {
    console.log(this.loginForm.getRawValue());
    const user: User = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value

    };
    this.authService.loginUser(user).subscribe(users => console.table(users));
  }

}


