import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeListComponent }      from './employee/employee.component';
import { WorklogListComponent }      from './worklog/worklog.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee/getall', pathMatch: 'full' },
  { path: 'employee/getall', component: EmployeeListComponent },
  { path: 'worklog/:empId/:startDate/:endDate', component: WorklogListComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}