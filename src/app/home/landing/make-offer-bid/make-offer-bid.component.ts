import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CattleService } from '../../cattle/cattle.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-make-offer-bid',
  templateUrl: './make-offer-bid.component.html',
  styleUrls: ['./make-offer-bid.component.css']
})
export class MakeOfferBidComponent implements OnInit {

  @ViewChild('offerPriceForm') offerPriceForm: NgForm;

  progress = false;

  constructor(
    private cattleService: CattleService,
    private dialogRef: MatDialogRef<MakeOfferBidComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit() {
  }

  makeOfferPrice() {

    this.progress = true;

    const str = {
      status: "start",
      amount: this.offerPriceForm.value['amount']
    }

    this.cattleService.updateBid(str, this.data['bidId']).subscribe(
      (response) => {
        console.log("response for make new bid " + response);
        setTimeout(() => {
          this.progress = false;
          this.dialogRef.close();
        }, 1000);
      }, (error) => {
        this.progress = false;
      }
    );

  }

  onNoClick() {
    this.dialogRef.close();
  }

}
