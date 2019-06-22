import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AppServiceAuditor } from '../shared/services/appServiceAuditor';

@Injectable({
  providedIn: 'root'
})
export class AuditorService {

  constructor(private appService: AppServiceAuditor) {

  }

  getAllTx() {

    return new Observable((observer: Observer<any>) => {

      const context = 'getAllTx';

      const headers: HttpHeaders = new HttpHeaders();
      headers.set("Content-Type", "application/json");

      this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
        (response) => {
          console.log(`getAllTx Data = ${JSON.stringify(response)}`);
          observer.next(response);
        }, (error) => {
          observer.error(error);
        }
      );
    });
  }

  getAllDoctors() {

    return new Observable((observer: Observer<any>) => {

      const context = 'getAllDocs';

      const headers: HttpHeaders = new HttpHeaders();
      headers.set("Content-Type", "application/json");

      this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
        (response) => {
          console.log(`getAllDoctors Data = ${JSON.stringify(response)}`);
          observer.next(response);
        }, (error) => {
          observer.error(error);
        }
      );
    });
  }

  getAllCows() {

    return new Observable((observer: Observer<any>) => {

      const context = 'getAllCows';

      const headers: HttpHeaders = new HttpHeaders();
      headers.set("Content-Type", "application/json");

      this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
        (response) => {
          console.log(`getAllDoctors Data = ${JSON.stringify(response)}`);
          observer.next(response);
        }, (error) => {
          observer.error(error);
        }
      );
    });
  }

  getAllFarmers() {

    return new Observable((observer: Observer<any>) => {

      const context = 'getAllFarmers';

      const headers: HttpHeaders = new HttpHeaders();
      headers.set("Content-Type", "application/json");

      this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
        (response) => {
          console.log(`getAllDoctors Data = ${JSON.stringify(response)}`);
          observer.next(response);
        }, (error) => {
          observer.error(error);
        }
      );
    });
  }


}