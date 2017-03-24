import { Component, Input } from '@angular/core';
import { Task } from '../../models/task';
import { ParseDate } from '../../shared/dateParser';

@Component({
    selector: 'countdown',
    template: require('./countdown.component.html')
})
export class CountdownComponent {
    @Input()
    private task: Task;
    @Input()
    private currentDate: Date;

    protected getCountdownValue(): number {
        return ParseDate(this.task.scheduledTime).getTime() - this.currentDate.getTime();
    }}
