import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeFilterPipe } from './employee-filter-pipe/employee-filter.pipe';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeComponent } from './employee/employee.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    EmployeeFilterPipe,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EmployeeModule { }
