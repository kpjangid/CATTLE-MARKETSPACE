import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilityService } from '../shared/services/utilityService';
import { SessionService } from '../shared/services/sessionService';
import { FarmerService } from '../register/farmer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private sessionService: SessionService, private _router: Router, private farmerService: FarmerService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (this.sessionService.getFarmerFromSession()) {

      this.farmerService.setFarmerData(this.sessionService.getFarmerFromSession());

      // this._router.navigate(['home']);

      console.log("Auth Guard Called");

      return true;
    }

    // navigate to login page
    this._router.navigate(['register', 'farmer']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}
