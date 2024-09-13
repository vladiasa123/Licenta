import { Component, Input } from '@angular/core';
import { PatientService } from '../service/patient.service';
import { Patient } from '../interface/patient';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { NumberFormatStyle } from '@angular/common';
import { query } from '@angular/animations';
import { DecodedToken } from '../interface/DecodedToken';

@Component({
  selector: 'app-medical-chart',
  templateUrl: './medical-chart.component.html',
  styleUrl: './medical-chart.component.css'
})
export class MedicalChartComponent {
  accountType: string | undefined; 
  activatedRoute: any;
 public name: string = '';
 public queryParamsId: string | null = null;
  loggedIn= 0;
  loggedIn2 = 1;

  constructor(private patientService: PatientService, private authService: AuthService, private route: ActivatedRoute, public router: Router) {}
  
  patient: Patient | undefined;
  queryParamsStatus ='';
  

  ngOnInit() {
      this.route.queryParamMap.subscribe(queryParam => {
        this.queryParamsId = queryParam.get('id');
      console.log(this.queryParamsId);
      this.checkToken()
      }
    )
    
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
  
  checkToken(): void {
    const token = localStorage.getItem('token');
    if (token == null) {
      console.log('Token does not exist');
    } else {
      try {
        const decodedToken = jwtDecode(token) as DecodedToken;
        console.log(decodedToken);
        const accountType = decodedToken.data.AccountType;
        console.log('Account Type:', accountType);
        if (accountType == 1) {
          this.loggedIn = 1;
        } else if (accountType == 0) {
          this.loggedIn2 = 1;
        }
      } catch (error) {
        console.error('Invalid token', error);
        
      }
    }
  }
}
