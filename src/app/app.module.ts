import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatError, MatFormField } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorReservationComponent } from './doctor-reservation/doctor-reservation.component';
import { LoginComponent } from './login/login.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { LoginDoctorComponent } from './login-doctor/login-doctor.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LoginSuccesfullComponent } from './login-succesfull/login-succesfull.component';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import {MDCFormField} from '@material/form-field';
import {MDCCheckbox} from '@material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MedicalChartComponent } from './medical-chart/medical-chart.component';
import { MedicalFormCompletitionComponent } from './medical-form-completition/medical-form-completition.component';
import { ContactComponent } from './contact/contact.component';
import { AuthInterceptor } from './auth.interceptor';
import { MyWrittenFormsComponent } from './my-written-forms/my-written-forms.component';
import { Error403Component } from './error403/error403.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';
import { AboutComponent } from './about/about.component';
import { Error401Component } from './error401/error401.component';
import { AcceptEmailComponent } from './accept-email/accept-email.component';
import { WriteFormComponent } from './write-form/write-form.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'doctor-reservation', component: DoctorReservationComponent   },
  { path: 'login', component: LoginComponent},
  { path: 'doctors', component: DoctorsComponent},
  { path: 'doctor-reservation', component: DoctorReservationComponent},
  { path: 'register-doctor', component: RegisterDoctorComponent},
  { path: 'loginDoctor', component: LoginDoctorComponent},
  {path: 'loginSuccesfull', component: LoginSuccesfullComponent},
  {path: 'medicalChart', component: MedicalChartComponent},
  {path: 'medicalForm', component: MedicalFormCompletitionComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'writtenForms', component: MyWrittenFormsComponent},
  {path: 'error403', component: Error403Component},
  {path: 'profileManagement', component: ProfileManagementComponent},
  {path: 'doctorAppointment', component: DoctorAppointmentComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutComponent},
  {path: '401Error', component: Error401Component},
  {path:  'acceptEmail', component: AcceptEmailComponent},
  {path: 'writingForms', component: WriteFormComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    DoctorCardComponent,
    RegisterComponent,
    HomeComponent,
    DoctorReservationComponent,
    LoginComponent,
    DoctorsComponent,
    RegisterDoctorComponent,
    LoginDoctorComponent,
    LoginSuccesfullComponent,
    LoginSuccesfullComponent,
    MedicalChartComponent,
    MedicalFormCompletitionComponent,
    ContactComponent,
    MyWrittenFormsComponent,
    Error403Component,
    ProfileManagementComponent,
    DoctorAppointmentComponent,
    AboutComponent,
    Error401Component,
    AcceptEmailComponent,
    WriteFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatIconModule,
    ReactiveFormsModule,
    
    FormsModule,
    FontAwesomeModule,
    CommonModule,
    HttpClientModule,
    MatFormField,
    MatError,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule

    
  ],
  providers: [provideAnimationsAsync(), provideLottieOptions({
    player: () => import('lottie-web'),
  }),
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],

  
})
export class AppModule {
  
}
