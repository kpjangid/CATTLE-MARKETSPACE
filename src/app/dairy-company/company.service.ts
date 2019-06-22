import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AppServiceAuditor } from '../shared/services/appServiceAuditor';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyData: CompanyData = {};
  private companyProfileData: CompanyProfileData = {};

  constructor(private appService: AppServiceAuditor) {

  }

  getCompany() {
    return this.companyData;
  }

  getCompanyProfileData(doctorId) {

    return new Observable((observer: Observer<CompanyData>) => {

      const context = 'doctor/getDoctorProfile/' + doctorId;

      const headers: HttpHeaders = new HttpHeaders();
      headers.set("Content-Type", "application/json");

      this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
        (response) => {
          console.log(`Doctor Data = ${JSON.stringify(response)}`);
          this.companyProfileData.state = response['state'];
          this.companyProfileData.name = response['name'];
          this.companyProfileData.district = response['district'];
          this.companyProfileData.dob = response['dob'];
          this.companyProfileData.tehsil = response['tehsil'];
          this.companyProfileData.cellNumber = response['mobile'];
          observer.next(response);
        }, (error) => {
          observer.error(error);
        }
      );
    });

  }

  registerCompany(companyData: any) {

    return new Observable((observer: Observer<CompanyData>) => {

      const context = 'dairy/registerProfile';

      // const headers: HttpHeaders = new HttpHeaders();
      // headers.set("Content-Type", "application/json");

      this.companyData.phoneNumber = companyData['mobile'];

      this.appService.sendRequest('POST', context, companyData, null, null, null).subscribe(
        (response) => {
          console.log(`Company Data = ${JSON.stringify(response)}`);
          this.companyData['companyId'] = response['dairyId'];
          this.companyData['secretKey'] = response['dairyId'];
          this.companyData['privateKey'] = response['dairyId'];
          observer.next(this.companyData);
        }, (error) => {
          observer.error(`Error : ${error}`);
        }
      );

    });

  }

  getCompanySecretKey() {
    return this.companyData.secretKey;
  }

  getCompanyAPIKey() {
    return this.companyData.apiKey;
  }

  setPasscode(passcode) {
    this.companyData.passcode = passcode;
  }

  setCompanyData(companyDataTemp: CompanyData) {
    this.companyData = companyDataTemp;
  }

  getCompanyProfile() {
    return this.companyProfileData;
  }

}

export interface CompanyData {
  secretKey?: string;
  apiKey?: string;
  privateKey?: string;
  name?: string;
  companyId?: string;
  phoneNumber?: string;
  passcode?: string;
}

export interface CompanyProfileData {
  name?: string;
  state?: string;
  district?: string;
  tehsil?: string;
  dob?: string;
  cellNumber?: string;
}
