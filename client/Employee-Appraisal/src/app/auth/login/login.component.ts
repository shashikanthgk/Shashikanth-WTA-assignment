import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from "../Authservice/authservice.service"
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthserviceService,public router:Router) { }
  autherror: any;

  ngOnInit(): void {

    this.loadScript("assets/js/main.js");
    this.auth.eventAuthError$.subscribe(data => {
      this.autherror = data;
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




  login(forval)
  {
      this.autherror = null;
      let emailvalid = this.auth.validateEmail(forval.value.email)
      let passvalid = this.auth.checkwhitespace(forval.value.password)
      if(!emailvalid)this.autherror= {message:"Email is not valid"};
      else if(passvalid) this.autherror ={message:"password can not be bank"};
      else
      {
        console.log("shashi")
        let res = this.auth.login(forval.value);
        res.subscribe(data=>{


          if(data['error']==null){
            console.log(data)
          localStorage.setItem('token',data['data'].token)
          localStorage.setItem('userid',data['data'].id);
          localStorage.setItem('usertype',data['data'].user.type)
            if(data['data'].user.type=='user')
            {
              this.router.navigateByUrl('/employee');
            }
            else{
              this.router.navigateByUrl('/admin/employees');
            }
          }
          else{
            console.log(data['error'])
            this.autherror = {message:"wrong password/email "};
          }
        })
      }
      
  }





  goadmin()
  {
  this.router.navigateByUrl('/auth/register/admin')
  }
  goemployee()
  {
    this.router.navigateByUrl('/auth/register/employee')

  }

}
