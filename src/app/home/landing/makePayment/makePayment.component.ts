import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FarmerService } from '../../../register/farmer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../cattle/delete-cattle/delete-cattle.component';
import { NgForm } from '@angular/forms';
import { WalletService } from '../../wallet/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-makePayment',
  templateUrl: './makePayment.component.html',
  styleUrls: ['./makePayment.component.css']
})
export class MakePaymentComponent implements OnInit {

  cowName;
  amount;
  progress = false;

  constructor(
    private farmerService: FarmerService,
    private dialogRef: MatDialogRef<MakePaymentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private walletService: WalletService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cowName = this.data['cowId'];
    this.amount = this.data['amount'];
    this.getWalletDetails();
  }

  makePayment() {

    this.progress = true;

    const paymentData = {
      bidId: this.data['bidId'],
      paymentFrom: this.farmerService.getFarmer().farmerId,
      cowId: this.data['cowId'],
      amount: this.data['amount']
    };

    this.farmerService.makePaymentToBuyCow(paymentData).subscribe(
      (response) => {
        console.log("Payment Done");
        this.progress = false;
        this.dialogRef.close();
      }, (error) => {
        console.error(error);
      }
    );
  }

  walletRegistered = false;

  private getWalletDetails() {
    this.walletService.getWallet(this.farmerService.getFarmer().farmerId).subscribe(
      (response) => {
        if (response) {
          this.walletRegistered = true;
        }
      }, (error) => {
        this.walletRegistered = false;
      }
    );
  }

  goToRegisterWallet() {
    this.router.navigate(['farmer', 'home', 'wallet']);
    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
