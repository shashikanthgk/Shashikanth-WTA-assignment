import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubmitformComponent} from "../admin/submitform/submitform.component"
import {AdminComponent} from "./admin.component"
import {GetemployeeComponent} from "../admin/getemployee/getemployee.component"
import {UpdateformComponent} from "../admin/updateform/updateform.component"
const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {
        path: 'employees', component: GetemployeeComponent
      },
      {
        path: 'submit/:eid', component: SubmitformComponent
      },
      {
        path: 'update/:eid', component: UpdateformComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
