import { Component } from '@angular/core';
import { User } from './interface/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './service/user.service';
import Swal from 'sweetalert2';
import jwt_decode, { jwtDecode } from 'jwt-decode';


import {
  faGithub,
  faYoutube,
  faInstagram,
  faFacebook,
  faXTwitter,
  faTiktok,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { DecodedToken } from './interface/DecodedToken';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loggedIn = 0;
  loggedIn2 = 0;
  git = faGithub;
  youtube = faYoutube;
  instagram = faInstagram;
  linkedin = faLinkedin;
  facebook = faFacebook;
  x = faXTwitter;
  tiktok = faTiktok;
  currentComponent = String;
  registerFormGroup!: FormGroup;
  showHeader: boolean = true;
  showFooter: boolean = true;
  showConfirmation = false;

  constructor(
    private userService: UserService,
    private readonly formBuilder: FormBuilder,
    private router: Router,
    public auth: AuthService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
  }

    ngOnInit(): void {
      this.checkToken();
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
    
  
  
    
  show() {
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }

  confirmDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.logoutUser();
        console.log("Redirecting...");
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      }
    });
  }

  private checkRoute(url: string) {
    if (
      url.startsWith('/register') ||
      url.startsWith('/registerDoctor') ||
      url.startsWith('/error403') ||
      url.startsWith('/loginDoctor') ||
      url.startsWith('/login') ||
      url.startsWith('/doctorAppointment') ||
      url.startsWith('/401Error') ||
      url.startsWith('/acceptEmail')
    ) {
      this.showHeader = false;
      this.showFooter = false;
    } else {
      this.showHeader = true;
      this.showFooter = true;
    }
  }
}
