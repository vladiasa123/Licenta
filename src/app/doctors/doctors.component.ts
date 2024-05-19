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
  @Input() image!: string | undefined;
  @Input() firstName!: string | undefined;
  @Input() doctorType!: string | undefined;
  @Input() description!: string;;
 public doctors: Doctor[] = [];

 

 ngOnInit(): void {
   
 }

 
 
}
