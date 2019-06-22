import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionService } from '../../shared/services/sessionService';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService, CompanyData } from '../company.service';
import { UtilityService } from '../../shared/services/utilityService';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {

  @ViewChild('companyRegisterForm') companyRegisterForm: NgForm;

  stateList: any;
  districtList: any;
  tehsilList: any;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {

    const company: CompanyData = this.sessionService.getCompanyFromSession();

    if (company ? company.companyId : false) {
      this.router.navigate(['company', 'home']);
    } else {
      this.companyRegisterForm.reset();
    }

    this.stateList = this.utilityService.getStateList();
    this.districtList = this.utilityService.getDistrictList();
    this.tehsilList = this.utilityService.getTehsilList();

  }

  onSubmitRegister() {

    this.companyRegisterForm.value['dor'] = Date.parse(this.companyRegisterForm.value['dor']) / 1000 + "";

    this.companyService.registerCompany(this.companyRegisterForm.value).subscribe(
      (response) => {

        if (response) {
          this.router.navigate(
            ['company', 'otp'],
            { queryParams: { companyId: response.companyId } });
        }

      }
    );

  }

  navigate() {
    this.router.navigate(['company', 'login']);
  }

  goToMain() {
    this.router.navigate(['main']);
  }

}