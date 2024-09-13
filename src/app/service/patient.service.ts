import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../interface/patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  private api = 'http://localhost/Licenta/src/app/medical-form-completition/medicalChart.php'
    private api6 = 'http://localhost/Licenta/src/app/medical-form-completition'
    private api7 = 'http://localhost/Licenta/src/app/write-form'
  private api2 = 'http://localhost/Licenta/src/app/medical-chart'
  private api3 = 'http://localhost/Licenta/src/app/medical-chart'
  private api4 = 'http://localhost/Licenta/src/app/my-written-forms'
  private api5 = 'http://localhost/Licenta/src/app/medical-form-completition'

  
  getMedicalChartDetails(): Observable<Patient>{
    return this.http.get<Patient>(`${this.api2}/medicalChart.php`);
  }

  getMedicalChartDetailsDoctor(queryParamsId: any): Observable<Patient>{
    return this.http.get<Patient>(`${this.api2}/medicalChartDoctor.php?id=${queryParamsId}`);
  }

  getMedicalChartNames(): Observable<Patient[]>{
    return this.http.get<Patient[]>(`${this.api4}/getNames.php`);
  }

  getMedicalChartDetails2(id: number): Observable<Patient>{
    return this.http.get<Patient>(`${this.api4}/getNames2.php?id=${id}`);
  }
  
  uploadFile(formData: FormData): Observable<Patient>{
    return this.http.post<Patient>(`${this.api}/medicalForm.php`, formData);
  }

  sendNames(patientName: number): Observable<void>{
   return this.http.get<void>(`${this.api3}/medicalChartDoctor.php?id=${patientName}`);
  }

  createPatient(patient: Patient): Observable<Patient>{
    return this.http.post<Patient>(`${this.api6}/medicalForm.php`, patient);
  }

  createPatient2(patient: Patient): Observable<Patient>{
    return this.http.post<Patient>(`${this.api7}/medicalForm2.php`, patient);
  }

  deleteChart(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api3}/deleteChart.php?id=${id}` );
  }

  updateChart(updatedData: any): Observable<void>{
    return this.http.put<void>(`${this.api5}/updateChart.php`, updatedData);
  }
   

 
}
``

