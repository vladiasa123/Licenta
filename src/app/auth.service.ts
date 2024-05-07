import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Doctor } from './interface/doctor';
import { User } from './interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiLogin = 'http://localhost/Licenta/src/app/login-doctor/loginDoctor.php';
  private apiLogin2 = 'http://localhost/Licenta/src/app/login/login.php';
  private loggedUserSubject: BehaviorSubject<any>;
  public loggedInUser: Observable<any>;
  private getLoggedUser: any;

  constructor(private http: HttpClient) {
      this.getLoggedUser = JSON.parse(localStorage.getItem('loggedInUser')!!);
      this.loggedUserSubject = new BehaviorSubject(this.getLoggedUser);
      this.loggedInUser = this.loggedUserSubject.asObservable();
  }

  
  loginDoctor(doctor: Doctor): Observable<Doctor>{
    return this.http.post<Doctor>(`${this.apiLogin}/loginDoctor.php`, doctor)
      .pipe(map(response => {
        localStorage.setItem('token', JSON.stringify(response));
        this.loggedUserSubject.next(response);
        console.log(response);
        return response;
    }));
  }

  loginUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiLogin}/login.php`, user)
      .pipe(map(response => {
        localStorage.setItem('token', JSON.stringify(response));
        this.loggedUserSubject.next(response);
        console.log(response);
        return response;
    }));
  }
  
  logoutUser() {
      localStorage.removeItem('loggedInUser');
      this.loggedUserSubject.next(null);
  }
  public get loggedInUserValue(){
      return this.loggedUserSubject.value;
  }
}
