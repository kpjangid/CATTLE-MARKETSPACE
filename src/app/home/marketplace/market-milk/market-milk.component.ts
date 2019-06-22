import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FarmerService } from '../../../register/farmer.service';
import { CattleService } from '../../cattle/cattle.service';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-market-milk',
  templateUrl: './market-milk.component.html',
  styleUrls: ['./market-milk.component.css']
})
export class MarketMilkComponent implements OnInit {

  @ViewChild('sellMilkForm') sellMilkForm: NgForm;

  cowList = [{
    cowId: "cow-1",
    cowName: "cow-hera",
    healthStatus: "Green"
  }, {
    cowId: "cow-2",
    cowName: "cow-hera-2",
    healthStatus: "Green"
  }];

  constructor(
    private farmerService: FarmerService,
    private cattleService: CattleService,
    private marketService: MarketService
  ) { }

  ngOnInit() {
    this.cattleService.getCattleList(this.farmerService.getFarmer().farmerId).subscribe(
      (response) => {
        this.cowList = response;
      }, (error) => {
        console.log(error);
      }
    );
  }

  sellMilk() {

    const milkData = this.sellMilkForm.value;
    milkData['OnSale'] = "true";
    milkData['farmerId'] = this.farmerService.getFarmer().farmerId;

    this.marketService.sellMilk(milkData).subscribe(
      (response) => {
        console.log(response);
      });

  }

}
