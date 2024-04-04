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
  isHovered1: boolean = false;
  isHovered2: boolean = false;
  isHovered3: boolean = false;

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
    },
    {
      image: 'assets/icon2.png',
      title: 'Talk to a doctor',
      description: 'Get a doctor you can talk to instantly',
      button: 'talk',
    },
    {
      image: 'assets/icon3.png',
      title: 'See your chart',
      description: 'Some information about your chart',
      button: 'chart',
    },
    {
      image: 'assets/icon.png',
      title: 'v-om vedea',
      description: 'Some information about...',
      button: 'reserve',
    },
  ];
}
