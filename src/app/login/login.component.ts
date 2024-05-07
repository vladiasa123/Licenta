import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../interface/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  
  loginForm!: FormGroup;

  constructor(private userService: UserService,
    private readonly formBuilder: FormBuilder,
    private authService: AuthService
  ){

  }

  ngOnInit(): void{
    this.initForm();
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


