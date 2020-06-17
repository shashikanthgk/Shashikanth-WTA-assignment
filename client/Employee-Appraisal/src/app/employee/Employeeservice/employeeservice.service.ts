import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {environment} from "../../../environments/environment"

import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { flatMap } from 'rxjs/operators';

import { HttpHeaders, HttpRequest } from '@angular/common/http';
import {AuthserviceService} from "../../auth/Authservice/authservice.service"
@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {

  constructor(private http: HttpClient,private auth:AuthserviceService) { }



  setheaders()
  {
   let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('authorization', 'Bearer ' +this.auth.gettoken() );
    return headers;
  }

  getappraisal()
  {
    let headers = this.setheaders();
    return this.http
    .get<any>(environment.server_baseurl+"api/employee/form",{ headers: headers })
  }
}
