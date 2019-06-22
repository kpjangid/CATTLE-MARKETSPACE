import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../shared/services/utilityService';
import { WalletService } from './wallet.service';
import { FarmerService } from '../../register/farmer.service';
import { timeout } from 'q';
import { MatDialog } from '@angular/material';
import { AddBalanceComponent } from './add-balance/add-balance.component';
import { RatingComponent } from './rating/rating.component';
import { ShowRatingComponent } from './show-rating/show-rating.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  amountBalance: any;
  transactionHistoryList: any;

  progress = false;

  constructor(
    private matDialog: MatDialog,
    private utilService: UtilityService,
    private walletService: WalletService,
    private farmerService: FarmerService
  ) { }

  private farmerId;

  ngOnInit() {

    this.utilService.activateRouter("Wallet");

    this.farmerId = this.farmerService.getFarmer().farmerId;

    this.getWallet();

    this.getAllTransactionDetails();

  }

  rating;
  ratingCount;

  getWallet() {

    this.progress = true;

    this.walletService.getWallet(this.farmerId).subscribe(
      (response) => {
        if (response) {
          this.amountBalance = response['balance'];
          this.rating = response['rating'];
          this.ratingCount = response['ratingCount'];
        }
        this.progress = false;
      }, (error) => {
        this.progress = false;
      }
    );

  }

  registerWallet() {

    this.progress = true;

    this.walletService.createWallet(this.farmerId).subscribe(
      (response) => {
        if (response) {

          setTimeout(() => {
            this.progress = false;
            this.addBalance();
          }, 1000);

        }
      }
    );

  }

  addBalance() {

    const dialogRef = this.matDialog.open(AddBalanceComponent, {
      width: '400px',
      data: {
        farmerId: this.farmerId
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.progress = true;

      setTimeout(() => {
        this.getWallet();
      }, 2000);

    });

  }

  getAllTransactionDetails() {
    this.progress = true;
    this.walletService.getTransactionHistory(this.farmerId).subscribe(
      (response) => {
        this.transactionHistoryList = response;
        this.progress = false;
      }, (error) => {
        this.progress = false;
      }
    );
  }

  giveRating(transactionData) {

    const dialogRef = this.matDialog.open(RatingComponent, {
      width: '400px',
      data: {
        payId: transactionData['payId'],
        ratedTo: transactionData['paymentTo']
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.progress = false;

    });
  }

  getRating(creditTransactionData) {

    this.progress = true;

    this.walletService.getRatingForTransaction(
      creditTransactionData['payId'],
      creditTransactionData['paymentTo']
    ).subscribe(
      (response) => {

        this.progress = false;

        this.matDialog.open(ShowRatingComponent, {
          width: '400px',
          data: {
            ratedFrom: response[0]['ratedFrom'],
            feedback: response[0]['feedback'],
            rating: response[0]['rating']
          }
        });

      }, (error) => {
        this.progress = false;
      }
    );

  }

}
