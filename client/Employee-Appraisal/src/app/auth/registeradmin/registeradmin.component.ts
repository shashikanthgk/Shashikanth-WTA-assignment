import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from "../Authservice/authservice.service"
import {Router, ɵangular_packages_router_router_a} from "@angular/router"
import {ActivatedRoute} from "@angular/router" 

@Component({
  selector: 'app-registeradmin',
  templateUrl: './registeradmin.component.html',
  styleUrls: ['./registeradmin.component.css']
})
export class RegisteradminComponent implements OnInit {

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
  console.log("shashi",forval.value.password,forval.value.cpassword)
  let emailvalid = this.auth.validateEmail(forval.value.email)
  let org_name = this.auth.checkwhitespace(forval.value.org_name.toString())
  let firstname = this.auth.checkwhitespace(forval.value.firstname)
  let lastname = this.auth.checkwhitespace(forval.value.lastname)
  if(!emailvalid) this.authError ={message:"Email is not valid"};
  else if(org_name) this.authError = {message:"organization can not be blank"};
  else if(firstname) this.authError = {message:"firstname can not be blank"};
  else if(lastname) this.authError = {message:" lastname is not valid"};
  else if(forval.value.password!=forval.value.cpassword)  this.authError = {message:"Password must match"};
  else{
    delete forval.value.cpassword
    console.log(forval.value);
    forval.value['org_name'] = forval.value.org_name.toString();
  let res = this.auth.register(forval.value);
  res.subscribe(data=>{
    console.log(data);
    if(data['error']==null){
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
gotologin()
{
  this.router.navigateByUrl("/auth/login");

}

gotouserr()
{
  this.router.navigateByUrl("/auth/register/employee");

}

}
