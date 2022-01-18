import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board models';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData ! : any;
  

  constructor(private formbuilder: FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getAllEmployee();
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmploye(this.employeeModelObj)
    .subscribe((_req: any)=>{
      console.log(res)
      alert("Employee Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();

      this.formValue.reset();
      this.getAllEmployee();
    },
      (    err: any)=>{
      alert("somthing went wrong")
    })
     

  }
getAllEmployee(){
  this.api.getEmploye()
  .subscribe(res=>{
    this.employeeData = res;
  })
}
}
function res(res: any) {
  throw new Error('Function not implemented.');
}

