import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accept-email',
  templateUrl: './accept-email.component.html',
  styleUrl: './accept-email.component.css'
})
export class AcceptEmailComponent {

  doctorId: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.forEach((params: any) => {
      console.log("QUERYPARAMS");
      console.log(params);
    });
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });

  }
}
   
