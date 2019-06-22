import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FarmerService } from '../../../register/farmer.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CattleService } from '../../cattle/cattle.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reject-bid',
  templateUrl: './reject-bid.component.html',
  styleUrls: ['./reject-bid.component.css']
})
export class RejectBidComponent implements OnInit {

  @ViewChild('rejectBidForm') rejectBidForm : NgForm; 

  progress = false;

  constructor(
    private cattleService: CattleService,
    private dialogRef: MatDialogRef<RejectBidComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit() {
  }

  rejectBid() {

    this.progress = true;

    const str = {
      status: "reject",
      reason: this.rejectBidForm.value['reason']
    }

    this.cattleService.updateBid(str, this.data['bidId']).subscribe(
      (response) => {
        console.log("response for reject bid " + response);
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