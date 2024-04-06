import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: any): any {
    // I am unsure what id is here. did you mean title?
    console.log(items, searchTerm);
    if(searchTerm.type == 'employee_code'){
      return items.filter(item => item.employee_code.indexOf(searchTerm.searchVal) !== -1);
    }
}

}
