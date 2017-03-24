import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { TaskComponent } from './components/task/task.component';
import { TaskListComponent } from './components/tasklist/tasklist.component';
import { TaskDetailsComponent } from './components/taskdetails/taskdetails.component';
import { GridComponent } from './components/grid/grid.component';
import { UserSettingsComponent } from './components/usersettings/usersettings.component';

import { DateTimeValidatorDirective } from './shared/datetimevalidator.directive';
import { CountdownPipe } from './shared/countdown.pipe';

import { TaskService } from './services/task.service';
import { UserSettingsService } from './services/usersettings.service';
import { UpdateService } from './services/update.service'; 
import { WebSocketService } from './services/websocket.service'; 



@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CountdownComponent,
        TaskComponent,
        TaskListComponent,
        TaskDetailsComponent,
        GridComponent,
        UserSettingsComponent,
        DateTimeValidatorDirective,
        CountdownPipe
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'tasklist', pathMatch: 'full' },
            { path: 'task', component: TaskComponent },
            { path: 'tasklist', component: TaskListComponent },
            { path: 'usersettings', component: UserSettingsComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [TaskService, UserSettingsService, UpdateService, WebSocketService]
})
export class AppModule {
}
