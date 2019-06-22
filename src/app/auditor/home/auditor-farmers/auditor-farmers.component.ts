import { Component, OnInit } from '@angular/core';
import { AuditorService } from '../../auditor.service';
import { UtilityService } from '../../../shared/services/utilityService';

@Component({
  selector: 'app-auditor-farmers',
  templateUrl: './auditor-farmers.component.html',
  styleUrls: ['./auditor-farmers.component.css']
})
export class AuditorFarmersComponent implements OnInit {

  farmerList;

  constructor(
    private auditorService: AuditorService,
    private utilService: UtilityService
  ) { }

  ngOnInit() {
    this.utilService.activateRouter("Farmers");
    this.getAllFarmers();
  }

  private getAllFarmers() {
    this.auditorService.getAllFarmers().subscribe(
      (response) => {
        this.farmerList = response;
      }
    );
  }

}
