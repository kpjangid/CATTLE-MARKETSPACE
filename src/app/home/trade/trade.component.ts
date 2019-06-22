import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../shared/services/utilityService';
import { FarmerService } from '../../register/farmer.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  constructor(
    private utilService: UtilityService,
    private farmerService: FarmerService
  ) { }

  avarageSalePriceOfCow;
  avarageSalePriceOfMilk;

  ngOnInit() {
    this.utilService.activateRouter("My Trade");
    this.getAvarageCowSalingPrice();
    this.getAvarageMilkSalingPrice();
  }

  private getAvarageCowSalingPrice() {

    this.farmerService.getAvarageCowSellingPrice(this.farmerService.getFarmer().farmerId).subscribe(
      (response) => {
        this.avarageSalePriceOfCow = response;
      }
    );

  }

  private getAvarageMilkSalingPrice() {

    this.farmerService.getAvarageMilkSellingPrice(this.farmerService.getFarmer().farmerId).subscribe(
      (response) => {
        this.avarageSalePriceOfMilk = response;
      }
    );

  }

}
