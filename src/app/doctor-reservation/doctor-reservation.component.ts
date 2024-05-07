import { Component } from '@angular/core';
import { DoctorService } from '../service/doctor.service';
import { employee } from '../interface/employee';

@Component({
  selector: 'app-doctor-reservation',
  templateUrl: './doctor-reservation.component.html',
  styleUrl: './doctor-reservation.component.css'
})
export class DoctorReservationComponent {

  constructor(private doctorService: DoctorService){}
 employees: employee[] = [];

  ngOnInit() {
      this.loadDoctors();
  }

  private loadDoctors(): void {
    this.doctorService.getEmployees().subscribe(employees => {
      this.employees = employees;
      console.log(employees);
      
    });

   }
}
