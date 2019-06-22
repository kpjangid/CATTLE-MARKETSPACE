import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { WalletService } from '../wallet.service';
import { FarmerService } from '../../../register/farmer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.css']
})
export class AddBalanceComponent implements OnInit {

  @ViewChild('addBalanceForm') addBalanceForm: NgForm;

  progress = false;

  constructor(
    private dialogRef: MatDialogRef<AddBalanceComponent>,
    private walletService: WalletService,
    private farmerService: FarmerService
  ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  addBalance() {

    this.progress = true;

    this.walletService.addBalance(this.farmerService.getFarmer().farmerId, this.addBalanceForm.value['amount']).subscribe(
      (response) => {
        if (response) {
          console.log("balance added");
          this.progress = false;
          this.dialogRef.close();
        }
      }
    );

  }

}
