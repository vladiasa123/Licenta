import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employee } from '../interface/employee';
import { Observable } from 'rxjs';
import { Doctor } from '../interface/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  private api3 = 'http://localhost/Licenta/src/app/register-doctor';

  private apiLogin = 'http://localhost/Licenta/src/app/login-doctor/loginDoctor.php';

  private _url: string = "http://localhost/Licenta/src/app/doctor-reservation/doctor.php"

  getEmployees(doctorType: any): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this._url}/doctor.php?doctorType=${doctorType}`);
  }

  getDoctor(doctorId: any): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this._url}/doctor.php?doctorId=${doctorId}`);
  }
  
  uploadFile(formData: FormData): Observable<employee[]>{
    return this.http.post<employee[]>('http://localhost/Licenta/src/app/register-doctor/register-doctor.php', formData);
  }

  uploadPatientName(formData: FormData): Observable<employee[]>{
    return this.http.post<employee[]>('http://localhost/Licenta/src/app/my-written-forms/getNames.php', formData);
  }

  loginDoctor(doctor: Doctor): Observable<Doctor>{
    return this.http.post<Doctor>(`${this.apiLogin}/loginDoctor.php`, doctor);
  }
  

}
