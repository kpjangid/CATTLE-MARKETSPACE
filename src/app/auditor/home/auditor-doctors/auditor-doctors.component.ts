import { Component, OnInit } from '@angular/core';
import { AuditorService } from '../../auditor.service';
import { UtilityService } from '../../../shared/services/utilityService';

@Component({
  selector: 'app-auditor-doctors',
  templateUrl: './auditor-doctors.component.html',
  styleUrls: ['./auditor-doctors.component.css']
})
export class AuditorDoctorsComponent implements OnInit {

  doctorList;

  constructor(
    private auditorService: AuditorService,
    private utilService: UtilityService
  ) { }

  ngOnInit() {
    this.utilService.activateRouter("Veterinaries");
    this.getAllDoctors();
  }

  private getAllDoctors() {
    this.auditorService.getAllDoctors().subscribe(
      (response) => {
        this.doctorList = response;
      }
    );
  }

}
