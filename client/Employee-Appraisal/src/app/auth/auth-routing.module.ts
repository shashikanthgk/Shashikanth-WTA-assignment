import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisteradminComponent} from "../auth/registeradmin/registeradmin.component";
import {RegisteremployeeComponent} from "../auth/registeremployee/registeremployee.component";

import {LoginComponent} from "../auth/login/login.component";
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
  path: '', component: AuthComponent, children: [
    {
      path: 'login', component: LoginComponent
    },
    {
      path: 'register/admin', component: RegisteradminComponent
    },
    {
      path: 'register/employee', component: RegisteremployeeComponent
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
