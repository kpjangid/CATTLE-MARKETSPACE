import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CattleService } from '../cattle.service';

export interface DialogData {
  cattleId?: string;
  cattleName?: string;
}

@Component({
  selector: 'app-delete-cattle',
  templateUrl: './delete-cattle.component.html',
  styleUrls: ['./delete-cattle.component.css']
})

export class DeleteCattleComponent implements OnInit {

  progress = false;

  constructor(
    private dialogRef: MatDialogRef<DeleteCattleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private cattleService: CattleService) { }

  ngOnInit() { }

  onNoClick() {
    this.dialogRef.close();
  }

  deleteCow() {
    this.progress = true;
    this.cattleService.deleteCattle(this.data.cattleId).subscribe(
      (response) => {
        setTimeout(() => {
          this.progress = false;
          this.dialogRef.close();
        }, 1000);
      }, (error) => {
        this.progress = false;
        this.dialogRef.close();
      }
    );
  }

}
