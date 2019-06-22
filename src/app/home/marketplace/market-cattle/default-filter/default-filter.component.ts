import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from '../../../../shared/services/utilityService';
import { NgForm } from '@angular/forms';
import { MarketService, FilterData } from '../../market.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-default-filter',
  templateUrl: './default-filter.component.html',
  styleUrls: ['./default-filter.component.css']
})
export class DefaultFilterComponent implements OnInit {

  @ViewChild('defaultFilterForm') defaultFilterForm: NgForm;

  constructor(private utilityService: UtilityService, private markerService: MarketService, private dialogRef: MatDialogRef<DefaultFilterComponent>) { }

  tehsilList;
  breedList;

  ngOnInit() {
    this.tehsilList = this.utilityService.getTehsilList();
    this.breedList = this.utilityService.getBreedList();
  }

  applyFilter() {

    console.log("form data : " + JSON.stringify(this.defaultFilterForm.value));

    const filter: FilterData = {
      tehsil: this.defaultFilterForm.value['selectedTehsil'],
      breed: this.defaultFilterForm.value['selectedBreed'],
      minAge: this.defaultFilterForm.value['minAge'],
      maxAge: this.defaultFilterForm.value['maxAge'],
    }

    this.markerService.filterObserver.next(filter);
    this.dialogRef.close();

  }

  onNoClick() {
    this.dialogRef.close();
  }

}
