import { Component, Input } from '@angular/core';
import { PatientService } from '../service/patient.service';
import { Patient } from '../interface/patient';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { NumberFormatStyle } from '@angular/common';
import { query } from '@angular/animations';

@Component({
  selector: 'app-medical-chart',
  templateUrl: './medical-chart.component.html',
  styleUrl: './medical-chart.component.css'
})
export class MedicalChartComponent {
  accountType: string | undefined; // Variable to store AccountType
  activatedRoute: any;
 public name: string = '';
 public queryParamsId: string | null = null;

  constructor(private patientService: PatientService, private authService: AuthService, private route: ActivatedRoute) {}
  
  patient: Patient | undefined;
  queryParamsStatus ='';
  

  ngOnInit() {
      this.route.queryParamMap.subscribe(queryParam => {
        this.queryParamsId = queryParam.get('id');
      console.log(this.queryParamsId);
      })
    
this.decodeToken((accountType: string | undefined) => {
      if (accountType === "0") {
        this.loadMedicalChart();
        console.log('yes');
      } else {
        console.log('no');
        this.loadMedicalChartDoctor(this.queryParamsId);
      }
    });
  }

  private decodeToken(callback: (accountType: string | undefined) => void): void {
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); 
        if (decodedToken && decodedToken.data && decodedToken.data.AccountType) {
          this.accountType = decodedToken.data.AccountType; 
          callback(this.accountType);
        } else {
          console.error("AccountType not found in decoded token:", decodedToken);
          callback(undefined);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        callback(undefined);
      }
    } else {
      console.error("Token not found in local storage");
      callback(undefined);
    }
  }

  private loadMedicalChart(): void {
    this.patientService.getMedicalChartDetails().subscribe(patients => {
      this.patient = patients;
      console.log(patients); 
    });
  }

  private loadMedicalChartDoctor(queryParamsId : any): void {
    if (queryParamsId !== null) {
      this.patientService.getMedicalChartDetailsDoctor(queryParamsId).subscribe(patients => {
        this.patient = patients;
        console.log(patients);
      });
    } else {
      console.error("queryParamsId is null");
    }
  }

  public deleteChart(id: number) {
    this.patientService.deleteChart(id).subscribe(() => {
      console.log('deleted successfully');
      this.loadMedicalChart();  
    });
  }
}
