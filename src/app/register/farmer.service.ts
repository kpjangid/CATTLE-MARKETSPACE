import { Injectable } from "@angular/core";
import { AppService } from "../shared/services/appService";
import { HttpHeaders } from "@angular/common/http";
import { Observable, Observer } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FarmerService {

    farmerData: FarmerData = {};
    farmerProfileData: FarmerProfileData = {};

    constructor(private appService: AppService) {

    }

    getFarmer() {
        return this.farmerData;
    }

    getFarmerProfileData(farmerId) {

        return new Observable((observer: Observer<FarmerData>) => {

            const context = 'farmer/getFarmerProfile/' + farmerId;

            const headers: HttpHeaders = new HttpHeaders();
            headers.set("Content-Type", "application/json");

            this.appService.sendRequest('GET', context, null, headers, null, null).subscribe(
                (response) => {
                    console.log(`Farmer Data = ${JSON.stringify(response)}`);
                    this.farmerProfileData.state = response['state'];
                    this.farmerProfileData.name = response['name'];
                    this.farmerProfileData.district = response['district'];
                    this.farmerProfileData.dob = response['dob'];
                    this.farmerProfileData.tehsil = response['tehsil'];
                    this.farmerProfileData.cellNumber = response['mobile'];
                    observer.next(response);
                }, (error) => {
                    observer.error(error);
                }
            );
        });

    }

    getAvarageCowSellingPrice(farmerId: any): any {
        return new Observable((observer: Observer<any>) => {
            observer.next('25000');
        });
    }

    getAvarageMilkSellingPrice(farmerId: any): any {
        return new Observable((observer: Observer<any>) => {
            observer.next('45');
        });
    }

    registerFarmer(farmerJson: any) {

        return new Observable((observer: Observer<FarmerData>) => {

            const context = 'farmer/registerProfile';

            const headers: HttpHeaders = new HttpHeaders();
            headers.set("Content-Type", "application/json");

            this.farmerData.phoneNumber = farmerJson['cellNumber'];

            this.appService.sendRequest('POST', context, farmerJson, headers, null, null).subscribe(
                (response) => {
                    console.log(`Farmer Data = ${JSON.stringify(response)}`);
                    this.farmerData['farmerId'] = response['userId'];
                    this.farmerData['secretKey'] = response['userId'];
                    this.farmerData['privateKey'] = response['userId'];
                    observer.next(this.farmerData);
                }, (error) => {
                    console.log(`Register Farmer Error = ${JSON.stringify(error)}`);
                    observer.error("Error While Registering Farmer : " + error);
                }
            );


        });


    }

    makePaymentToBuyCow(paymentData) {

        return new Observable((observer: Observer<FarmerData>) => {

            const context = 'farmer/payment';

            const headers: HttpHeaders = new HttpHeaders();
            headers.set("Content-Type", "application/json");

            this.appService.sendRequest('POST', context, paymentData, headers, null, null).subscribe(
                (response) => {
                    console.log(`Make payment response = ${JSON.stringify(response)}`);
                    observer.next(response);
                }, (error) => {
                    console.log(`Make payment Error = ${JSON.stringify(error)}`);
                    observer.error("Error While Making Payment : " + error);
                }
            );

        });
    }

    transferCowToFarmer(bidData) {

        return new Observable((observer: Observer<FarmerData>) => {

            const context = 'farmer/transferCowOwnerShip';

            const headers: HttpHeaders = new HttpHeaders();
            headers.set("Content-Type", "application/json");

            this.appService.sendRequest('POST', context, bidData, headers, null, null).subscribe(
                (response) => {
                    console.log(`Transfer Cow response = ${JSON.stringify(response)}`);
                    observer.next(response);
                }, (error) => {
                    console.log(`Transfer Cow Error = ${JSON.stringify(error)}`);
                    observer.error("Error While Transfer Cow : " + error);
                }
            );

        });
    }

    rateFarmer(ratingData) {

        return new Observable((observer: Observer<FarmerData>) => {

            const context = 'farmer/rating';

            const headers: HttpHeaders = new HttpHeaders();
            headers.set("Content-Type", "application/json");

            this.appService.sendRequest('POST', context, ratingData, headers, null, null).subscribe(
                (response) => {
                    console.log(`Rating Farmer response = ${JSON.stringify(response)}`);
                    observer.next(response);
                }, (error) => {
                    console.log(`Rating Farmer Error = ${JSON.stringify(error)}`);
                    observer.error("Error Rating Farmer : " + error);
                }
            );

        });
    }

    getFarmerSecretKey() {
        return this.farmerData.secretKey;
    }

    getFarmerAPIKey() {
        return this.farmerData.apiKey;
    }

    setPasscode(passcode) {
        this.farmerData.passcode = passcode;
    }

    setFarmerData(farmerDataTemp: FarmerData) {
        this.farmerData = farmerDataTemp;
    }

    getFarmerProfile() {
        return this.farmerProfileData;
    }

}

export interface FarmerData {
    secretKey?: string;
    apiKey?: string;
    privateKey?: string;
    name?: string;
    farmerId?: string;
    phoneNumber?: string;
    passcode?: string;
}

export interface FarmerProfileData {
    name?: string;
    state?: string;
    district?: string;
    tehsil?: string;
    dob?: string;
    cellNumber?: string;
}