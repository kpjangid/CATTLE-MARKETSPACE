import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FarmerService } from '../../../../register/farmer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CattleService } from '../../../cattle/cattle.service';
import { NgForm } from '@angular/forms';
import { DialogData } from '../../../cattle/delete-cattle/delete-cattle.component';

@Component({
  selector: 'app-offer-price',
  templateUrl: './offer-price.component.html',
  styleUrls: ['./offer-price.component.css']
})
export class OfferPriceComponent implements OnInit {

  @ViewChild('offerPriceForm') offerPriceForm: NgForm;
  progress = false;

  constructor(
    private farmerService: FarmerService,
    private dialogRef: MatDialogRef<OfferPriceComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private cattleService: CattleService
  ) { }

  amount: string;

  ngOnInit() {
    this.amount = this.data['basePrice'];
  }

  makeOfferPrice() {

    this.progress = true;

    const cowData = {
      cowId: this.data['cowId'],
      cowName: this.data['cowName'],
      amount: this.offerPriceForm.value['offerPrice'],
      farmerId: this.farmerService.getFarmer().farmerId
    };

    this.cattleService.bidForCow(cowData).subscribe(
      (response) => {

        setTimeout(() => {
          this.progress = false;
          this.dialogRef.close();
        }, 2000);

      }
    );

  }

  onNoClick() {
    this.dialogRef.close();
  }

}
