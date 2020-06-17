import { Component, OnInit } from '@angular/core';
import {EmployeeserviceService} from "../Employeeservice/employeeservice.service"
@Component({
  selector: 'app-getappraisalform',
  templateUrl: './getappraisalform.component.html',
  styleUrls: ['./getappraisalform.component.css']
})
export class GetappraisalformComponent implements OnInit {

  constructor(public empser:EmployeeserviceService) { }
  form:any;
  ngOnInit(): void {

this.empser.getappraisal().subscribe(data=>{
  console.log(data);
  if(data['error']==null)
  {
    this.form = data;

  }
  else{
    this.form = null;
  }
})

  }

}
