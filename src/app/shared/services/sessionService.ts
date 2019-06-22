import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { FarmerData } from "../../register/farmer.service";
import { Router } from "@angular/router";
import { DoctorData } from "../../doctor/doctor-service.service";

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    constructor(private cookieService: CookieService, private router: Router) {
    }

    setFarmerInSession(farmerData: FarmerData) {
        this.cookieService.set('farmer', JSON.stringify(farmerData));
        console.log(`Session Data : ${this.cookieService.get('farmer')}`);
    }

    getFarmerFromSession(): FarmerData {
        // console.log(`Session Data : ${this.cookieService.get('farmer')}`);
        if (this.cookieService.get('farmer')) {
            return JSON.parse(this.cookieService.get('farmer'));
        }
        return null;
    }

    deleteFarmerFromSession() {
        this.cookieService.delete('farmer');
        this.router.navigate(['register', 'farmer']);
    }

    setDoctorInSession(doctorData: DoctorData) {
        this.cookieService.set('doctor', JSON.stringify(doctorData));
        console.log(`Session Data : ${this.cookieService.get('doctor')}`);
    }

    getDoctorFromSession(): DoctorData {
        if (this.cookieService.get('doctor')) {
            return JSON.parse(this.cookieService.get('doctor'));
        }
        return null;
    }

    deleteDoctorFromSession() {
        this.cookieService.delete('doctor');
        this.router.navigate(['register', 'doctor']);
    }

    getCompanyFromSession(): DoctorData {
        if (this.cookieService.get('company')) {
            return JSON.parse(this.cookieService.get('company'));
        }
        return null;
    }

    deleteCompanyFromSession() {
        this.cookieService.delete('company');
        this.router.navigate(['register', 'company']);
    }
}