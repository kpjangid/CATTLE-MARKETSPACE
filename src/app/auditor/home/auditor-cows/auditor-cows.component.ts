import { Component, OnInit } from '@angular/core';
import { AuditorService } from '../../auditor.service';
import { UtilityService } from '../../../shared/services/utilityService';

@Component({
  selector: 'app-auditor-cows',
  templateUrl: './auditor-cows.component.html',
  styleUrls: ['./auditor-cows.component.css']
})
export class AuditorCowsComponent implements OnInit {

  cowList;

  constructor(
    private auditorService: AuditorService,
    private utilService: UtilityService
  ) { }

  ngOnInit() {
    this.utilService.activateRouter("Cattle");
    this.getAllCows();
  }

  private getAllCows() {
    this.auditorService.getAllCows().subscribe(
      (response) => {
        this.cowList = response;
      }
    );
  }

}
