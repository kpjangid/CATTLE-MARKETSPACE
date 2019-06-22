import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorServiceService, DoctorData } from '../doctor-service.service';
import { SessionService } from '../../shared/services/sessionService';

@Component({
  selector: 'app-otp-doctor',
  templateUrl: './otp-doctor.component.html',
  styleUrls: ['./otp-doctor.component.css']
})
export class OtpDoctorComponent implements OnInit {

  @ViewChild('doctorOTPForm') doctorOTPForm: NgForm;

  constructor(
    private router: Router,
    private doctorService: DoctorServiceService,
    private sessionService: SessionService,
    private route: ActivatedRoute
  ) {}

  mobileNumber: any;
  stateList: any;
  passcode: any;

  doctorId: string;

  otp: any = {};

  ngOnInit() {

    this.mobileNumber = this.doctorService.getDoctor().phoneNumber;
    // this.doctorId = this.doctorService.getDoctor().doctorId;

    setTimeout(() => {
      this.otp = {
        "1": 2,
        "2": 5,
        "3": 9,
        "4": 2
      };
    }, 1500);

    this.route.queryParams.subscribe(
      (params) => {
        this.doctorId = params['doctorId'];
      }
    );

  }

  onSubmitOTP() {

    // this.setDummyPrice();

    this.doctorService.getDoctorProfileData(this.doctorId).subscribe(
      (response) => {

        console.log(`Doctor Profile = ${JSON.stringify(response)}`);

        const doctorData: DoctorData = {
          doctorId: this.doctorId,
          name: response['name'],
          secretKey: this.doctorId,
          apiKey: this.doctorId,
          passcode: "1234"
        };

        this.doctorService.setDoctorData(doctorData);

        console.log("Setting Doctor Data in Cookie : " + JSON.stringify(this.doctorService.getDoctor()));

        this.sessionService.setFarmerInSession(this.doctorService.getDoctor());

        this.router.navigate(['doctor', 'home', 'landing']);
      }
    );

  }

  setDummyPrice(): any {

    const doctorData: DoctorData = {
      doctorId: this.doctorId,
      secretKey: this.doctorId,
      apiKey: this.doctorId,
      passcode: "1234"
    };

    this.doctorService.setDoctorData(doctorData);

    console.log("Setting Doctor Data in Cookie : " + JSON.stringify(this.doctorService.getDoctor()));

    this.sessionService.setFarmerInSession(this.doctorService.getDoctor());

    this.router.navigate(['doctor', 'home', 'landing']);
  }

}