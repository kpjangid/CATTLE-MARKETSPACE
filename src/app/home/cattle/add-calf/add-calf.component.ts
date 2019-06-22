import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CattleService } from '../cattle.service';
import { FarmerService, FarmerProfileData } from '../../../register/farmer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-calf',
  templateUrl: './add-calf.component.html',
  styleUrls: ['./add-calf.component.css']
})
export class AddCalfComponent implements OnInit {

  @ViewChild('calfAddForm') calfAddForm: NgForm = null;
  srcTarget: any;
  farmerProfile: FarmerProfileData;
  progress = false;

  constructor(
    private cattleService: CattleService,
    private farmerService: FarmerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  parentId: any;

  ngOnInit() {
    this.farmerProfile = this.farmerService.getFarmerProfile();
    console.log(`Farmer Profile : ${JSON.stringify(this.farmerProfile)} | Farmer Data : ${JSON.stringify(this.farmerService.getFarmer())}`);
    this.route.queryParams.subscribe(
      (params) => {
        this.parentId = params['parentId'];
      }
    );
  }

  saveCattle() {

    this.progress = true;

    const cattleData = this.calfAddForm.value;
    cattleData['pic'] = this.srcTarget;
    cattleData['state'] = this.farmerProfile.state;
    cattleData['district'] = this.farmerProfile.district;
    cattleData['tehsil'] = this.farmerProfile.tehsil;
    cattleData['farmerId'] = this.farmerService.getFarmer().farmerId;
    cattleData['dob'] = `${Date.parse(this.calfAddForm.value['dob']) / 1000}` + "";
    cattleData['requestHealthCert'] = "true";

    console.log(cattleData);

    this.cattleService.addCattle(cattleData).subscribe(
      (response) => {

        setTimeout(() => {
          this.router.navigate(['farmer', 'home', 'cattle']);
          this.calfAddForm.reset();
          this.srcTarget = null;
          this.progress = false;
        }, 2000);

      });

  }

  onFileSelected() {

    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {

      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e);
        this.srcTarget = e.target.result;
      };

      reader.readAsDataURL(inputNode.files[0]);

    }
  }

}
