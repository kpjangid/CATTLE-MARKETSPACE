import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class FilterTextPipe implements PipeTransform {

  transform(value: any, category: string, categoryValue): any {
    var output = [];

    if (!category) {
      return value;
    }

    for (var i = 0; i < value.length; i++) {
      if (value[i][category] === categoryValue) {
        output.push(value[i]);
      }
    }

    return output;
  }

}
