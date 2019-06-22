import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorServiceService } from '../../../doctor-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-cow',
  templateUrl: './update-cow.component.html',
  styleUrls: ['./update-cow.component.css'],
  encapsulation: ViewEncapsulation.Emulated // None & Native
})
export class UpdateCowComponent implements OnInit {

  @ViewChild('updateCowForm') updateCowForm: NgForm;
  @ViewChild('serverReference') serverContent: ElementRef;

  healthCertificate: any;
  healthRecord: any = {};
  progress = false;

  srcTarget = false;

  constructor(
    private doctorService: DoctorServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onFileSelected() {

    const inputNode: any = document.querySelector('#checkUpTime');

    if (typeof (FileReader) !== 'undefined') {

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.healthCertificate = e.target.result;
      };

      reader.readAsDataURL(inputNode.files[0]);

    }
  }

  updateCow() {

    let status = "VERIFIED";
    this.progress = true;

    if (!this.updateCowForm.value['status']) {
      status = "NOT_VERIFIED";
    }

    const updateCow = {
      status: status,
      weight: this.updateCowForm.value['weight'],
      color: this.updateCowForm.value['color'],
      breed: this.updateCowForm.value['breed'],
      remarks: this.updateCowForm.value['remarks'],
      healthRecord: {
        checkUpTime: Date.parse(this.updateCowForm.value['checkUpTime']) / 1000 + "",
        doctorId: this.doctorService.getDoctor().doctorId
      }
    };

    const cowId = this.route.snapshot.params['id'];

    this.doctorService.updateCow(updateCow, cowId).subscribe(
      (response) => {

        setTimeout(() => {
          this.router.navigate(['doctor', 'home', 'landing']);
          this.progress = false;
        }, 2000);

      }, (error) => {
        console.log(error);
        this.progress = false;
      }
    );
  }


}
