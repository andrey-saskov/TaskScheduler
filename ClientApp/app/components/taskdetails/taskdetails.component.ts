import { Component, Input } from '@angular/core';
import { UserSettingsService } from '../../services/usersettings.service';
import { Task } from '../../models/task';
 
@Component({
    selector: 'taskdetails',
    template: require('./taskdetails.component.html')
})
export class TaskDetailsComponent {
    @Input() task: Task;

    constructor(private userSettingsService: UserSettingsService) { }

    private getDateFormat(): string {
        return this.userSettingsService.userSettings.dateFormat;
    }
}
