import { Component, OnInit } from '@angular/core';
import { DefaultFilterComponent } from '../default-filter/default-filter.component';
import { OfferPriceComponent } from '../offer-price/offer-price.component';
import { AgeFilterSheetComponent } from '../ageFilterSheet/ageFilterSheet.component';
import { TehsilFilterSheetComponent } from '../tehsilFilterSheet/tehsilFilterSheet.component';
import { BreedFilterSheetComponent } from '../breedFilterSheet/breedFilterSheet.component';
import { FilterData, MarketService } from '../../market.service';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { FarmerService } from '../../../../register/farmer.service';

@Component({
  selector: 'app-buy-cow',
  templateUrl: './buy-cow.component.html',
  styleUrls: ['./buy-cow.component.css']
})
export class BuyCowComponent implements OnInit {

  filterData: FilterData = {};

  constructor(
    private bottomSheet: MatBottomSheet,
    private marketService: MarketService,
    private matDialog: MatDialog,
    private farmerService: FarmerService
  ) { }

  progress = false;

  cowList;

  ngOnInit() {

    if (this.marketService.getFilterData().tehsil == null) {
      this.getDefaultFilter();
    }

    this.marketService.filterObserver.subscribe(
      (response: FilterData) => {

        this.filterData = response;

        this.progress = true;

        this.marketService.getAllAuctionCow(this.filterData).subscribe(
          (response) => {

            const tempCattleList = [];

            if (response[0].length > 0) {
              tempCattleList[0] = {
                title: "Exact Match",
                filterCowList: response[0]
              };
            }

            if (response[1].length > 0) {
              tempCattleList[1] = {
                title: "Partial Match",
                filterCowList: response[1]
              };
            }

            if (response[2].length > 0) {
              tempCattleList[2] = {
                title: "No Match",
                filterCowList: response[2]
              };
            }
            
            this.progress = false;

            this.cowList = tempCattleList;

          }, (error) => {
            console.error(`Cow List Error = ${JSON.stringify(error)}`);
            this.progress = false;
          }
        );

      }
    );
  }

  breadFilter(): void {
    this.bottomSheet.open(BreedFilterSheetComponent);
  }

  tehsilFilter(): void {
    this.bottomSheet.open(TehsilFilterSheetComponent);
  }

  ageFilter(): void {
    this.bottomSheet.open(AgeFilterSheetComponent);
  }

  offerNewClicked(cowData) {

    const dialogRef = this.matDialog.open(OfferPriceComponent, {
      width: '400px',
      data: {
        cowId: cowData.cowId,
        cowName: cowData.cowName,
        farmerId: this.farmerService.getFarmer().farmerId,
        basePrice: cowData.sellingPrice
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed");
    });
  }

  getDefaultFilter() {
    this.matDialog.open(DefaultFilterComponent, {
      width: '400px'
    });
  }

}