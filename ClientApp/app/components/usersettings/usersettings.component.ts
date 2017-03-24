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
}