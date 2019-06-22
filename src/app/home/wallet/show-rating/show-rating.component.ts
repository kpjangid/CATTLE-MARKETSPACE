import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-show-rating',
  templateUrl: './show-rating.component.html',
  styleUrls: ['./show-rating.component.css']
})
export class ShowRatingComponent implements OnInit {

  progress = false;

  constructor(
    private dialogRef: MatDialogRef<ShowRatingComponent>,
    private walletService: WalletService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) { }

  rating: any;
  feedback: any;
  ratedFrom: any;

  ngOnInit() {
    this.ratedFrom = this.dialogData['ratedFrom'];
    this.feedback = this.dialogData['feedback'];
    this.rating = this.dialogData['rating'];
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
