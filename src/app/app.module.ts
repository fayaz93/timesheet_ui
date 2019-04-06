import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { AppBoostrapModule } from './app-bootstrap/app-bootstrap.module';
import { MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee/employee.component';
import { EmployeeService } from './services/employee.service';
import { WorklogListComponent } from './worklog/worklog.component';
import { WorklogService } from './services/worklog.service';
import { TaskService } from './services/task.service';
import { AppRoutingModule } from './/app-routing.module';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    WorklogListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    AppBoostrapModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    EmployeeService,
    WorklogService,
    TaskService,
    DatePipe,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
