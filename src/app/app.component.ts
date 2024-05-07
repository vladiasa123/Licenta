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
  show(){
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }


  constructor(private userService: UserService,
    private readonly formBuilder: FormBuilder,
    private router: Router
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
  
    this.showHeader = !url.startsWith('/register');
    this.showFooter = !url.startsWith('/register');
  }

}






