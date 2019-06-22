import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FarmerData, FarmerService } from '../farmer.service';
import { SessionService } from '../../shared/services/sessionService';

@Component({
  selector: 'app-passcode',
  templateUrl: './passcode.component.html',
  styleUrls: ['./passcode.component.css']
})
export class PasscodeComponent implements OnInit {

  @ViewChild('farmerPasscodeForm') farmerPasscodeForm: NgForm;

  secretKey: string;

  constructor(private sessionService: SessionService, private farmerService: FarmerService, private dialogRef: MatDialogRef<PasscodeComponent>, @Inject(MAT_DIALOG_DATA) private data: FarmerData) { }

  ngOnInit() {
    this.secretKey = this.farmerService.getFarmerSecretKey();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmitPasscode() {

    console.log(`passcode form data : ${JSON.stringify(this.farmerPasscodeForm.value)}`);

    const passcodeStr: string = `${this.farmerPasscodeForm.value["passcode['1']"]}${this.farmerPasscodeForm.value["passcode['2']"]}${this.farmerPasscodeForm.value["passcode['3']"]}${this.farmerPasscodeForm.value["passcode['4']"]}`;

    const farmerdata: FarmerData = this.sessionService.getFarmerFromSession();

    farmerdata['passcode'] = passcodeStr;

    this.sessionService.setFarmerInSession(farmerdata);

    this.dialogRef.close();
  }

}
