import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../shared/services/sessionService';
import { DoctorServiceService, DoctorData } from '../doctor-service.service';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.css']
})
export class RegisterDoctorComponent implements OnInit {

  @ViewChild('doctorRegisterForm') doctorRegisterForm: NgForm;

  stateList: any = ["MH", "RJ"];
  districtList: any = ["Thane", "Navi Mumbei", "Noida"];
  tehsilList: any = ["Ghansoli", "Koparkhairane", "oldroad"];
  // router: Router;
  // route: ActivatedRoute

  constructor(private sessionService: SessionService, private router: Router, private route: ActivatedRoute, private doctorService: DoctorServiceService) {
  }

  ngOnInit() {

    const doctor: DoctorData = this.sessionService.getDoctorFromSession();

    if (doctor ? doctor.doctorId : false) {
      this.router.navigate(['home']);
    } else {
      this.doctorRegisterForm.reset();
    }

  }

  onSubmitRegister() {

    this.doctorRegisterForm.value['dob'] = Date.parse(this.doctorRegisterForm.value['dob']) / 1000 + "";

    this.doctorService.registerDoctor(this.doctorRegisterForm.value).subscribe(
      (response) => {

        if (response) {
          this.router.navigate(
            ['doctor', 'otp'],
            { queryParams: { doctorId: response.doctorId } });
        }

      }
    );

  }

  navigate() {
    this.router.navigate(['doctor', 'login']);
  }

  goToMain() {
    this.router.navigate(['main']);
  }

}
