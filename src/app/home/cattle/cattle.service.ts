import { AppService } from "../../shared/services/appService";
import { Observable, Observer } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CattleService {

    constructor(private appService: AppService) { }

    addCattle(cattleData) {

        return new Observable((observe: Observer<any>) => {
            const context = "/farmer/addCow";
            const headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            this.appService.sendRequest('POST', context, cattleData, headers, null, null).subscribe(
                (response) => {
                    console.log(`Cow Added : ${response}`);
                    observe.next(response);
                }, (error) => {
                    console.log(`Error in while adding Cow : ${error}`);
                    observe.error(error);
                }
            );
        });

    }

    getCattleList(farmerId) {

        return new Observable((observe: Observer<any>) => {

            const context = "farmer/getAllCow/" + farmerId;

            this.appService.sendRequest('GET', context, null, null, null, null).subscribe(
                (response) => {

                    if (response) {
                        const tempCattleList = [];
                        response.forEach(element => {
                            const cow = {
                                cowName: element['cowName'],
                                cowAge: element['dob'],
                                healthStatus: element['healthFlag'],
                                imageData: element['pic'],
                                cowId: element['cowId'],
                                OnSale: element['OnSale'],
                                requestHealthCert: element['requestHealthCert']
                            };
                            tempCattleList.push(cow);
                        });

                        observe.next(tempCattleList);
                    } else {
                        observe.error("Data not Exist");
                    }

                }, (error) => {
                    console.log(`Error in while Getting Cow List : ${error}`);
                    observe.error(error);
                }
            );
        });

    }

    getCattleListAvailableOnSale(farmerId) {

        return new Observable((observe: Observer<any>) => {

            const context = "farmer/getAllCow/" + farmerId;

            this.appService.sendRequest('GET', context, null, null, null, null).subscribe(
                (response) => {

                    console.log("getCattleListAvailableOnSale = " + JSON.stringify(response));

                    const tempCattleList = [];

                    response.forEach(element => {
                        if (element['OnSale'] == "true" && element['bids']) {
                            var cowItem = {
                                cowName: element['cowName'],
                                cowId: element['cowId'],
                                bids: element['bids'].split(',')
                            }
                            tempCattleList.push(cowItem);
                        }
                    });

                    if (tempCattleList.length > 0) {
                        observe.next(tempCattleList);
                    } else {
                        observe.error("No Bids Available");
                    }

                }, (error) => {
                    console.log(`Error in while Getting Cow List : ${error}`);
                    observe.error(error);
                }
            );
        });

    }

    sellCow(cowId, sellParam) {

        return new Observable((observe: Observer<any>) => {

            const context = "farmer/markCowOnSale/" + cowId;

            this.appService.sendRequest('POST', context, sellParam, null, null, null).subscribe(
                (response) => {
                    console.log(`Cow Added in Sale : ${JSON.stringify(response)}`);
                    observe.next(response);
                }, (error) => {
                    console.log(`Error in while Adding Cow in sale : ${error}`);
                    observe.error(error);
                }
            );
        });

    }

    bidForCow(cowdata) {

        return new Observable((observe: Observer<any>) => {
            const context = "auction/bidForCow";
            const headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            this.appService.sendRequest('POST', context, cowdata, headers, null, null).subscribe(
                (response) => {
                    console.log(`Bid Added to Cow : ${response}`);
                    observe.next(response);
                }, (error) => {
                    console.log(`Error in while Bid Added to Cow  : ${error}`);
                    observe.error(error);
                }
            );
        });

    }

    updateCattle(cattleData) {
        const context = "farmer/updateCow";
        const headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        this.appService.sendRequest('PUT', context, cattleData, headers, null, null).subscribe(
            (response) => {
                console.log(`Cow Added for Auction: ${response}`);
            }, (error) => {
                console.log(`Error in while adding Auction : ${error}`);
            }
        );
    }

    deleteCattle(identifier) {

        return new Observable((observe: Observer<any>) => {
            const context = "farmer/removeCow/" + identifier;
            this.appService.sendRequest('GET', context, null, null, null, null).subscribe(
                (response) => {
                    console.log(`Cow deleted: ${response}`);
                    observe.next(response);
                }, (error) => {
                    console.log(`Error in while deleting Cow : ${error}`);
                    observe.error(error);
                }
            );
        });

    }

    getCowListForAuction(filterData) {

        return new Observable((observe: Observer<any>) => {
            const context = "auction/searchCow";
            const headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            this.appService.sendRequest('POST', context, filterData, headers, null, null).subscribe(
                (response) => {
                    console.log(`Cow Available in Auction: ${JSON.stringify(response)}`);
                    observe.next(response);
                }, (error) => {
                    console.log(`Error in while Getting Auction : ${error}`);
                    observe.error(error);
                }
            );

        });

    }

    sellMilk(milkData) {
        const context = "farmer/auctionMilk";
        const headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        this.appService.sendRequest('POST', context, milkData, headers, null, null).subscribe(
            (response) => {
                console.log(`Cow Available in Auction: ${JSON.stringify(response)}`);
            }, (error) => {
                console.log(`Error in while Getting Auction : ${error}`);
            }
        );
    }

    getMilkAvailableForAuction() {
        return new Observable((observe: Observer<any>) => {
            const context = "auction/searchMilk";
            const headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
                (response) => {
                    console.log(`Cow Available in Auction: ${JSON.stringify(response)}`);
                    observe.next(response);
                }, (error) => {
                    console.log(`Error in while Getting Auction : ${error}`);
                    observe.error(error);
                }
            );
        });
    }

    purchaseCattle(cattleData) {
        return new Observable((observe: Observer<any>) => {
            const context = "auction/payment";
            const headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            this.appService.sendRequest('POST', context, cattleData, headers, null, null).subscribe(
                (response) => {
                    console.log(`payment to purchase cow : ${JSON.stringify(response)}`);
                    observe.next(response);
                }, (error) => {
                    console.log(`Error in while purchase cow : ${error}`);
                    observe.error(error);
                }
            );
        });
    }

    private bidsList = [
        {
            cowId: "cow1",
            farmerId: "farmer-01",
            bidId: "bid1",
            amount: "2300",
            status: "active",
            reason: "success",
        }, {
            cowId: "cow2",
            farmerId: "farmer-05",
            bidId: "bid2",
            amount: "2300",
            status: "active",
            reason: "success",
        }, {
            cowId: "cow3",
            farmerId: "farmer-09",
            bidId: "bid3",
            amount: "2300",
            status: "active",
            reason: "success",
        }
    ];

    getAllMyBid(farmerId, status) {
        return new Observable((observe: Observer<any>) => {

            let context;

            if (status == null) {
                context = "farmer/getMyAllBids/" + farmerId;
            } else {
                context = "farmer/getMyAllBids/" + farmerId + "/" + status;
            }

            const headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
                (response) => {
                    console.log(`All My Bids : ${JSON.stringify(response)}`);
                    observe.next(response);
                }, (error) => {
                    console.log(`Error in All My Bids : ${error}`);
                    observe.error(error);
                }
            );
        });
    }

    getCowBids(cowId) {
        return new Observable((observe: Observer<any>) => {
            const context = "farmer/getCowBids/" + cowId + "/start";
            const headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
                (response) => {
                    observe.next(response);
                }, (error) => {
                    console.log(`Error in All My Bids : ${error}`);
                    observe.error(error);
                }
            );
        });
    }

    getCowListForTransfer(cowId) {
        return new Observable((observe: Observer<any>) => {
            const context = "farmer/getCowBids/" + cowId + "/transfer";
            const headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
                (response) => {
                    observe.next(response);
                }, (error) => {
                    console.log(`Error in All My Bids : ${error}`);
                    observe.error(error);
                }
            );
        });
    }

    updateBid(bidData, bidId) {
        return new Observable((observe: Observer<any>) => {
            const context = "farmer/updateBid/" + bidId;
            const headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            this.appService.sendRequest('POST', context, bidData, headers, null, null).subscribe(
                (response) => {
                    console.log(`Update Bid Response : ${JSON.stringify(response)}`);
                    observe.next(response);
                }, (error) => {
                    console.log(`Error in while purchase cow : ${error}`);
                    observe.error(error);
                }
            );
        });
    }

}