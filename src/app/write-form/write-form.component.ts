import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../service/patient.service';
import { Patient } from '../interface/patient';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../interface/DecodedToken';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-write-form',
  templateUrl: './write-form.component.html',
  styleUrl: './write-form.component.css'
})
export class WriteFormComponent {
  acces = false;
  medicalFormCompletition!: FormGroup;
  myGroup!: FormGroup;
  patient: Patient|undefined;
  id: string = '';

  constructor(private patientService: PatientService,
    private readonly formBuilder: FormBuilder,
    private readonly cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ){

  }
  ngOnInit(): void {
    this.myGroup = new FormGroup({
      firstName: new FormControl()
    });
    this.medicalFormCompletition = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      gender: ['', Validators.required],
      diagnosis: ['', Validators.required],
      medication: [''],
      allergies: [''],
      procedures: [''],
      notes: ['']
    });
  }

 
 uploadFile(): void {
  console.log(this.medicalFormCompletition.getRawValue());
  const patient: Patient = {
    name: this.medicalFormCompletition.get('name')?.value,
    email: this.medicalFormCompletition.get('email')?.value,
    gender: this.medicalFormCompletition.get('gender')?.value,
    diagnosis: this.medicalFormCompletition.get('diagnosis')?.value,
    allergies: this.medicalFormCompletition.get("allergies")?.value,
    medication: this.medicalFormCompletition.get('medication')?.value,
    date: this.medicalFormCompletition.get('date')?.value,
    procedures: this.medicalFormCompletition.get('procedures')?.value,
    notes: this.medicalFormCompletition.get('notes')?.value,
  };
  this.patientService.createPatient2(patient).subscribe(patient => console.table(patient));
  Swal.fire({
    title: "Good job!",
    text: "You created a new form!",
    icon: "success"
  });
  this.router.navigate(['/writtenForms']);
}



updateChart(): void {
  console.log(this.medicalFormCompletition.getRawValue());
  const updatedData: Patient = {
    id: Number.parseInt(this.id),
    name: this.medicalFormCompletition.get('name')?.value,
    email: this.medicalFormCompletition.get('email')?.value,
    gender: this.medicalFormCompletition.get('gender')?.value,
    diagnosis: this.medicalFormCompletition.get('diagnosis')?.value,
    allergies: this.medicalFormCompletition.get("allergies")?.value,
    medication: this.medicalFormCompletition.get('medication')?.value,
    date: this.medicalFormCompletition.get('date')?.value,
    procedures: this.medicalFormCompletition.get('procedures')?.value,
    notes: this.medicalFormCompletition.get('notes')?.value,
  };
  this.patientService.updateChart(updatedData).subscribe({
  });
}


checkToken(): void {
  const token = localStorage.getItem('token');
  if (token == null) {
    console.log('Token does not exist');
    this.router.navigate(['/login']);
  } else {
    try {
      const decodedToken = jwtDecode(token) as DecodedToken;
      console.log(decodedToken);
      const accountType = decodedToken.data.AccountType;
      console.log('Account Type:', accountType);
      if (accountType == 1) {
        this.acces = true;
      }if (accountType == 0) {
        this.acces = false
      } else {
        
      }
    } catch (error) {
      this.router.navigate(['/login']);
    }
  }
}

}

