import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../interface/user';
import { Observable } from 'rxjs';
import { Doctor } from '../interface/doctor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private api1 = 'http://localhost/Licenta/src/app/register';
private api2= 'http://localhost/Licenta/src/app/login';


  constructor(private http: HttpClient) { }


  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.api1}/register.php`, user);
  }

  loginUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.api2}/login.php`, user);
  } 

 

}






