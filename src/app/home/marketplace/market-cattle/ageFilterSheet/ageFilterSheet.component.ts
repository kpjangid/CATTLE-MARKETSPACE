import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../market.service';

@Component({
  selector: 'app-ageFilterSheet',
  templateUrl: './ageFilterSheet.component.html',
  styleUrls: ['./ageFilterSheet.component.css']
})
export class AgeFilterSheetComponent implements OnInit {

  minAge = null;
  maxAge = null;

  constructor(private marketService: MarketService) { }

  ngOnInit() {

  }

  applyFilter() {
    const filterData = this.marketService.getFilterData();
    filterData['minAge'] = this.minAge;
    filterData['maxAge'] = this.maxAge;
    this.marketService.filterObserver.next(filterData);
  }

  clearFilter() {
    const filterData = this.marketService.getFilterData();
    delete filterData['minAge'];
    delete filterData['maxAge'];
    this.marketService.filterObserver.next(filterData);
  }

}
