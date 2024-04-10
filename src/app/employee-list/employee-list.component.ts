import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  employeeList:any[] = [];
  employeeListCopy:any;
  togleFilter:boolean = false;
  @ViewChild("employeeCode") employeeCode: ElementRef;
  @ViewChild("employeeName") employeeName: ElementRef;
  @ViewChild("address1") address1: ElementRef;
  @ViewChild("mobileNo") mobileNo: ElementRef;
  @ViewChild("DOB") DOB: ElementRef;
  @ViewChild("DOJ") DOJ: ElementRef;
  @ViewChild("salary") salary: ElementRef;
  @ViewChild("remarks") remarks: ElementRef;


  constructor(private dialog: MatDialog, private toastr:ToastrService,){

  };
  ngOnInit(): void {
    let emp = localStorage.getItem('employeeList');
    let empList = JSON.parse(emp);
    this.employeeList = empList || [];
    this.employeeListCopy = empList || [];

  };

  ngAfterViewInit(): void {
      this.applyHeaderFilter();
  };

  showFilter(){
    this.togleFilter = !this.togleFilter
  }

  addEmpoyee(){
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      height:'auto',width:'800px',
      disableClose: true,
      data:{empId: null},
      autoFocus:false
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result, ' result');
      if(result){
        let emp = localStorage.getItem('employeeList');
        this.employeeList = JSON.parse(emp);
      }
    });
  }

  edit(empId:any){
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      height:'auto',width:'800px',
      disableClose: true,
      data:{empId: empId},
      autoFocus:false
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result, ' result');
      if(result){
        let emp = localStorage.getItem('employeeList');
        this.employeeList = JSON.parse(emp);
      }
    });
  }

  delete(i:any,empId:any){
    let emp = localStorage.getItem('employeeList');
    let empList = JSON.parse(emp);
    let index = empList.findIndex((a:any)=> a.id == empId);
    if(index !== -1){
      empList.splice(index,1);
      this.employeeList = empList;
      this.employeeListCopy = empList;
    };

    let updatedEmp = JSON.stringify(empList);
    localStorage.setItem('employeeList',updatedEmp);

    this.toastr.success('Employee Deleted Successfully');
  }



  applyHeaderFilter(){

    const employeeCode = fromEvent(this.employeeCode.nativeElement, "keyup").pipe(
      map((event: any) => event.target.value));
      employeeCode.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(data => {
        console.log(data);
        const filterData = this.employeeListCopy.filter((e:any) => e.employee_code.toLowerCase().indexOf(data.toLowerCase()) !== -1);
        this.employeeList = filterData;
      });

    const employeeName = fromEvent(this.employeeName.nativeElement, "keyup").pipe(
      map((event: any) => event.target.value));
      employeeName.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(data => {
        console.log(data);
        const filterData = this.employeeListCopy.filter((e:any) => e.employee_name.toLowerCase().indexOf(data.toLowerCase()) !== -1);
        this.employeeList = filterData;
      });
      
    const address1 = fromEvent(this.address1.nativeElement, "keyup").pipe(
      map((event: any) => event.target.value));
      address1.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(data => {
        console.log(data);
        const filterData = this.employeeListCopy.filter((e:any) => e.address_1.toLowerCase().indexOf(data.toLowerCase()) !== -1);
        this.employeeList = filterData;
      });

    const mobileNo = fromEvent(this.mobileNo.nativeElement, "keyup").pipe(
      map((event: any) => event.target.value));
      mobileNo.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(data => {
        console.log(data);
        const filterData = this.employeeListCopy.filter((e:any) => e.mobile_no.toLowerCase().indexOf(data.toLowerCase()) !== -1);
        this.employeeList = filterData;
      });

    const DOB = fromEvent(this.DOB.nativeElement, "keyup").pipe(
      map((event: any) => event.target.value));
      DOB.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(data => {
        console.log(data);
        const filterData = this.employeeListCopy.filter((e:any) => e.date_of_birth.toLowerCase().indexOf(data.toLowerCase()) !== -1);
        this.employeeList = filterData;
      });

    const remarks = fromEvent(this.remarks.nativeElement, "keyup").pipe(
      map((event: any) => event.target.value));
      remarks.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(data => {
        console.log(data);
        const filterData = this.employeeListCopy.filter((e:any) => e.remarks.toLowerCase().indexOf(data.toLowerCase()) !== -1);
        this.employeeList = filterData;
      });

    const DOJ = fromEvent(this.DOJ.nativeElement, "keyup").pipe(
      map((event: any) => event.target.value));
      DOJ.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(data => {
        console.log(data);
        const filterData = this.employeeListCopy.filter((e:any) => e.date_of_joining.toLowerCase().indexOf(data.toLowerCase()) !== -1);
        this.employeeList = filterData;
      });
    const salary = fromEvent(this.salary.nativeElement, "keyup").pipe(
      map((event: any) => event.target.value));
      salary.pipe(
        debounceTime(400),
        distinctUntilChanged()
      ).subscribe(data => {
        console.log(data);
        const filterData = this.employeeListCopy.filter((e:any) => e.salary.toLowerCase().indexOf(data.toLowerCase()) !== -1);
        this.employeeList = filterData;
      });
  }
}
