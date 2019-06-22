import { Injectable, OnInit } from "@angular/core";
import { Observable, Observer, Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UtilityService implements OnInit {

    constructor(private routeParam: ActivatedRoute) { }

    ngOnInit() {

    }

    myRouteObserver = new Subject();

    activateRouter(routerName) {
        this.myRouteObserver.next(routerName);
    }

    private tehsilList = ["oldroad", "Ghansoli", "Koparkhairane"];
    private breedList = ["jersey", "nagori", "ssdfsdf"];
    private districtList = ["Noida", "Thane"];
    private stateList = ["MH", "RJ"];

    getTehsilList() {
        return this.tehsilList;
    }

    getBreedList() {
        return this.breedList;
    }

    getDistrictList() {
        return this.districtList;
    }

    getStateList() {
        return this.stateList;
    }


}