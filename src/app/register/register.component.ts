import { Component } from '@angular/core';
import { faKitMedical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  clicked: boolean = false;
  clicked1: boolean = false;

  toggleActive() {
    this.clicked = !this.clicked;
  }

  toggleActive1() {
    this.clicked1 = !this.clicked1;
  }

  medical = faKitMedical;
}
