import {Component} from '@angular/core';
import {faKitMedical} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../service/user.service';
import {User} from '../interface/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  clicked: boolean = false;
  clicked1: boolean = false;

  registerForm!: FormGroup;
  show(){
    Swal.fire({
      title: "Good job!",
      text: "You succesfully registered!",
      icon: "success"
    });
  }

  constructor(private userService: UserService,
    private readonly formBuilder: FormBuilder
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


