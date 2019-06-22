import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../shared/services/utilityService';
import { CattleService } from '../cattle/cattle.service';
import { FarmerService } from '../../register/farmer.service';
import { MarketService } from '../marketplace/market.service';
import { MatDialog } from '@angular/material';
import { MakePaymentComponent } from './makePayment/makePayment.component';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { RejectBidComponent } from './reject-bid/reject-bid.component';
import { MakeOfferBidComponent } from './make-offer-bid/make-offer-bid.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(
    private utilService: UtilityService,
    private cattleService: CattleService,
    private farmerService: FarmerService,
    private marketService: MarketService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  progress = false;
  bidsList: any;
  notificationList: any;
  rejectedBidList: any;
  paymentNotList: any;
  totalCowAvailable: any = 0;

  ngOnInit() {

    this.progress = true;

    this.utilService.activateRouter("Home");
    this.getAllfarmerBids();
    // this.getTransferCowList();
    this.getPendingHealthRecords();
    // this.cattleListOnSaleForFarmer();
    this.getAllAvailableCowsAndThierBids();

  }

  /**
   * 
   */

  private getAllfarmerBids() {

    this.progress = true;

    this.cattleService.getAllMyBid(this.farmerService.getFarmer().farmerId, null).subscribe(
      (response) => {

        if (response != null && response.length > 0) {
          this.bidsList = response;
        }

        this.progress = false;

      }
    );
  }

  step;

  setStep(item) {
    this.step = item;
  }

  makePaymentToBid(bidData) {

    const dialogRef = this.dialog.open(MakePaymentComponent, {
      width: '400px',
      data: {
        cowId: bidData.cowId,
        bidId: bidData.bidId,
        amount: bidData.amount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed");
      this.getAllfarmerBids();
    });

  }

  makeOfferOnBid(bidData) {
    const dialogRef = this.dialog.open(MakeOfferBidComponent, {
      width: '400px',
      data: {
        cowId: bidData.cowId,
        bidId: bidData.bidId,
        amount: bidData.amount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed");
      this.getAllfarmerBids();
    });
  }

  transferCow(bidData) {

    this.progress = true;

    this.farmerService.transferCowToFarmer(bidData).subscribe(
      (response) => {
        setTimeout(() => {
          this.progress = false;
          this.getAllAvailableCowsAndThierBids();
        }, 2000);
      }, (error) => {
        this.progress = false;
      }
    );

  }

  pendingHealth;

  private getPendingHealthRecords() {
    this.cattleService.getCattleList(this.farmerService.getFarmer().farmerId).subscribe(
      (response) => {
        let tempCowList = [];
        console.log("get cow : " + JSON.stringify(response));
        this.totalCowAvailable = response.length;
        if (response ? response.length > 0 : false) {
          response.forEach(element => {
            if (element['healthStatus'] !== 'Green') {
              tempCowList.push(element);
            }
          });
          this.pendingHealth = tempCowList;
        }
      }
    );
  }

  // notificationListOfTransferCow;

  // private getTransferCowList() {
  //   this.progress = true;
  //   this.cattleService.getCattleListAvailableOnSale(this.farmerService.getFarmer().farmerId).subscribe(
  //     (response) => {
  //       let cowBidTemp = [];
  //       const temp = response;
  //       for (const key in temp) {
  //         if (temp.hasOwnProperty(key)) {
  //           const element = temp[key];
  //           this.getCowBidDetails(element.cowId).subscribe(
  //             (res) => {
  //               cowBidTemp.push(res);
  //               if (cowBidTemp.length == temp.length) {
  //                 this.notificationListOfTransferCow = cowBidTemp;
  //                 console.log("Bids of Cows " + JSON.stringify(this.notificationListOfTransferCow));
  //               }
  //               this.progress = false;
  //             }
  //           );
  //         }
  //       }
  //       this.progress = false;
  //     }, (error) => {
  //       this.progress = false;
  //     }
  //   );
  // }

  totalMilkAvailable: any = 0;
  private totalMilkAvailableInInventory() {
    this.totalMilkAvailable = 0;
  }

  // cattleAvailableOnSale: any;

  // private cattleListOnSaleForFarmer() {
  //   this.cattleService.getCattleList(this.farmerService.getFarmer().farmerId).subscribe(
  //     (response) => {
  //       var count = 0;
  //       if (response) {
  //         response.forEach(element => {
  //           if (element['OnSale'] === 'true') {
  //             count++;
  //           }
  //         });
  //       }
  //       this.cattleAvailableOnSale = count;
  //     }
  //   );
  // }

  goToCattleList(type) {
    this.router.navigate(
      ['farmer', 'home', 'cattle'],
      { queryParams: { category: type } }
    );
  }

  cowOnBidList;

  private getAllAvailableCowsAndThierBids() {

    this.cowOnBidList = [];

    this.cattleService.getCattleListAvailableOnSale(this.farmerService.getFarmer().farmerId).subscribe(
      (response) => {

        console.log("available Cows " + JSON.stringify(response) + " len = " + response.length);

        let cowBidTemp = [];

        const temp = response;

        for (const key in temp) {

          if (temp.hasOwnProperty(key)) {

            const element = temp[key];

            this.getCowBidDetails(element.cowId).subscribe(
              (res) => {

                cowBidTemp.push(res);

                if (cowBidTemp.length == temp.length) {
                  this.cowOnBidList = cowBidTemp;
                  console.log("Bids of Cows " + JSON.stringify(this.cowOnBidList));
                }

                this.progress = false;

              }, (error) => {
                this.progress = false;
              }
            );
          }
        }

        this.progress = false;

      }, (error) => {
        this.progress = false;
      }
    );
  }

  private getCowBidDetails(cowId) {

    return new Observable((observe: Observer<any>) => {
      this.cattleService.getCowBids(cowId).subscribe(
        (response) => {
          observe.next({
            cowId: cowId,
            bids: response
          });
          this.progress = false;
        }
      );
    });

  }

  acceptBid(bid) {

    this.progress = true;

    const str = {
      status: "acceptBid"
    }

    this.cattleService.updateBid(str, bid['bidId']).subscribe(
      (response) => {
        console.log("response for accept bid " + response);
        setTimeout(() => {
          this.progress = false;
          this.getAllAvailableCowsAndThierBids();
        }, 1000);
      }, (error) => {
        this.progress = false;
      }
    );

  }

  removeBid(bid) {

    this.progress = true;

    const str = {
      status: "REJECTED"
    }

    this.cattleService.updateBid(str, bid['bidId']).subscribe(
      (response) => {
        console.log("response for removeBid bid " + response);
        setTimeout(() => {
          this.progress = false;
          this.getAllfarmerBids();
        }, 1000);
      }, (error) => {
        this.progress = false;
      }
    );
  }

  rejectBid(bidData) {

    const dialogRef = this.dialog.open(RejectBidComponent, {
      width: '400px',
      data: {
        bidId: bidData.bidId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed");
      this.getAllAvailableCowsAndThierBids();
    });

  }

}
