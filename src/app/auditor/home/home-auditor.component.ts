import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SessionService } from '../../shared/services/sessionService';
import { map } from 'rxjs/operators';
import { UtilityService } from '../../shared/services/utilityService';

@Component({
  selector: 'app-home-auditor',
  templateUrl: './home-auditor.component.html',
  styleUrls: ['./home-auditor.component.css']
})
export class HomeAuditorComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  routerSubscription: Subscription;
  routerName = "Home";

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sessionService: SessionService,
    private routerService: UtilityService
  ) { }

  ngOnInit() {
    this.routerSubscription = this.routerService.myRouteObserver.subscribe((routerName: string) => {
      this.routerName = routerName;
    });
  }

  logout() {
    this.sessionService.deleteDoctorFromSession();
  }

}

