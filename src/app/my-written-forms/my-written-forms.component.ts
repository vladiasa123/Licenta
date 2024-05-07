import { Component } from '@angular/core';
import { Patient } from '../interface/patient';
import { PatientService } from '../service/patient.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-written-forms',
  templateUrl: './my-written-forms.component.html',
  styleUrl: './my-written-forms.component.css'
})
export class MyWrittenFormsComponent {
constructor(private patientService: PatientService){}
  patient!: Patient[];
 ngOnInit() {
      this.loadMedicalChart();
  }

  private loadMedicalChart(): void {
    this.patientService.getMedicalChartNames().subscribe(patients => {
      this.patient = patients;
      console.log(patients); 
    });

   }
}


