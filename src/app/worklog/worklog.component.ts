import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatNativeDateModule, MatDatepickerModule } from '@angular/material';

import { WorklogService } from '../services/worklog.service';
import { TaskService } from '../services/task.service';
import { EmployeeService } from '../services/employee.service';

import {WorklogModel} from "./worklog.model";

const dateFormat = 'yyyy-MM-dd';

@Component({
    selector: 'worklog-list',
    templateUrl: 'workLog.component.html',
    styleUrls:['./workLog.component.scss'],
})

export class WorklogListComponent implements OnInit {
    worklogs: any;
    tasks: any;
    employees: any;
    days : any;
    empId : string;
    empName:string;
    startDate:string;
    endDate:string;
    prevStartDate:string;
    prevEndDate:string;
    nextStartDate:string;
    nextEndDate:string;
    newWorklogs: any = [];
    worklogModel: WorklogModel;
    modalRef: BsModalRef;
    success: boolean = false;

    constructor(private worklogService: WorklogService, 
                private taskService: TaskService,
                private employeeService: EmployeeService,
                private route: ActivatedRoute,
                private router:Router,
                private datePipe:DatePipe,
                private modalService: BsModalService) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.empId = params.get("empId"),
            this.startDate = params.get("startDate"),
            this.endDate = params.get("endDate")
          })

        this.getWorklogs();

        this.taskService.getall().subscribe(data => {
            this.tasks = data;
        });

        this.employeeService.getall().subscribe(data => {
            this.employees = data;
            this.empName = this.employees.filter(o => { return o.id == this.empId })[0].name;
        });
    }

    caculateTotal(day){
        var result = 0;
        if(this.worklogs) {
            this.worklogs.forEach(function (value) {
                result += value[day];
                });
        } 
            return result;
    }

    openModal(template: TemplateRef<any>) {
        this.success = false;
        this.worklogModel = new WorklogModel();
        this.worklogModel.employeeId = this.empId;
        this.modalRef = this.modalService.show(template);
      }

      addWorklog(){
        var wm = this.worklogModel;
        var w = this.worklogs.filter(o => { return o.taskId == wm.taskId });
        var dayInd = this.days.indexOf(wm.date) + 1;
        var dayName = 'day' + dayInd + 'Effort';
        if(w.length > 0)
        {
            var oldWorklog = w[0];
            oldWorklog[dayName] += wm.hours;
        }
        else
        {
            var taskName = this.tasks.filter(o => { return o.id == wm.taskId })[0].name;
            var addedWorklog = {
                taskId: wm.taskId,
                taskName: taskName,
                day1Effort: 0,
                day2Effort: 0,
                day3Effort: 0,
                day4Effort: 0,
                day5Effort: 0,
                day6Effort: 0,
                day7Effort: 0
            };
            addedWorklog[dayName] = wm.hours;
            this.worklogs.push(addedWorklog);
        }
          this.newWorklogs.push(wm);
          this.modalRef.hide();
      }

    loadEmployeeWorklog(id, startDate, endDate) {
        this.empId = id || this.empId;
        this.startDate = startDate || this.startDate;
        this.endDate = endDate || this.endDate;
        this.empName = this.employees.filter(o => { return o.id == this.empId })[0].name;
          
        this.getWorklogs();
        this.router.navigate(['/worklog/'+ this.empId + '/' + this.startDate + '/' + this.endDate]);
    }

    getWorklogs() {
        this.worklogService.getUserWorklogForCurrentWeek(this.empId, this.startDate, this.endDate).subscribe((data: any) => {
            this.worklogs = data.tasks;
            this.days = data.days;
            this.prevStartDate = this.datePipe.transform(data.prevStartDate, dateFormat);
            this.prevEndDate = this.datePipe.transform(data.prevEndDate, dateFormat);
            this.nextStartDate = this.datePipe.transform(data.nextStartDate, dateFormat);
            this.nextEndDate = this.datePipe.transform(data.nextEndDate, dateFormat);
        });
    }

    saveWorklogs() {
        this.worklogService.saveWorklogs(this.newWorklogs).subscribe((result) => {});
        this.newWorklogs = [];
        this.success = true;
    }
}