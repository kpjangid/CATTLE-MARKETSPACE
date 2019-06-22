import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyData, CompanyService } from '../company.service';
import { SessionService } from '../../shared/services/sessionService';

@Component({
  selector: 'app-otp-company',
  templateUrl: './otp-company.component.html',
  styleUrls: ['./otp-company.component.css']
})
export class OtpCompanyComponent implements OnInit {

  @ViewChild('companyOTPForm') companyOTPForm: NgForm;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private sessionService: SessionService,
    private route: ActivatedRoute
  ) { }

  mobileNumber: any;
  stateList: any;
  passcode: any;

  companyId: string;

  otp: any = {};

  ngOnInit() {

    this.mobileNumber = this.companyService.getCompany().phoneNumber;
    // this.companyId = this.companyService.getcompany().companyId;

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
        this.companyId = params['companyId'];
      }
    );

  }

  onSubmitOTP() {

    // this.setDummyPrice();

    this.companyService.getCompanyProfileData(this.companyId).subscribe(
      (response) => {

        console.log(`company Profile = ${JSON.stringify(response)}`);

        const companyData: CompanyData = {
          companyId: this.companyId,
          name: response['name'],
          secretKey: this.companyId,
          apiKey: this.companyId,
          passcode: "1234"
        };

        this.companyService.setCompanyData(companyData);

        console.log("Setting company Data in Cookie : " + JSON.stringify(this.companyService.getCompany()));

        this.sessionService.setFarmerInSession(this.companyService.getCompany());

        this.router.navigate(['company', 'home', 'landing']);
      }
    );

  }

  setDummyPrice(): any {

    const companyData: CompanyData = {
      companyId: this.companyId,
      secretKey: this.companyId,
      apiKey: this.companyId,
      passcode: "1234"
    };

    this.companyService.setCompanyData(companyData);

    console.log("Setting company Data in Cookie : " + JSON.stringify(this.companyService.getCompany()));

    this.sessionService.setFarmerInSession(this.companyService.getCompany());

    this.router.navigate(['company', 'home', 'landing']);
  }

}