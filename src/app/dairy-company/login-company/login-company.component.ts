import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-company',
  templateUrl: './login-company.component.html',
  styleUrls: ['./login-company.component.css']
})
export class LoginCompanyComponent implements OnInit {

  @ViewChild('companyLoginForm') companyLoginForm: NgForm

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate() {
    this.router.navigate(['company', 'register']);
  }

  onSubmitLogin() {

    this.router.navigate(
      ['company', 'otp'],
      { queryParams: { companyId: this.companyLoginForm.value['identifier'] } });
  }

  goToMain() {
    this.router.navigate(['main']);
  }

}
