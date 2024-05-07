import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-login-succesfull',
  templateUrl: './login-succesfull.component.html',
  styleUrl: './login-succesfull.component.css'
})
export class LoginSuccesfullComponent {
  options: AnimationOptions = {
    path: '/assets/animation.json',
  };
  
  constructor(private router: Router) { }

animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/loginDoctor']); // Navigate to your desired page
    }, 3000); // Wait for 3 seconds (adjust as needed)
  }

}