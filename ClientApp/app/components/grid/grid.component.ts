import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { isBrowser } from 'angular2-universal';
import { Task } from '../../models/task';
import { UserSettingsService } from '../../services/usersettings.service';
import { ParseDate } from '../../shared/dateParser';

import { Observable, Subscription } from 'rxjs/Rx';


@Component({
    selector: 'grid',
    template: require('./grid.component.html'),
    styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnChanges {
    @Input() private tasks: Task[];
    @Input() private initialTaskId: number;
    @Output() onTaskSelected = new EventEmitter<Task>();
    @Output() onTaskComplete = new EventEmitter<Task>();
    @Output() onTaskRemove = new EventEmitter<Task>();
    @Output() onOrderChange = new EventEmitter();

    private displayedTasks: Task[];
    @ViewChild('scrollContainer') private scrollContainer: ElementRef;
    @ViewChild('scrollTop') private scrollTop: ElementRef;
    @ViewChild('scrollBottom') private scrollBottom: ElementRef;

    private timerCountdown;
    private subCountdown: Subscription;

    private currentDate = new Date();
    private startCurrent = 0;
    private visibleCount = 20;

    constructor(private userSettingsService: UserSettingsService) { }

    ngOnInit(): void {
        if (isBrowser) {
            this.timerCountdown = Observable.timer(0, 1000);
            this.subCountdown = this.timerCountdown.subscribe(t => this.currentDate = new Date());
        }
    }

    ngOnChanges() {
        this.startCurrent = 0;
        this.displayedTasks = this.tasks ? this.tasks.slice(0, this.visibleCount) : [];
    }

    public initializeScroll(task: Task) {
        this.onScroll();
    }

    private firstTask(): Task {
        return this.displayedTasks[0];
    }

    private lastTask(): Task {
        return this.displayedTasks ? this.displayedTasks[this.displayedTasks.length - 1] : null;
    }

    private onScroll(): void {
        if (this.tasks && this.tasks.length >= this.visibleCount) {
            this.processScroll();
        }
    }

    private processScroll(): void {
        let frameHeight = this.scrollContainer.nativeElement.offsetHeight;
        let scrollTop = this.scrollContainer.nativeElement.scrollTop;
        let scrollArea = this.scrollContainer.nativeElement.scrollHeight - frameHeight;
        let res = scrollTop / scrollArea;

        let start = Math.floor((this.tasks.length - this.visibleCount) * res);
        if (Math.abs(this.startCurrent - start) > 1 || (scrollTop < this.scrollTop.nativeElement.offsetHeight)) {
            let fullHeight = 37 * (this.tasks.length);
            let top = Math.floor(fullHeight * res);
            let bottom = fullHeight - Math.floor(fullHeight * res);
            this.scrollTop.nativeElement.height = top.toString() + 'px';
            this.scrollBottom.nativeElement.height = bottom.toString() + 'px';
            this.displayedTasks = this.tasks.slice(start, start + this.visibleCount);
            this.startCurrent = start;
        }
    }

    private onSortChanged(orderBy: string): void {
        if (this.userSettingsService.userSettings.sortColumn == orderBy) {
            this.userSettingsService.userSettings.sortAsc = !this.userSettingsService.userSettings.sortAsc;
        }
        this.userSettingsService.userSettings.sortColumn = orderBy;

        this.onOrderChange.emit();
    }
    
    private onClickTask(task: Task): void {
        this.onTaskSelected.emit(task);
    }

    protected onComplete(task: Task, event): void {
        event.stopPropagation();
        this.onTaskComplete.emit(task);
    }

    protected onRemove(task: Task, event): void {
        event.stopPropagation();
        this.onTaskRemove.emit(task);
    }

    protected getRowBackgroundColor(i: number): string {
        return i % 2 == 1 ? this.userSettingsService.userSettings.altRowsColor : "inherit";
    }

    protected getDateFormat(): string {
        return this.userSettingsService.userSettings.dateFormat;
    }

    protected getCountdownValue(task: Task): number {
        return ParseDate(task.scheduledTime).getTime() - this.userSettingsService.userSettings.currentDate.getTime();
    }
}
