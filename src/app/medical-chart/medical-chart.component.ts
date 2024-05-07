import { Component, Input } from '@angular/core';
import { PatientService } from '../service/patient.service';
import { Patient } from '../interface/patient';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-medical-chart',
  templateUrl: './medical-chart.component.html',
  styleUrl: './medical-chart.component.css'
})
export class MedicalChartComponent {


  constructor(private patientService: PatientService){}
 patient: Patient|undefined;
 ngOnInit() {
      this.loadMedicalChart();
  }

  private loadMedicalChart(): void {
    this.patientService.getMedicalChartDetails().subscribe(patients => {
      this.patient = patients;
      console.log(patients); 
      
    });

   }

   public deleteChart(id: number) {
    this.patientService.deleteChart(id).subscribe(() => {
      console.log('deleted succesfully');
      this.loadMedicalChart();
      
    });
  }

  

}
