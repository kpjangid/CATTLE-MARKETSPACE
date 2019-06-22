import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PasscodeComponent } from '../passcode/passcode.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FarmerService, FarmerData } from '../farmer.service';
import { NgForm } from '@angular/forms';
import { timeout } from 'rxjs/operators';
import { SessionService } from '../../shared/services/sessionService';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {


  @ViewChild('farmerOTPForm') farmerOTPForm: NgForm;

  constructor(
    private router: Router,
    private farmerService: FarmerService,
    private sessionService: SessionService,
    private route: ActivatedRoute
  ) { }

  mobileNumber: any;
  stateList: any;
  passcode: any;

  otp: any = {};

  // farmerId: string = "69c32696d318e69466ced714edc1d5c83e5236e319aebcd11caf6907a62aeac41560418489";
  farmerId: string;

  ngOnInit() {

    this.mobileNumber = this.farmerService.getFarmer().phoneNumber;

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
        this.farmerId = params['farmerId'];
        this.mobileNumber = params['farmerId'];
      }
    );

  }

  onSubmitOTP() {

    this.farmerService.getFarmerProfileData(this.farmerId).subscribe(
      (response) => {

        console.log(`Farmer Profile = ${JSON.stringify(response)}`);

        const farmerData: FarmerData = {
          farmerId: response['farmerId'],
          name: response['name'],
          secretKey: response['farmerId'],
          apiKey: response['farmerId'],
          passcode: "1234"
        };

        this.farmerService.setFarmerData(farmerData);

        console.log("Setting Farmer Data in Cookie : " + JSON.stringify(this.farmerService.getFarmer()));

        this.sessionService.setFarmerInSession(this.farmerService.getFarmer());

        this.router.navigate(['farmer', 'home', 'landing']);
      }
    );

  }

  goToMain() {
    this.router.navigate(['main']);
  }

  setTestingPass(): any {

    const farmerData: FarmerData = {
      farmerId: this.farmerId,
      secretKey: this.farmerId,
      apiKey: this.farmerId,
      passcode: "1234"
    };

    this.farmerService.setFarmerData(farmerData);

    console.log("Setting Farmer Data in Cookie : " + JSON.stringify(this.farmerService.getFarmer()));

    this.sessionService.setFarmerInSession(this.farmerService.getFarmer());

    this.router.navigate(['farmer', 'home', 'landing']);


  }

}
