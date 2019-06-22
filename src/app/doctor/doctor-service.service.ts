import { Injectable } from '@angular/core';
import { AppService } from '../shared/services/appService';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorServiceService {

  doctorData: DoctorData = {};
  doctorProfileData: DoctorProfileData = {};

  constructor(private appService: AppService) {

  }

  getDoctor() {
    return this.doctorData;
  }

  getDoctorProfileData(doctorId) {

    return new Observable((observer: Observer<DoctorData>) => {

      const context = 'doctor/getDoctorProfile/' + doctorId;

      const headers: HttpHeaders = new HttpHeaders();
      headers.set("Content-Type", "application/json");

      this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
        (response) => {
          console.log(`Doctor Data = ${JSON.stringify(response)}`);
          this.doctorProfileData.state = response['state'];
          this.doctorProfileData.name = response['name'];
          this.doctorProfileData.district = response['district'];
          this.doctorProfileData.dob = response['dob'];
          this.doctorProfileData.tehsil = response['tehsil'];
          this.doctorProfileData.cellNumber = response['mobile'];
          observer.next(response);
        }, (error) => {
          observer.error(error);
        }
      );
    });

  }

  registerDoctor(doctorJson: any) {

    return new Observable((observer: Observer<DoctorData>) => {

      const context = 'doctor/registerProfile';

      const headers: HttpHeaders = new HttpHeaders();
      headers.set("Content-Type", "application/json");

      this.doctorData.phoneNumber = doctorJson['mobile'];

      this.appService.sendRequest('POST', context, doctorJson, headers, null, null).subscribe(
        (response) => {
          console.log(`Doctor Data = ${JSON.stringify(response)}`);
          this.doctorData['doctorId'] = response['userId'];
          this.doctorData['secretKey'] = response['userId'];
          this.doctorData['privateKey'] = response['userId'];
          observer.next(this.doctorData);
        }, (error) => {
          observer.error(`Error : ${error}`);
        }
      );

    });

  }

  getDoctorSecretKey() {
    return this.doctorData.secretKey;
  }

  getDoctorAPIKey() {
    return this.doctorData.apiKey;
  }

  setPasscode(passcode) {
    this.doctorData.passcode = passcode;
  }

  setDoctorData(doctorDataTemp: DoctorData) {
    this.doctorData = doctorDataTemp;
  }

  getDoctorProfile() {
    return this.doctorProfileData;
  }

  getAllCow(tehsil, district) {

    return new Observable((observer: Observer<any>) => {

      let context;

      if (tehsil && district) {
        context = 'doctor/getAllCow/' + tehsil + "/" + district;
      } else {
        context = 'doctor/getAllCow/' + this.doctorProfileData.tehsil + "/" + this.doctorProfileData.district;
      }

      const headers: HttpHeaders = new HttpHeaders();
      headers.set("Content-Type", "application/json");

      this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
        (response) => {

          console.log(`Cow Data  = ${JSON.stringify(response)}`);

          if (response) {

            const tempCattleList = [];

            response.forEach(element => {

              if (element['requestHealthCert'] === "true") {
                const cow = {
                  cowName: element['cowName'],
                  cowAge: element['dob'],
                  farmerId: element['farmerId'],
                  imageData: element['pic'],
                  cowId: element['cowId']
                };
                tempCattleList.push(cow);
              }

            });

            observer.next(tempCattleList);

          } else {
            observer.error("Data not Found");
          }

        }, (error) => {
          observer.error(error);
        }
      );
    });
  }

  updateCow(updateCowData, cowId) {

    return new Observable((observer: Observer<any>) => {

      const context = 'doctor/updateCow/' + cowId;

      const headers: HttpHeaders = new HttpHeaders();
      headers.set("Content-Type", "application/json");

      this.appService.sendRequest('POST', context, updateCowData, headers, null, null).subscribe(
        (response) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        }
      );
    });
  }

}

export interface DoctorData {
  secretKey?: string;
  apiKey?: string;
  privateKey?: string;
  name?: string;
  doctorId?: string;
  phoneNumber?: string;
  passcode?: string;
}

export interface DoctorProfileData {
  name?: string;
  state?: string;
  district?: string;
  tehsil?: string;
  dob?: string;
  cellNumber?: string;
}
