import { Component } from '@angular/core';
import { User } from './interface/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './service/user.service';
import Swal from 'sweetalert2'


import {
  faGithub,
  faYoutube,
  faInstagram,
  faFacebook,
  faXTwitter,
  faTiktok,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import {constructorParametersDownlevelTransform} from "@angular/compiler-cli";
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  loggedIn = false;
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
  show(){
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
      this.router.navigate(['/home']).then();
      window.location.reload()
      }
    });
  }



  constructor(private userService: UserService,
    private readonly formBuilder: FormBuilder,
    private router: Router,
    public auth: AuthService
  ){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });

    if(localStorage.getItem('token') == null){
      console.log('item does not exist');
      this.loggedIn = true;
    }
  }

  

  private checkRoute(url: string) {
  
    if (url.startsWith('/register') || url.startsWith('/registerDoctor') || url.startsWith('/error403') || url.startsWith('/loginDoctor') || url.startsWith('/login') || url.startsWith('/doctorAppointment')) {
      this.showHeader = false;
      this.showFooter = false;
    } else {
      this.showHeader = true;
      this.showFooter = true;
    }
  }

}






