import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { BreedFilterSheetComponent } from './breedFilterSheet/breedFilterSheet.component';
import { MarketService, FilterData } from '../market.service';

@Component({
  selector: 'app-market-cattle',
  templateUrl: './market-cattle.component.html',
  styleUrls: ['./market-cattle.component.css']
})
export class MarketCattleComponent implements OnInit {

  constructor() { }

  progress = false;
  tabIndex = 0;

  ngOnInit() {
  }

  changeTab(event){
    this.tabIndex = event.index;
  }

}
