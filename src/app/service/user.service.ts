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
private api3 = 'http://localhost/Licenta/src/app/profile-management';
private api4 = 'http://localhost/Licenta/src/app/doctor-appointment';


  constructor(private http: HttpClient) { }


  createUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.api1}/register.php`, user);
  }

  loginUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.api2}/login.php`, user);
  } 

  

  getUser(): Observable<User>{
    return this.http.get<User>(`${this.api3}/getUser.php`)
  }

  updateUser(updatedData: any): Observable<void>{
    return this.http.put<void>(`${this.api3}/updateUser.php`, updatedData)
  }

 

}






