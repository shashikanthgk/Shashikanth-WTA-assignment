import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import {AdminserviceService } from "../Adminservice/adminservice.service"
import {AuthserviceService} from "../../auth/Authservice/authservice.service"
import { Router,ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-getemployee',
  templateUrl: './getemployee.component.html',
  styleUrls: ['./getemployee.component.css']
})
export class GetemployeeComponent implements OnInit {

  constructor(private router:Router,public adser:AdminserviceService,public auth:AuthserviceService) { }
  employees:any;
  ngOnInit(): void {
    
    let token = this.auth.gettoken();
    if(token==null)
    {
      
    }

    this.adser.getemployee().subscribe(data=>{
      console.log(data);
      if(data['error']=='auth error')
      {
        //login
      }
      else if(data['error']==null)
      {
        this.employees = data['message'];
      }
    })
  }
  action(index)
  {

    console.log(this.employees);
    this.router.navigateByUrl(`/admin/update/${this.employees[index]['employeeid']}`)
  }

}
