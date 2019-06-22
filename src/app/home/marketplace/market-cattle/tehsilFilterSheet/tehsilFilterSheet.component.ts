import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../market.service';

@Component({
  selector: 'app-tehsilFilterSheet',
  templateUrl: './tehsilFilterSheet.component.html',
  styleUrls: ['./tehsilFilterSheet.component.css']
})
export class TehsilFilterSheetComponent implements OnInit {

  tehsilList: any = [
    "breed1", "breed2", "breed3", "breed4"
  ];

  selectedTehsil = null;

  constructor(private marketService: MarketService) { }

  ngOnInit() {

  }

  applyFilter() {
    const filterData = this.marketService.getFilterData();
    filterData['tehsil'] = this.selectedTehsil;
    this.marketService.filterObserver.next(filterData);
  }

  clearFilter() {
    const filterData = this.marketService.getFilterData();
    delete filterData['tehsil'];
    this.marketService.filterObserver.next(filterData);
  }

}
