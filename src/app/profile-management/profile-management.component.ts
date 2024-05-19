import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../interface/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.css'
})
export class ProfileManagementComponent {
user: User|undefined
myGroup!: FormGroup


ngOnInit(){
  this.LoadUserData();
}

  constructor(private userService : UserService,
    private readonly formBuilder: FormBuilder
  ){
    this.myGroup = new FormGroup({
      FirstName: new FormControl(),
     SecondName: new FormControl(),
      Email: new FormControl()
    });
  }

 LoadUserData(): void{
 this.userService.getUser().subscribe(user => {
  this.user = user;
  console.log(user);
 })
 }

 private initForm(): void {
  this.myGroup = this.formBuilder.group({
    'FirstName': [this.user ? this.user.FirstName : '', [Validators.required]],
    'SecondName': [this.user ? this.user.SecondName : '', [Validators.required]],
    'Email': [this.user ? this.user.email : '', [Validators.required]],
  });
}

updateUser(): void {
  console.log(this.myGroup.getRawValue());
  const updatedData: User = {
    FirstName: this.myGroup.get('FirstName')?.value,
    SecondName: this.myGroup.get('SecondName')?.value,
    email: this.myGroup.get('Email')?.value,
  };
  this.userService.updateUser(updatedData).subscribe({
  });
  this.LoadUserData();
}

}
