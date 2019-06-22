import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PasscodeComponent } from '../register/passcode/passcode.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Observer, Subscriber, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from '../shared/services/sessionService';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UtilityService } from '../shared/services/utilityService';
import { FarmerService, FarmerProfileData } from '../register/farmer.service';
import { WalletService } from './wallet/wallet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  username = "admin";
  passcode: any = 1234;
  routerSubscription: Subscription;
  constructor(
    private farmerService: FarmerService,
    private routerService: UtilityService,
    private routerparam: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private sessionService: SessionService,
    private walletService: WalletService
  ) { }
  routerName: string = "Home";

  ngOnInit() {

    this.getFarmerRating();

    this.routerSubscription = this.routerService.myRouteObserver.subscribe((routerName: string) => {
      this.routerName = routerName;
    });

    if (!this.farmerService.getFarmer().passcode) {

      const dialogRef = this.dialog.open(PasscodeComponent, {
        id: '231',
        width: '400px',
        data: {
          mobileNumber: "8454545"
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log("dialog was closed");
        this.passcode = 'result';
      });

    }

    if (!this.farmerService.getFarmerProfile()) {
      this.farmerService.getFarmerProfileData(this.farmerService.getFarmer().farmerId).subscribe(
        (farmerData) => {
          this.username = farmerData['name'];
        }, (error) => {
          console.error(error);
        }
      );
    }

  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  logout() {
    this.sessionService.deleteFarmerFromSession();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  rating;

  private getFarmerRating() {
    this.walletService.getWallet(this.farmerService.getFarmer().farmerId).subscribe(
      (response) => {
        this.rating = response['rating'];
      }
    );
  }

}
