import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

import { Observable, Subscription } from 'rxjs/Rx';


@Component({
    selector: 'task',
    template: require('./task.component.html'),
    styleUrls: ['./task.component.css']
})
export class TaskComponent {
    private model = new Task(0, '','', null, this.formatDate(new Date()), this.formatDate(new Date()), true, false);
    private lastResult;
    private status = "";

    constructor(private taskService: TaskService) {
    }

    private formatDate(date: Date): string {
        let formater = new Intl.NumberFormat("en", { minimumIntegerDigits: 2 });
        return date.getFullYear() + "-" + formater.format(date.getMonth() + 1) + "-" + formater.format(date.getDate()) + "T" + formater.format(date.getHours()) + ":" + formater.format(date.getMinutes());
    }

    onScheduledTimeSelected(e) {
        this.model.scheduledDate = e.srcElement.value;
    }

    protected onSubmit() {
        this.taskService.addTask(this.model).subscribe (
            result => { this.lastResult = result; },
            error => { this.status = "Error"; this.lastResult = null; console.log(<any>error) },
            () => this.onSubmitComplete()
        );
    }

    private onSubmitComplete() {
        if (this.lastResult && this.lastResult.id) {
            this.model = new Task(0, '','', null, this.formatDate(new Date()), this.formatDate(new Date()), true, false);
            this.status = "Task <a href='tasklist#" + this.lastResult.id + "'>" + this.lastResult.name + "</a> have been added."
        }
    }
}