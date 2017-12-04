//import { Component } from '@angular/core';
import { CoreEvent } from 'app/core/services/core.service';
import { Subject } from 'rxjs/Subject';

export interface Action {
  coreEvent: CoreEvent;
}

export abstract class ViewControl {

  public actions?: Action[];
  public isPrimary?: Action;// (this should be your only FAB button in template) 
  public viewController:Subject<CoreEvent>;// (Send actions back to ViewController via this Subject)
  public data: any;

  constructor() {}

  sendAction(action){
    let evt: CoreEvent;
    if(action.properties){
      let properties = [];
      for(var prop in action.properties){
	properties.push(this.data[prop])
      }
      evt = {
	name: action.eventName.name,
	data: properties
      }
    } else {
      evt = { name: action.eventName.name };
    }
    this.viewController.next(evt);
  }
}
