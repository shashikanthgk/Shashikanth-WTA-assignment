import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { GetappraisalformComponent } from './getappraisalform/getappraisalform.component';

import { MatCardModule, } from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button"
import { MatTabsModule } from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input"
import { FormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [GetappraisalformComponent, NavbarComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
     FormsModule, 
     MatDialogModule, 
     MatFormFieldModule, 
     MatButtonModule,
      MatInputModule,
      MatDividerModule
  ]
})
export class EmployeeModule { }
