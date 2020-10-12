import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(tableArray, language): any {
    return language ? tableArray.filter(tableArr => tableArr.repo_language === language) : tableArray;
  }
}
