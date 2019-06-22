import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../market.service';

@Component({
  selector: 'app-breedFilterSheet',
  templateUrl: './breedFilterSheet.component.html',
  styleUrls: ['./breedFilterSheet.component.css']
})
export class BreedFilterSheetComponent implements OnInit {

  breedList: any = [
    "breed1", "breed2", "breed3", "breed4"
  ];

  selectedBreed = null;

  constructor(private marketService: MarketService) { }

  ngOnInit() {

  }

  applyFilter() {
    const filterData = this.marketService.getFilterData();
    filterData['breed'] = this.selectedBreed;
    this.marketService.filterObserver.next(filterData);
  }

  clearFilter() {
    const filterData = this.marketService.getFilterData();
    delete filterData['breed'];
    this.marketService.filterObserver.next(filterData);
  }

}
