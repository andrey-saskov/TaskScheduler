import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Router  } from '@angular/router';
import { Injectable } from '@angular/core'; 
import { Subject } from 'rxjs/Subject'; 
import { isBrowser } from 'angular2-universal';
import { WebSocketService } from './websocket.service'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/filter'; 


const SERVER_URL = 'ws://localhost:5000/ws'; 

export enum ActionType {
    Add,
    Complete,
    Remove
}

export interface UpdateState { 
	action: ActionType 
} 

@Injectable() 
export class UpdateService { 
	public updated: Subject<UpdateState> = new Subject<UpdateState>(); 

	constructor(private wsService: WebSocketService, private location: Location,  private router: Router) { 
		if (isBrowser) {
			this.updated = <Subject<UpdateState>>this.wsService 
				.connect(SERVER_URL) 
				.map((response: MessageEvent): UpdateState => { 
					return JSON.parse(response.data)
				});
		}
	} 
}
