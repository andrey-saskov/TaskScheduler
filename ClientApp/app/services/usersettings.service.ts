import { Injectable } from '@angular/core';
import { UserSettings } from '../models/usersettings';

@Injectable()
export class UserSettingsService {
  public userSettings: UserSettings;

  constructor () {
      this.userSettings = new UserSettings("#d9edf7", "yyyy-MM-dd hh:mm", new Date(), "All", "Name", true);
  }
}
