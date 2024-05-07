import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../interface/user';
import { Doctor } from '../interface/doctor';
import { DoctorService } from '../service/doctor.service';
import { HttpClient } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrl: './register-doctor.component.css'
})
export class RegisterDoctorComponent {

  registerDoctorForm!: FormGroup;

  constructor(private doctorService: DoctorService,
    private readonly formBuilder: FormBuilder,
    private readonly cdRef: ChangeDetectorRef
  ){

  }

  show(){
    Swal.fire({
      title: "Good job!",
      text: "You succesfully registered!",
      icon: "success"
    });
  }

 

 getDefaultFile() {
    return new File([''], 'filename.txt');
 }

 initFileArray(): File[]{
  return [] as File[];
 }
isUploaded = false;
 file = this.getDefaultFile();







  ngOnInit(): void{
    this.initForm();
  }

  private initForm(): void {
    this.registerDoctorForm = this.formBuilder.group({
      'firstName': ['', [Validators.required]],
      'secondName' : ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'email' : ['', [Validators.required]],
      'faculty' : ['', [Validators.required]],
      'DoctorType' : ['', [Validators.required]],
      'image' : ['', [Validators.required]]

    
    });
  }

  handleFileInput(event: any): void {
    
}

  
  uploadFile(event: any){
    const formData = new FormData();
    if(this.registerDoctorForm.valid) {
      formData.append('password', this.registerDoctorForm.get('password')?.value);
      formData.append('firstName', this.registerDoctorForm.get('firstName')?.value);
      formData.append('secondName', this.registerDoctorForm.get('secondName')?.value);
      formData.append('email', this.registerDoctorForm.get('email')?.value);
      formData.append('faculty', this.registerDoctorForm.get('faculty')?.value);
      formData.append('doctorType', this.registerDoctorForm.get('doctorType')?.value);
      formData.append('image', this.file)
      this.doctorService.uploadFile(formData).subscribe((response) => {
        console.log('File uploaded successfully');
        },(error) => {
        console.error('Error uploading file:', error);
        });
      
    } else {
      this.registerDoctorForm.markAllAsTouched();
    }
  }

  onFileChange(event: any): void{
    if(event.target.files.length > 0){
      this.file = event.target.files[0];
      this.isUploaded = true;
    }


  }

  dismissFile(){
    this.file = this.getDefaultFile();
    this.isUploaded = false;
  }




  }
  


