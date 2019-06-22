import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('farmerLoginForm') farmerLoginForm: NgForm;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  navigate() {
    this.router.navigate(['farmer', 'register']);
  }

  onSubmitLogin() {
    this.router.navigate(
      ['farmer', 'otp'],
      { queryParams: { farmerId: this.farmerLoginForm.value['identifier'] } });
  }

  goToMain() {
    this.router.navigate(['main']);
  }

}
