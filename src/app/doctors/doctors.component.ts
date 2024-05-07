import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '../interface/doctor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { employee } from '../interface/employee';
import { DoctorService } from '../service/doctor.service';
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit{
 @Input() image: string|undefined = 'src';
 @Input() title = '';
 @Input() subtitle = '';
 @Input() description = '';
 public employees: employee[] = [];

 

 ngOnInit(): void {
   
 }

 
 
}
