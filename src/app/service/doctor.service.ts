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

  getEmployees(): Observable<employee[]>{
    return this.http.get<employee[]>(this._url);
  }


  registerDoctor(doctor: Doctor): Observable<Doctor>{
    return this.http.post<Doctor>(`${this.api3}/register-doctor.php`, doctor);
  } 

  uploadFile(formData: FormData): Observable<employee[]>{
    return this.http.post<employee[]>('http://localhost/Licenta/src/app/register-doctor/register-doctor.php', formData);
  }

  loginDoctor(doctor: Doctor): Observable<Doctor>{
    return this.http.post<Doctor>(`${this.apiLogin}/loginDoctor.php`, doctor);
  }
  

}
