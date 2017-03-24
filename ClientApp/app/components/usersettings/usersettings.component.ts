import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../../models/usersettings';
import { UserSettingsService } from '../../services/usersettings.service';


@Component({
    selector: 'usersettings',
    template: require('./usersettings.component.html')
})
export class UserSettingsComponent implements OnInit {
    private model: UserSettings;

    constructor(private userSettingsService: UserSettingsService) { }

    ngOnInit() {
        this.model = this.userSettingsService.userSettings;
    }

    protected onSubmit() {
        this.userSettingsService.userSettings = this.model;
    }

    private formatDate(date: Date): string {
        let formater = new Intl.NumberFormat("en", { minimumIntegerDigits: 2 });
        return date.getFullYear() + "-" + formater.format(date.getMonth()) + "-" + formater.format(date.getDate()) + "T" + formater.format(date.getUTCHours()) + ":" + formater.format(date.getUTCMinutes());
    }
}