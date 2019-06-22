import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../shared/services/appService';
import { HttpHeaders } from '@angular/common/http';
import { FarmerService, FarmerData } from '../farmer.service';
import { SessionService } from '../../shared/services/sessionService';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {

  @ViewChild('farmerRegisterForm') farmerRegisterForm: NgForm;

  stateList: any = ["MH", "RJ"];
  districtList: any = ["Thane", "Navi Mumbei"];
  tehsilList: any = ["Ghansoli", "Koparkhairane"];
  // router: Router;
  // route: ActivatedRoute

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute,
    private farmerService: FarmerService
  ) { }

  ngOnInit() {

    const farmer: FarmerData = this.sessionService.getFarmerFromSession();

    // const farmer: FarmerData = {};

    if (farmer ? farmer.farmerId : false) {
      this.router.navigate(['farmer', 'home']);
    } else {
      this.router.navigate(['farmer', 'register']);
    }

  }

  onSubmitRegister() {

    this.farmerRegisterForm.value['dob'] = Date.parse(this.farmerRegisterForm.value['dob']) / 1000 + "";

    let mobileNumber = this.farmerRegisterForm.value['mobile'];

    this.farmerService.registerFarmer(this.farmerRegisterForm.value).subscribe(
      (response) => {
        this.router.navigate(
          ['farmer', 'otp'],
          { queryParams: { farmerId: mobileNumber } });
      },
      (error) => {
        console.error(error);
      }
    );

  }

  navigate() {
    this.router.navigate(['farmer', 'login']);
  }

  goToMain() {
    this.router.navigate(['main']);
  }

}
