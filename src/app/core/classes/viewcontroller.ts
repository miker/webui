import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CoreEvent } from 'app/core/services/core.service';
import { View } from 'app/core/classes/view';
import { Action } from 'app/core/classes/viewcontrol';

export interface ViewControllerOptions {
  //data: any[];
  events: Subject<CoreEvent>;
  //actions?: Action[];
}

export abstract class ViewController implements OnDestroy {

  public name: string = "ViewController";
  public displayList: any[] = []; 
  protected controlEvents: Subject<CoreEvent>;
  private coreContainer: Subject<CoreEvent>;

  constructor(options?: ViewControllerOptions) {
    console.log(this.name + ' Class Constructor'); 
    if(options){
      this.setControlEvents(options.events);
    } else {
      this.setControlEvents();
    }
  }

  public addChild(component){
      this.displayList.push(component);
  }

  public removeChild(){
  }

  public getName(){
    return this.name;
  }

  public setControlEvents(subj?:Subject<CoreEvent>){
    if(subj){
      this.controlEvents = subj;
    } else {
      this.controlEvents = new Subject();
    }
  }

  ngOnDestroy(){}
}
