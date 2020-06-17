import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from "../Authservice/authservice.service"
import {Router, ɵangular_packages_router_router_a} from "@angular/router"
import {ActivatedRoute} from "@angular/router" 

@Component({
  selector: 'app-registeremployee',
  templateUrl: './registeremployee.component.html',
  styleUrls: ['./registeremployee.component.css']
})
export class RegisteremployeeComponent implements OnInit {

  constructor(private routeractivated: ActivatedRoute,private auth: AuthserviceService,public router:Router) { }
  authError: any;

  ngOnInit(): void {
    this.loadScript("assets/js/main.js");
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    });  
  }
  
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }




  register(forval)
  {
    this.authError = null;
    console.log(forval.value)
    let emailvalid = this.auth.validateEmail(forval.value.email)
    let org_name = this.auth.checkwhitespace(forval.value.org_name)
    let firstname = this.auth.checkwhitespace(forval.value.firstname)
    let lastname = this.auth.checkwhitespace(forval.value.lastname)
    let employeeid = this.auth.checkwhitespace(forval.value.employeeid);
    if(!emailvalid) this.authError ={message:"Email is not valid"};
    else if(org_name) this.authError = {message:"organization ID can not be blank"};
    else if(firstname) this.authError = {message:"firstname can not be blank"};
    else if(lastname) this.authError = {message:" lastname is not valid"};
    else if(employeeid) this.authError = {message:"employee id can not be blank"};
    else if(forval.value.password!=forval.value.cpassword)  this.authError = {message:"Password must match"};
    else{
      delete forval.value.cpassword
      console.log(forval.value);
      forval.value.employeeid = forval.value.employeeid.toString();
      forval.value.org_name = forval.value.org_name.toString();
    let res = this.auth.registeremployee(forval.value);
    res.subscribe(data=>{
      console.log("data",data);
      if(data['err']==null){
      localStorage.setItem('token',null)
      localStorage.setItem('userid',null);
      localStorage.setItem('type',null);
      this.router.navigateByUrl("/auth/login");
    }
    else{
        this.authError = {message:"Registration failed try again!!!"};
      }
    })
  
    }
  
  }

  gotoadmin()
  {
    this.router.navigateByUrl("/auth/register/admin");

  }

  gotologin()
  {
    this.router.navigateByUrl("/auth/login");

  }





}

