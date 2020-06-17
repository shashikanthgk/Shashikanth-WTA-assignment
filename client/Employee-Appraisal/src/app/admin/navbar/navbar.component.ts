import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {ActivatedRoute} from "@angular/router" 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen:boolean=false;
  token:any;
  mid;

  constructor(private routeractivated: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }



  togglenavbar()
  {
    this.navbarOpen = !this.navbarOpen
  }


  logout()
  {
    localStorage.clear()
    this.router.navigateByUrl("/auth/login");
  }
  
  goto()
  {
    if(this.token==null)
    {
      this.router.navigateByUrl("/auth/login");

    }

  }
  
  
  employee()
  {
    this.router.navigateByUrl("/admin/employees");

  }

  }


