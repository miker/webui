import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

/*
 * Heavily influenced by Objective C's NSNotificationCenter
 * Terminology has been altered to follow RxJS/Javascript 
 * to make things more intuitive, but doesn't actually use
 * RxJS under the hood.
 *
 * If you're interested check out the link below:
 * https://developer.apple.com/documentation/foundation/nsnotificationcenter
 *
 * NSNotification = CoreEvent
 * addObserver() = subscribe()
 * postNotification() = next()
 * 
 *
 * */

export interface CoreEvent {
  name: string;
  sender?: any;
  data?: any;
}

interface Registration {
  observerClass:object; // The component/service listening for the event
  observable?: Subject<CoreEvent>; // The Subject that provides the Observable to the observerClass
  eventName?: string; // If undefined, your class will react to everything
  sender?:object; // Only listen for events from a specific sender
}

@Injectable()
export class FreeNASCoreService {
  public coreEvents: Subject<CoreEvent>;
  constructor() {
    console.log("*** New Instance of FreeNAS Core Service ***");
    this.coreEvents = new Subject();
    this.coreEvents.subscribe(
      (evt:CoreEvent) => {
	// Do Stuff
	console.log("*** CoreEvent: " + evt.name);
      },
      (err) =>{
	console.log(err);
      });
  }

  private dispatchTable = [];

  public register(reg:Registration){
    reg.observable = new Subject();
    this.dispatchTable.push(reg);
    console.log("FREENASCORESERVICE: New Registration");
    console.log(reg);
    return reg.observable;
  }

  public unsubscribe(){
  }

  public emit(evt: CoreEvent){
    console.log("CORESERVICE: Emit() ");

    //avoid matching null values
    if(!evt.name){
      evt.name = "null";
    }
    if(!evt.sender){
      evt.sender = "null";
    }

    for(var i=0; i < this.dispatchTable.length; i++){
      let reg = this.dispatchTable[i]; // subscription
      if(reg.eventName == evt.name && reg.sender == evt.sender){
	console.log("Matched name and sender");
        reg.observable.next(evt);
      } else if(evt.name && reg.eventName == evt.name){
	console.log("Matched name only");
        reg.observable.next(evt);
      } else if(evt.sender && reg.sender == evt.sender){
	console.log("matched sender only");
        reg.observable.next(evt);
      } else {
	console.log("No match found");
      }
    }
    return this;
  }

}
