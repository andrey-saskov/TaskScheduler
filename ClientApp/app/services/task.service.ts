import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Task } from '../models/task';
import { UserSettingsService } from './usersettings.service';
import { UserSettings } from '../models/usersettings';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {
    private taskServiceUrl = '/api/ScheduledTask/';

    constructor (private http: Http, private userSettingsService: UserSettingsService) {}

    public getTasks(): Observable<Task[]> {
        return this.http.get(this.taskServiceUrl + 'tasklist' + this.filterQueryString())
            .share()
            .map(this.extractData)
            .catch(this.handleError);
    }

    public addTask(task: Task): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions( { headers: headers } );

        return this.http.post(this.taskServiceUrl + 'addtask', task, options)
            .share()
            .map(this.extractData)
            .catch(this.handleError);
    }

    public completeTask(task: Task): Observable<Task[]> {
        return this.http.get(this.taskServiceUrl + 'completetask/' + task.id + this.filterQueryString())
            .share()
            .map(this.extractData)
            .catch(this.handleError);
    }

    public removeTask(task: Task): Observable<Task[]> {
        return this.http.get(this.taskServiceUrl + 'removetask/' + task.id + this.filterQueryString())
            .share()
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        let data = body || { };
        if (data && data.length) {
            data.forEach((d) => {
                d.creationDate = new Date(new Date(d.creationDate).getTime() + new Date().getTimezoneOffset() * 60 * 1000 );
                d.scheduledDate = new Date(new Date(d.scheduledDate).getTime() + new Date().getTimezoneOffset() * 60 * 1000 );
            });
        }
        return data;
    }

    private filterQueryString(): string {
        let userSettings = this.userSettingsService.userSettings;
        return '/' + userSettings.filter + '/' + userSettings.sortColumn + '/' + (userSettings.sortAsc ? "Asc" : "Desc");
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
