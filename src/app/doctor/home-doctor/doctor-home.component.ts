import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DoctorServiceService } from '../doctor-service.service';
import { SessionService } from '../../shared/services/sessionService';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sessionService: SessionService,
    private doctorService: DoctorServiceService
  ) { }

  ngOnInit() {

    // if (this.doctorService.getDoctorProfile().tehsil == null) {

    //   this.doctorService.getDoctorProfileData(
    //     this.sessionService.getDoctorFromSession().doctorId).subscribe(
    //       (response) => {
    //         console.log("Doctor Profile = " + JSON.stringify(response));
    //       }
    //     );
    // }

  }

  logout() {
    this.sessionService.deleteDoctorFromSession();
  }

}
