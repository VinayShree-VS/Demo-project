import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {path:'', component:EmployeeComponent, children:[
    {path:'', redirectTo:'employee-list', pathMatch:'full'},
    {path:'employee-list',component:EmployeeListComponent},
    {path:'**',redirectTo:'employee-list',pathMatch:'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
