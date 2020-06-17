import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {environment} from "../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http: HttpClient) { }

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
checkwhitespace(value)
{
    let regex =   /^ *$/
    return regex.test(value);
}

login(logindata)
{
  return this.http.post(environment.server_baseurl+"auth/login/",logindata);
}

gettoken()
{
  let token = localStorage.getItem("token");
  if(token) return token;
  else return null;
}

checkauthstate()
{
  if(this.gettoken()) return this.gettoken();
  else return null;
}

register(formvalue)
{
  return this.http.post(environment.server_baseurl+"auth/register/admin",formvalue);
}
registeremployee(formvalue)
{
  return this.http.post(environment.server_baseurl+"auth/register/employee",formvalue);
}
validatephone(phone)
{
  let regex =/^[0-9]+$/
  return regex.test(phone);
}
}
