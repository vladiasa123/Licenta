import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../service/patient.service';
import { Patient } from '../interface/patient';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../interface/DecodedToken';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';


@Component({
  selector: 'app-medical-form-completition',
  templateUrl: './medical-form-completition.component.html',
  styleUrl: './medical-form-completition.component.css'
})
export class MedicalFormCompletitionComponent {
  acces = false;
  medicalFormCompletition!: FormGroup;
  myGroup!: FormGroup;
  patient: Patient|undefined;
  id: string = '';

  

  constructor(private patientService: PatientService,
    private readonly formBuilder: FormBuilder,
    private readonly cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ){

  }
  ngOnInit(): void {
    this.myGroup = new FormGroup({
      firstName: new FormControl()
    });
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id')!;
      console.log(this.id);
      this.loadMedicalForm(Number.parseInt(this.id));
    });
    this.checkToken();
  }

  private loadMedicalForm(id: number): void {
    console.log('it is working');
    console.log(id);
    
    this.patientService.getMedicalChartDetails2(id).subscribe(patient => {
        this.patient = patient;
        console.log(patient); 
        this.initForm();

    });
}

  private initForm(): void {
    this.medicalFormCompletition = this.formBuilder.group({
      'name': [this.patient ? this.patient.name : '', [Validators.required]],
      'email': [this.patient ? this.patient.email : '', [Validators.required]],
      'gender': [this.patient ? this.patient.gender : '', [Validators.required]],
      'diagnosis' : [this.patient ? this.patient.diagnosis : '', [Validators.required]],
      'allergies' : [this.patient ? this.patient.allergies : '', [Validators.required]],
      'medication' : [this.patient ? this.patient.medication : '', [Validators.required]],
      'date' : [this.patient ? this.patient.date : '', [Validators.required]],
      'procedures' : [this.patient ? this.patient.procedures : '', [Validators.required]],
      'notes' : [this.patient ? this.patient.notes : '', [Validators.required]]
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
  this.patientService.createPatient(patient).subscribe(patient => console.table(patient));
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
  Swal.fire({
    title: "Good job!",
    text: "You created a new form!",
    icon: "success"
  });
  this.location.back();
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
