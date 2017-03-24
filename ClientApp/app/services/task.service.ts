import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Task } from '../models/task';
import { UserSettings } from '../models/usersettings';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {
    private taskServiceUrl = '/api/ScheduledTask/';

    constructor (private http: Http) {}

    public getTasks(filter: UserSettings): Observable<Task[]> {
        return this.http.get(this.taskServiceUrl + 'tasklist/' + filter.filter + '/' + filter.sortColumn + '/' + (filter.sortAsc ? "Asc" : "Desc"))
            .share()
            .map(this.extractData)
            .catch(this.handleError);
    }

    public addTask(task: Task): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions( { headers: headers } );

        let jsonTask = JSON.stringify(task);
        return this.http.post(this.taskServiceUrl + 'addtask', task, options)
            .share()
            .map(this.extractData)
            .catch(this.handleError);
    }

    public completeTask(task: Task, filter: UserSettings): Observable<Task[]> {
        return this.http.get(this.taskServiceUrl + 'completetask/' + task.id + '/' + filter.filter + '/' + filter.sortColumn + '/' + (filter.sortAsc ? "Asc" : "Desc"))
            .share()
            .map(this.extractData)
            .catch(this.handleError);
    }

    public removeTask(task: Task, filter: UserSettings): Observable<Task[]> {
        return this.http.get(this.taskServiceUrl + 'removetask/' + task.id + '/' + filter.filter + '/' + filter.sortColumn + '/' + (filter.sortAsc ? "Asc" : "Desc"))
            .share()
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
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
