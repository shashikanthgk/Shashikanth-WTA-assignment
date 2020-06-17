import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeComponent} from "./employee.component"
import {GetappraisalformComponent} from "../employee/getappraisalform/getappraisalform.component"
const routes: Routes = [
  {
    path: '', component: EmployeeComponent, children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'app'
      },
      {
        path: 'app',
        component: GetappraisalformComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
