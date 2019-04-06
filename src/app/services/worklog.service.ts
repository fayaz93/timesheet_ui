import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WorklogService {
    private baseapi = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getUserWorklogForCurrentWeek(empId, startDate, endDate) {
        return this.http.get(this.baseapi + "/worklog/" + empId + "/" + startDate + "/" + endDate);
    }

    saveWorklogs(logs) {
        return this.http.post(this.baseapi + "/worklog/save", JSON.stringify(logs), {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json'
            })
        });
        
    }
}