import { Component, OnInit } from '@angular/core';
import { CattleService } from '../../../cattle/cattle.service';
import { FarmerService } from '../../../../register/farmer.service';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-transfer-cow',
  templateUrl: './transfer-cow.component.html',
  styleUrls: ['./transfer-cow.component.css']
})
export class TransferCowComponent implements OnInit {

  constructor(
    private cattleService: CattleService,
    private farmerService: FarmerService
  ) { }

  cowOnTransferList;

  progress = false;

  ngOnInit() {

    this.progress = true;

    this.cowOnTransferList = [];

    this.cattleService.getCattleListAvailableOnSale(this.farmerService.getFarmer().farmerId).subscribe(
      (response) => {

        // this.cowOnBidList = response;

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
                  this.cowOnTransferList = cowBidTemp;
                  console.log("Bids of Cows " + JSON.stringify(this.cowOnTransferList));
                }

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
      this.cattleService.getCowListForTransfer(cowId).subscribe(
        (response) => {
          observe.next({
            cowId: cowId,
            bids: response
          });
        }
      );
    });

  }

  transferCow(bidData) {

    this.progress = true;

    this.farmerService.transferCowToFarmer(bidData).subscribe(
      (response) => {
        this.progress = false;
      }, (error) => {
        this.progress = false;
      }
    );

  }

  setTime() {
    // 
  }

}
