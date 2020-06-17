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
export class AdminserviceService {

  constructor(private http: HttpClient,private auth:AuthserviceService) { }
  setheaders()
  {
   let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('authorization', 'Bearer ' +this.auth.gettoken() );
    return headers;
  }

  getemployee()
  {
    let headers = this.setheaders();
    return this.http
    .get<any>(environment.server_baseurl+"api/admin/getemployee",{ headers: headers })
  }

  getappraisal(eid)
  {
    let headers = this.setheaders();
    return this.http
    .get<any>(environment.server_baseurl+`api/admin/form/${eid}`,{ headers: headers })
  }

  submitform(form,eid)
  {
    let headers = this.setheaders();
    return this.http
    .patch<any>(environment.server_baseurl+`api/admin/form/${eid}`,form,{ headers: headers })
  }
  submitformpost(form,eid)
  {
    let headers = this.setheaders();
    return this.http
    .post<any>(environment.server_baseurl+`api/admin/form/${eid}`,{form},{ headers: headers })
  }
  getemployeename(eid)
  {
  return   this.http.get<any>(environment.server_baseurl+`api/getemployeename/${eid}`);
  }


  delete(eid)
  {
    let headers = this.setheaders();
    return this.http
    .delete<any>(environment.server_baseurl+`api/admin/form/${eid}`,{ headers: headers })
  }

}
