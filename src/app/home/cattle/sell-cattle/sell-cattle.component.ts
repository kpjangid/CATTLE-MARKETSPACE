import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CattleService } from '../cattle.service';
import { DialogData } from '../delete-cattle/delete-cattle.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sell-cattle',
  templateUrl: './sell-cattle.component.html',
  styleUrls: ['./sell-cattle.component.css']
})
export class SellCattleComponent implements OnInit {

  @ViewChild('sellingForm') sellingForm: NgForm;

  progress = false;

  constructor(
    private dialogRef: MatDialogRef<SellCattleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private cattleService: CattleService
  ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  sellCow() {

    this.progress = true;

    this.cattleService.sellCow(this.data['cattleId'], this.sellingForm.value).subscribe(
      (response) => {
        if (response) {
          setTimeout(() => {
            console.log("Cow mark On Sale");
            this.progress = false;
            this.dialogRef.close();
          }, 1000);
        }
      }
    );

  }

}
