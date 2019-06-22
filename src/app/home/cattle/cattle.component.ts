import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteCattleComponent } from './delete-cattle/delete-cattle.component';
import { UtilityService } from '../../shared/services/utilityService';
import { CattleService } from './cattle.service';
import { FarmerService } from '../../register/farmer.service';
import { SellCattleComponent } from './sell-cattle/sell-cattle.component';

@Component({
  selector: 'app-cattle',
  templateUrl: './cattle.component.html',
  styleUrls: ['./cattle.component.css']
})
export class CattleComponent implements OnInit {

  constructor(
    private farmerService: FarmerService,
    private cattleService: CattleService,
    private utilService: UtilityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  farmerId: string;
  progress = false;

  cattleList: any;
  category: any;

  ngOnInit() {

    this.utilService.activateRouter("My Cattle");

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.category = params['category'];
      }
    );

    this.getCattleList();

  }

  getCattleList() {

    this.farmerId = this.farmerService.getFarmer().farmerId;
    this.progress = true;
    this.cattleService.getCattleList(this.farmerId).subscribe((response) => {

      console.log(`Cow List : ${JSON.stringify(response)}`);

      this.cattleList = response;
      this.progress = false;

    }, (error) => {
      console.error("Error in Cattle List call : " + error);
      this.progress = false;
    });

  }

  addButtonEvent() {
    this.router.navigate(['farmer', 'add-cattle']);
  }

  deleteButtonClicked(cowId) {

    const dialogRef = this.dialog.open(DeleteCattleComponent, {
      width: '400px',
      data: {
        cattleId: cowId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed");
      this.getCattleList();
    });

  }

  sellButtonClicked(cowId, cattleName) {
    const dialogRef = this.dialog.open(SellCattleComponent, {
      width: '400px',
      data: {
        cattleId: cowId,
        cattleName: cattleName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog was closed");
    });
  }

  addCalfButtonClicked(cowData) {
    this.router.navigate(
      ['farmer', 'add-calf'],
      { queryParams: { parentId: cowData['cowId'] } }
    );
  }

}
