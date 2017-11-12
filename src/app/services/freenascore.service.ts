import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


export interface CoreEvent {
  name: string;
  args?: any;
  data?: any;
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

}
