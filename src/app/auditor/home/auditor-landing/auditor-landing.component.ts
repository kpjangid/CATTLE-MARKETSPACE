import { Component, OnInit } from '@angular/core';
import { AuditorService } from '../../auditor.service';
import { UtilityService } from '../../../shared/services/utilityService';

@Component({
  selector: 'app-auditor-landing',
  templateUrl: './auditor-landing.component.html',
  styleUrls: ['./auditor-landing.component.css']
})
export class AuditorLandingComponent implements OnInit {

  tranasctionList;

  constructor(
    private auditorService: AuditorService,
    private utilService: UtilityService
  ) { }

  ngOnInit() {
    this.utilService.activateRouter("Home");
    this.getAllTransaction();
  }

  private getAllTransaction() {
    this.auditorService.getAllTx().subscribe(
      (response) => {
        this.tranasctionList = response;
      }
    );
  }

}
