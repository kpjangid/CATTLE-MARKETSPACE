import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculator'
})
export class AgeCalculatorPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    var bthDate, curDate, ageYears, ageMonths, ageWeeks, ageDays, ageText;
    bthDate = new Date(+value * 1000); // Change the birth date here!
    curDate = new Date();
    if (bthDate > curDate) return;
    ageYears = curDate.getFullYear() - bthDate.getFullYear();
    ageMonths = curDate.getMonth() - bthDate.getMonth();
    ageDays = curDate.getDate() - bthDate.getDate();
    if (ageDays < 0) {
      ageMonths = ageMonths - 1;
      ageDays = ageDays + 31;
    }
    ageWeeks = Math.ceil(ageDays / 7);
    if (ageMonths < 0) {
      ageYears = ageYears - 1;
      ageMonths = ageMonths + 12;
    }
    ageText = "";
    if (ageYears > 0) {
      ageText = ageText + ageYears + " yr";
      if (ageYears > 1) ageText = ageText;
    }
    if (ageMonths > 0) {
      if (ageYears > 0) {
        if (ageWeeks > 0) ageText = ageText + ", ";
        else if (ageWeeks == 0) ageText = ageText + " , ";
      }
      ageText = ageText + ageMonths + " mn";
      if (ageMonths > 1) ageText = ageText;
    }
    if (ageWeeks > 0) {
      if ((ageYears > 0) || (ageMonths > 0)) ageText = ageText + " , ";
      ageText = ageText + ageWeeks + " wk";
      if (ageWeeks > 1) ageText = ageText;
    }
    return ageText;
  }

}
