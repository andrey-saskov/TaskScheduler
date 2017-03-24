import { Component, Input } from '@angular/core';
import { Task } from '../../models/task';

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
        return this.task.scheduledDate.getTime() - this.currentDate.getTime();
    }
}
