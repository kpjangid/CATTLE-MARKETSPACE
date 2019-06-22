import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-doctor',
  templateUrl: './login-doctor.component.html',
  styleUrls: ['./login-doctor.component.css']
})
export class LoginDoctorComponent implements OnInit {
  @ViewChild('doctorLoginForm') doctorLoginForm: NgForm

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate() {
    this.router.navigate(['doctor', 'register']);
  }

  onSubmitLogin() {

    this.router.navigate(
      ['doctor', 'otp'],
      { queryParams: { doctorId: this.doctorLoginForm.value['identifier'] } });

    // this.router.navigate(['doctor', 'otp']);
  }

  goToMain() {
    this.router.navigate(['main']);
  }

}
