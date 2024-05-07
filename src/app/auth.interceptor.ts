import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let loggedInUser = this.authService.loggedInUser;
        const userToken = JSON.parse(localStorage.getItem('token')!);
        console.log(userToken);
        
        if (userToken) {
            request = request.clone({setHeaders: { "Authorization": `Bearer ${userToken.token}`}});
        }
        console.log(request);
        
        return next.handle(request);
    }
}