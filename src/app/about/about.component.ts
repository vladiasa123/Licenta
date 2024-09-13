import { Component } from '@angular/core';
import { Doctor } from '../interface/doctor';
import { DoctorService } from '../service/doctor.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(private doctorService: DoctorService){

  }
doctors: Doctor[] =[];


  timelineEvents = [
    { year: '2024', description: 'This is the first year' },
  ];

  testimonials = [
    { message: 'This company is amazing!', author: 'Pacient 1' },
  ];

  ngOnInit(){
this.loadDoctors("Cardiologist");
  }

  
  public loadDoctors(doctorType: any): void {
    this.doctorService.getEmployees(doctorType).subscribe(doctors => {
      this.doctors = doctors;
      const doctorId = doctors.map(doctor => doctor.id);
      console.log(doctors);
    });
    
  }
  

}


