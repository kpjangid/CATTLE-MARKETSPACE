import { Component, OnInit } from '@angular/core';
import { DoctorServiceService } from '../../doctor-service.service';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { FarmerService } from '../../../register/farmer.service';
import { SessionService } from '../../../shared/services/sessionService';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  cattleList;
  progress = false;
  noCattleForApproval = true;

  constructor(
    private doctorService: DoctorServiceService,
    private router: Router,
    private farmerService: FarmerService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {

    // this.doctorService.getDoctorProfileData(
    //   this.sessionService.getDoctorFromSession().doctorId).subscribe(
    //     (response) => {
    //       this.getCowForLocation(response['tehsil'], response['district']);
    //     }
    //   );

    this.getCowForLocation(null, null);

  }

  private getCowForLocation(tehsil, district) {

    this.doctorService.getAllCow(tehsil, district).subscribe(
      (response) => {

        this.progress = true;

        console.log("Cow List at Farmer : " + JSON.stringify(response));

        let temp = [];

        if (response != null && response.length > 0) {

          response.forEach(element => {
            this.getFarmerAddress(element['farmerId']).subscribe(
              (res) => {

                if (res) {
                  element['farmerAddress'] = res;
                  temp.push(element);
                  if (temp.length == response.length) {
                    console.log("Farmer Address : " + JSON.stringify(temp));
                    this.cattleList = temp;
                    this.progress = false;
                    this.noCattleForApproval = false;
                  }
                } else {
                  this.progress = false;
                }

              }, (error) => {
                console.error(error);
                this.progress = false;
              }
            );
          });
        } else {
          this.progress = false;
          this.noCattleForApproval = true;
        }
      },
      (error) => {
        console.log(`Error : ${error}`);
        this.progress = false;
      }
    );
  }

  navigateToUpdateCow(cowId) {
    this.router.navigate(['doctor', 'cow', 'update', cowId]);
  }

  private getFarmerAddress(farmerId) {

    console.log('FARMER ID : ' + farmerId);

    return new Observable((observer: Observer<any>) => {

      this.farmerService.getFarmerProfileData(farmerId).subscribe(
        (response) => {
          observer.next(response['address']);
        }, (error) => {
          observer.error(error);
        }
      );

    });
  }

}
