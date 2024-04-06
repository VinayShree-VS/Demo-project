import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employeeForm:FormGroup;
  toDate:any = new Date();
  dialogData: any;
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb:FormBuilder,
    private toaster:ToastrService
  ) {
    this.dialogData = data;
    console.log('dialog data', this.dialogData)
    this.employeeForm = this.fb.group({
      employee_code: new FormControl(null, [Validators.required]),   
      employee_name: new FormControl(null, [Validators.required]), 
      address_1: new FormControl(null, [Validators.required]), 
      mobile_no: new FormControl(null, [Validators.required]), 
      date_of_birth: new FormControl(null, [Validators.required]), 
      date_of_joining: new FormControl(null, [Validators.required]), 
      salary: new FormControl(null, [Validators.required]), 
      remarks: new FormControl(null, [Validators.required]), 
    })
  }
get EF(){return this.employeeForm.controls}
  ngOnInit(): void {
    console.log(this.data);
    let emp = localStorage.getItem('employeeList');
    let empList = JSON.parse(emp);

    if(this.data.empId){
      let currentEditEmp = empList.find((e:any)=>e.id == this.data.empId );
      if(currentEditEmp){
        let formVal = {...currentEditEmp, date_of_birth:new Date(currentEditEmp.date_of_birth), date_of_joining:new Date(currentEditEmp.date_of_joining)};
        this.employeeForm.patchValue(formVal);
        this.employeeForm.get('employee_code').disable();
      };
    }

  }

  ngAfterViewInit(): void {}

  cancel() {
    this.dialogRef.close(undefined);
  }

  save() {
    if(this.employeeForm.invalid){
      this.employeeForm.markAllAsTouched();
      return;
    };
    let val = this.employeeForm.getRawValue();
    let formVal = {...val, date_of_birth:moment(val.date_of_birth).format('MM/DD/YYYY'),date_of_joining:moment(val.date_of_joining).format('MM/DD/YYYY')};
    
    if(this.dialogData.empId){
      this.update(formVal);
    }else{
      this.newCreate(formVal);
    }
  }

  newCreate(data:any){
    let emp = localStorage.getItem('employeeList');
    if(emp){
      let empList = JSON.parse(emp);
      let isExist = empList.find((a:any)=> a.employee_code.toLowerCase() == data.employee_code.toLowerCase());
      if(isExist){
        this.employeeForm.get('employee_code').setErrors({isExist:"Employee code is already exist"});
        return;
      }
      empList.push({id:empList.length+1, ...data})
      let employees = JSON.stringify(empList)
      localStorage.setItem('employeeList',employees);
    }else{
      let employees = JSON.stringify([{id:1, ...data}])
      localStorage.setItem('employeeList',employees);
    }

    this.dialogRef.close({data,mode:'create'});
    this.toaster.success('Employee Created Successfully');
  };

  update(data:any){
    let emp = localStorage.getItem('employeeList');
    let empList = JSON.parse(emp);
    let index = empList.findIndex((a:any)=>a.id == this.dialogData.empId);
    if(index !== -1){
      empList.splice(index,1,{id:this.dialogData.empId, ...data});
      let employees = JSON.stringify(empList)
      localStorage.setItem('employeeList',employees);
    }else{
      this.toaster.error('Employee Not Found')
    }
    this.dialogRef.close({data,mode:'update'});
    this.toaster.success('Employee Updated Successfully');
  }

  onchange_date(e:any){

  }
}
