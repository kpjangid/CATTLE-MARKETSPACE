import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WalletService } from '../wallet.service';
import { FarmerService } from '../../../register/farmer.service';
import { DialogData } from '../../cattle/delete-cattle/delete-cattle.component';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @ViewChild('ratingForm') ratingForm: NgForm;

  progress = false;
  rating = 0;

  constructor(
    private dialogRef: MatDialogRef<RatingComponent>,
    private walletService: WalletService,
    private farmerService: FarmerService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) { }

  ngOnInit() {
    //
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submitRating() {

    console.log("Rating : " + this.rating);

    this.progress = true;

    const rateTemp = {
      feedback: this.ratingForm.value['feedback'],
      rating: this.rating * 1.3 + "",
      payId: this.dialogData['payId'],
      ratedTo: this.dialogData['ratedTo']
    };

    this.farmerService.rateFarmer(rateTemp).subscribe(
      (response) => {
        setTimeout(() => {
          this.dialogRef.close();
          this.progress = false;
        }, 1000);
      }, (error) => {
        this.dialogRef.close();
        this.progress = false;
      }
    );

  }

}
