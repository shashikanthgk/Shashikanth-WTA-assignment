import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { GetemployeeComponent } from './getemployee/getemployee.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatSelectModule} from '@angular/material/select';

import { MatCardModule, } from '@angular/material/card';
import {MatButtonModule} from "@angular/material/button"
import { MatTabsModule } from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input"
import { MatListModule} from '@angular/material/list';
import { SubmitformComponent } from './submitform/submitform.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatNativeDateModule} from '@angular/material/core';
import { UpdateformComponent } from './updateform/updateform.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [GetemployeeComponent, SubmitformComponent, UpdateformComponent, NavbarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
     FormsModule, 
     MatDialogModule, 
     MatFormFieldModule, 
     MatButtonModule,
      MatInputModule,
      MatDividerModule,
      MatListModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatRadioModule,
      MatSelectModule,
      MatNativeDateModule
  ]
})
export class AdminModule { }
