import {Component} from '@angular/core';
import {faKitMedical} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../service/user.service';
import {User} from '../interface/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DoctorService } from '../service/doctor.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  clicked: boolean = false;
  clicked1: boolean = false;
  file: any;

  navigateToRegister() {
    this.router.navigate(['/register-doctor']);
  }

  navigateTologin() {
    this.router.navigate(['/login']);
  }

  registerForm!: FormGroup;
  show(){
    Swal.fire({
      title: "Good job!",
      text: "You succesfully registered!",
      icon: "success"
    }).then(() => {
      console.log("Redirecting...");
      this.router.navigate(['/login']).then(); 
      window.location.reload()
    });
  }
  constructor(private userService: UserService,
    private readonly formBuilder: FormBuilder,
    private router: Router
  ){

  }

  ngOnInit(): void{
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.formBuilder.group({
      'FirstName': ['', [Validators.required]],
      'SecondName' : ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'BloodType': ['', [Validators.required]],
      'DateOfBirth' : ['', [Validators.required]],
      'email' : ['', [Validators.required]]

    
    });
  }
  

  toggleActive() {
    this.clicked = !this.clicked;
  }

  toggleActive1() {
    this.clicked1 = !this.clicked1;
  }

  medical = faKitMedical;


  onSubmit() {

  }

  submit(): void {
    console.log(this.registerForm.getRawValue());
    const user: User = {
      FirstName: this.registerForm.get('FirstName')?.value,
      SecondName: this.registerForm.get('SecondName')?.value,
      email: this.registerForm.get('email')?.value,
      BloodType: this.registerForm.get('BloodType')?.value,
      DateOfBirth: this.registerForm.get("DateOfBirth")?.value,
      password: this.registerForm.get('password')?.value

    };
    this.userService.createUser(user).subscribe(users => console.table(users));
  } 



}


