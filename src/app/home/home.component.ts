import { Component } from '@angular/core';
import {
  faGithub,
  faYoutube,
  faInstagram,
  faFacebook,
  faXTwitter,
  faTiktok,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
  loggedIn= 0;
  isHovered1: boolean = false;
  isHovered2: boolean = false;
  isHovered3: boolean = false;
  hasDataInLocalStorage: boolean = false;

  constructor(){
if(localStorage.getItem('loggedInUser') != null){
  this.loggedIn = 1;
}
  }

  git = faGithub;
  youtube = faYoutube;
  instagram = faInstagram;
  linkedin = faLinkedin;
  facebook = faFacebook;
  x = faXTwitter;
  tiktok = faTiktok;

  doctors = [
    {
      image: 'assets/icon.png',
      title: 'Reserve a spot',
      description: 'Get yourself a doctor appointment ',
      button: 'reserve',
      buttonLink: 'register'
    },
    {
      image: 'assets/icon2.png',
      title: 'Talk to a doctor',
      description: 'Get a doctor you can talk to instantly',
      button: 'talk',
      buttonLink: 'register'
    },
    {
      image: 'assets/icon3.png',
      title: 'See your chart',
      description: 'Some information about your chart',
      button: 'chart',
      buttonLink: '/medicalChart'
    },
    {
      image: 'assets/icon.png',
      title: 'v-om vedea',
      description: 'Some information about...',
      button: 'reserve',
      buttonLink: '/home'
    },
  ];

  
}
