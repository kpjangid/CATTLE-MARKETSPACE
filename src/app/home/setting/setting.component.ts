import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../shared/services/utilityService';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private utilService: UtilityService) { }

  ngOnInit() {
    this.utilService.activateRouter("Setting");
  }

}
