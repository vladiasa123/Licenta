import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appointment } from '../interface/appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  private api = 'http://localhost/Licenta/src/app/doctor-appointment';

  sendForm(appointment: appointment, ): Observable<appointment>{
    return this.http.post<appointment>(`${this.api}/sendForm.php`, appointment);
  } 
}
