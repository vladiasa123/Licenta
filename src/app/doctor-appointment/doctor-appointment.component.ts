import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DoctorService } from '../service/doctor.service';
import { Doctor } from '../interface/doctor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interface/user';
import { UserService } from '../service/user.service';
import { appointment } from '../interface/appointment';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrl: './doctor-appointment.component.css'
})
 export class DoctorAppointmentComponent {

  public constructor(private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private formBuilder: FormBuilder
  ){
    
  }

  appointmentForm!: FormGroup;
  doctor: Doctor | undefined;
  public queryParamsId: string | null = null;


  ngOnInit(){
    this.route.queryParamMap.subscribe(queryParam => {
      this.queryParamsId = queryParam.get('id');
    console.log(this.queryParamsId);
    })
    this.initForm();
  }

  private initForm(){
      this.appointmentForm = this.formBuilder.group({
        'firstName': ['', [Validators.required]],
        'lastName' : ['', [Validators.required]],
        'requests': ['', [Validators.required]],
        'problem' : ['', [Validators.required]],
        'email' : ['', [Validators.required]],
      });
    }         
  

  submitForm(): void {
    console.log(this.appointmentForm.getRawValue());
    const appointment: appointment = {
      FirstName: this.appointmentForm.get('firstName')?.value,
      SecondName: this.appointmentForm.get('lastName')?.value,
      email: this.appointmentForm.get('email')?.value,
      requests: this.appointmentForm.get('requests')?.value,
      problem: this.appointmentForm.get('problem')?.value,
      DoctorId: this.queryParamsId!
    };
    this.appointmentService.sendForm(appointment).subscribe(appointment => console.table(appointment));
  }

 






}
