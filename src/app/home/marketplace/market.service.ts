import { Injectable } from "@angular/core";
import { AppService } from "../../shared/services/appService";
import { Observable, Observer, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MarketService {

    constructor(private appService: AppService) { }

    filterObserver = new Subject<FilterData>();

    sellMilk(milkSellData) {

        return new Observable((observe: Observer<any>) => {

            const context = "farmer/auctionMilk";

            this.appService.sendRequest('POST', context, milkSellData, null, null, null).subscribe(
                (response) => {
                    observe.next(response);
                }, (error) => {
                    console.log(`Error in while Selling Cow : ${error}`);
                    observe.error(error);
                }
            );
        });

    }

    getAllAuctionCow(filterData: any) {

        return new Observable((observe: Observer<any>) => {

            const context = "auction/searchCow";

            this.appService.sendRequest('POST', context, filterData, null, null, null).subscribe(
                (response) => {
                    observe.next(response);
                }, (error) => {
                    console.log(`Error in while Selling Cow : ${error}`);
                    observe.error(error);
                }
            );
        });
    }

    private filterData: FilterData;

    setFilterData(filterData) {
        this.filterData = filterData;
    }

    getFilterData() {
        if (!this.filterData) {
            this.filterData = {};
        }
        return this.filterData;
    }

}

export interface FilterData {
    breed?: string;
    tehsil?: string;
    minAge?: string;
    maxAge?: string;
}