import { Component, OnInit } from '@angular/core';
import { CattleService } from '../../../cattle/cattle.service';
import { FarmerService } from '../../../../register/farmer.service';
import { Observable, Observer } from 'rxjs';
import { MatDialog } from '@angular/material';
import { RejectBidComponent } from '../../../landing/reject-bid/reject-bid.component';

@Component({
  selector: 'app-sell-cow',
  templateUrl: './sell-cow.component.html',
  styleUrls: ['./sell-cow.component.css']
})
export class SellCowComponent implements OnInit {

  constructor(
    private cattleService: CattleService,
    private farmerService: FarmerService,
    private dialog: MatDialog
  ) { }

  cowOnBidList;

  progress = false;

  ngOnInit() {

    this.progress = true;

    this.getAllAvailableCowsAndThierBids();

  }

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

  getCowBidDetails(cowId) {

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
