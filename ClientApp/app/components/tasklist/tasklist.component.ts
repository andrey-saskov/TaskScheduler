import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Router  } from '@angular/router';
import { isBrowser } from 'angular2-universal';
import { Task } from '../../models/task';
import { GridComponent } from '../grid/grid.component';

import { TaskService } from '../../services/task.service';
import { UpdateService, UpdateState, ActionType } from '../../services/update.service';
import { UserSettingsService } from '../../services/usersettings.service';

import { Observable, Subscription } from 'rxjs/Rx';


@Component({
    selector: 'task-list',
    template: require('./tasklist.component.html'),
    providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class TaskListComponent implements OnInit {
    @ViewChild(GridComponent)
    private grid: GridComponent;

    private timerService;
    private subService: Subscription;
    private updateCheckService: Subscription;

    private tasks: Task[];
    private initialTaskId: number;
    private selectedTask: Task;

    private readonly FilterAll = "All";
    private readonly FilterActive = "Active";
    private readonly FilterCompleted = "Completed";

    constructor(private taskService: TaskService, private updateService: UpdateService, private userSettingsService: UserSettingsService, private router: Router, private location: Location) {
        //router.events.subscribe((val) => { this.initializeGrid(); });
    }

    ngOnInit(): void {
        if (isBrowser) {
            this.timerService = Observable.timer(0, 60000);
            this.subService = this.timerService.subscribe(t => this.getTasks());

            this.updateCheckService = this.updateService.updated.subscribe(update => { this.updateIfNeeded(update); }); 
        }
    }

    initializeGrid() {
        if (this.tasks) {
            this.initialTaskId = +this.location.path();
            this.selectedTask = this.tasks.filter(t => t.id == this.initialTaskId)[0];
            // this.grid.initializeScroll(this.selectedTask);
        }
    }

    protected onFilter(filter: string) {
        this.userSettingsService.userSettings.filter = filter;
        this.getTasks();
    }

    protected onOrderChange() {
        this.getTasks();
    }

    protected isSelected(filter: string): boolean {
        return this.userSettingsService.userSettings.filter == filter;
    }

    protected getTasks(): void {
        // let testtasks = [];
        // for (let i = 0; i < 2200; i++) {
        //     testtasks.push(new Task(i, 'sdfsdf ' + i, 'sdf sdf sdfsd fsd fsdf sdf sdf' + i, i, this.formatDate(new Date()), this.formatDate(new Date()), true, false));
        // }

        this.taskService.getTasks().subscribe(
            //tasks => { this.tasks = testtasks; },
            tasks => { this.tasks = tasks; },
            error => { console.log('Can\'t get data from server'); },
            () => { this.initializeGrid(); }
        );
    }

    private onClickTask(task: Task): void {
        this.router.navigate([], { fragment: task.id.toString() });
        this.selectedTask = task;
    }

    protected onComplete(task: Task): void {
        this.taskService.completeTask(task).subscribe(
            tasks => { this.tasks = tasks; },
            error => { console.log('Can\'t get data from server'); },
            () => { this.updateService.updated.next( { action: ActionType.Complete } ); }
        );
    }

    protected onRemove(task: Task): void {
        this.taskService.removeTask(task).subscribe(
            tasks => { this.tasks = tasks; },
            error => { console.log('Can\'t get data from server'); },
            () => { this.updateService.updated.next( { action: ActionType.Remove } ); }
        );
    }

    protected updateIfNeeded(update: UpdateState) {
        if (this.userSettingsService.userSettings.filter == this.FilterAll
            || (this.userSettingsService.userSettings.filter == this.FilterActive && update.action != ActionType.Remove)
            || (this.userSettingsService.userSettings.filter == this.FilterCompleted && update.action != ActionType.Add)) {
            this.getTasks();
        }
    }
}