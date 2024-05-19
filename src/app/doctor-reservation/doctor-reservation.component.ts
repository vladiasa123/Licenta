import { Component } from '@angular/core';
import { DoctorService } from '../service/doctor.service';
import { employee } from '../interface/employee';
import { forkJoin } from 'rxjs';
import { Doctor } from '../interface/doctor';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-reservation',
  templateUrl: './doctor-reservation.component.html',
  styleUrl: './doctor-reservation.component.css'
})
export class DoctorReservationComponent {

  constructor(private doctorService: DoctorService,
    private router: Router
  ){
  
  }
 doctors: Doctor[] = [];



  ngOnInit() {
      this.loadDoctors("any");
  }

  public loadDoctors(doctorType: any): void {
    this.doctorService.getEmployees(doctorType).subscribe(doctors => {
      this.doctors = doctors;
      const doctorId = doctors.map(doctor => doctor.id);
      console.log(doctors);
    });
    
  }


  sendDoctorIdToBackend(doctorId: number | undefined): void {
    console.log("Here");
    if (doctorId) {
      console.log("Here 2");
      this.router.navigate(['/doctorAppointment'], {queryParams: {id: doctorId}}).then();
    }
  }
}