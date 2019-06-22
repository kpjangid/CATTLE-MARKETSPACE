import { Injectable } from '@angular/core';
import { AppService } from '../../shared/services/appService';
import { FarmerService } from '../../register/farmer.service';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private appService: AppService, private farmerService: FarmerService) { }

  createWallet(farmerId) {

    return new Observable((observe: Observer<any>) => {

      const context = "farmer/createWallet/" + farmerId;
      const headers = new HttpHeaders();
      headers.set("Content-Type", "application/json");
      this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
        (response) => {
          console.log(`Wallet Created : ${JSON.stringify(response)}`);
          observe.next(response);
        }, (error) => {
          console.log(`Error While creating wallet : ${error}`);
          observe.error(error);
        }
      );

    });



  }

  getWallet(farmerId) {

    return new Observable((observe: Observer<any>) => {

      const context = "farmer/getWallet/" + farmerId;

      this.appService.sendRequest('GET', context, null, null, null, null).subscribe(
        (response) => {
          console.log(`Wallet Get : ${JSON.stringify(response)}`);
          if (response) {
            observe.next(response);
          } else {
            observe.error(false);
          }

        }, (error) => {
          console.log(`Error in while Getting Cow List : ${error}`);
          observe.error(error);
        }
      );
    });

  }

  addBalance(farmerId, money) {

    return new Observable((observe: Observer<any>) => {
      const context = "farmer/addBalance/" + farmerId + "/" + money;
      const headers = new HttpHeaders();
      headers.set("Content-Type", "application/json");
      this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
        (response) => {
          console.log(`Balance Added : ${JSON.stringify(response)}`);
          observe.next(response);
        }, (error) => {
          console.log(`Error While adding balance : ${error}`);
          observe.error(error);
        }
      );
    });

  }

  getTransactionHistory(farmerId) {

    return new Observable((observe: Observer<any>) => {

      const context = "farmer/getTransactionHistory/" + farmerId;

      this.appService.sendRequest('GET', context, null, null, null, null).subscribe(
        (response) => {
          console.log(`Transaction History Get : ${JSON.stringify(response)}`);
          if (response) {
            observe.next(response);
          } else {
            observe.error(false);
          }
        }, (error) => {
          console.log(`Error in Transaction History : ${error}`);
          observe.error(error);
        }
      );
    });

  }

  getRatingForTransaction(payId, farmerId) {

    return new Observable((observe: Observer<any>) => {

      const context = "farmer/getRatingForTransaction/" + payId + "/" + farmerId;

      this.appService.sendRequest('GET', context, null, null, null, null).subscribe(
        (response) => {
          console.log(`getRatingForTransaction Get : ${JSON.stringify(response)}`);
          if (response) {
            observe.next(response);
          } else {
            observe.error(false);
          }
        }, (error) => {
          console.log(`Error in getRatingForTransaction : ${error}`);
          observe.error(error);
        }
      );
    });

  }


}
