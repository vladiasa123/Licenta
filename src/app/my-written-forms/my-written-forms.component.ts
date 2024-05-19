import { Component } from '@angular/core';
import { Patient } from '../interface/patient';
import { PatientService } from '../service/patient.service';
import { Observable } from 'rxjs';
import { DoctorService } from '../service/doctor.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-written-forms',
  templateUrl: './my-written-forms.component.html',
  styleUrl: './my-written-forms.component.css'
})
export class MyWrittenFormsComponent {
constructor(private patientService: PatientService,
  private router: Router,
  private doctorService: DoctorService
){}
  patient!: Patient[];
 ngOnInit() {
      this.loadMedicalChart();
  }

  private loadMedicalChart(): void {
    this.patientService.getMedicalChartNames().subscribe(patients => {
      this.patient = patients;
      const patientNames = patients.map(patient => patient.id);
      console.log(patientNames);
    });

   }

   sendPatientNameToBackend(patientName: number | undefined): void {
    if (patientName) {
      this.router.navigate(['/medicalChart'], {queryParams: {id: patientName}}).then();
    }
  }
}




