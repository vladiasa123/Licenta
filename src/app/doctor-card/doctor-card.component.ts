import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.css',
})
export class DoctorCardComponent {
  @Input() image = '';
  @Input() Title = '';
  @Input() description = '';
  @Input() button = '';
  @Input() buttonLink = '';
  backgroundImageUrl: string =
    'C:UsersHPDesktopProiectele meleLICENTAsrcappdoctor-cardProfile1.jpg';
  onMouseOver: boolean = false;
  cardOnMouseOver() {
    this.onMouseOver = true;
  }

  constructor() {}

  ngOnInit() {}
}
