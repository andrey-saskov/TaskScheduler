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
    private model = TaskComponent.initialTaskValue();
    private lastResult;
    private status = "";

    constructor(private taskService: TaskService) { }

    onScheduledTimeSelected(e) {
        // console.log('onScheduledTimeSelected e.srcEl ' + e.srcElement.value);
        // console.log('onScheduledTimeSelected new date ' + new Date(e.srcElement.value));
        // console.log('onScheduledTimeSelected creation date ' + this.model.creationDate);
        this.model.scheduledDate = new Date(e.srcElement.value);
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
            this.model = TaskComponent.initialTaskValue();
            this.status = "Task <a href='tasklist#" + this.lastResult.id + "'>" + this.lastResult.name + "</a> have been added."
        }
    }

    private static initialTaskValue(): Task {
        return new Task(0, '','', null, new Date(), new Date(), true, false);
    }
}