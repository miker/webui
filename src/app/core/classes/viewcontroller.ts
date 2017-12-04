import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CoreEvent } from 'app/core/services/core.service';
import { Action } from 'app/core/classes/viewcontrol';

export interface ViewControllerOptions {
  data: any[];
  events: Subject<CoreEvent>;
  actions?: Action[];
}

export abstract class ViewController implements OnDestroy {

  protected name: string = "ViewController";
  public viewsData: any[]; // (each of these are passed to view as <data> property)
  protected displayList: any[]; // (This is a copy of the <viewsData>. If filtering view nodes, this is what gets altered instead of the actual viewsData)
  public viewsActions: Action[]; // Do we need this? 
  protected viewsEvents: Subject<CoreEvent>;

  constructor(options?: ViewControllerOptions) {
    console.log(this.name + ' Class Constructor'); 
    if(options){
      this.setViewsData(options.data);
      this.setViewsEvents(options.events);
      if(options.actions){ this.setViewsActions(options.actions)}
    } else {
      this.setViewsData();
      this.setViewsEvents();
      this.setViewsActions();
    }
  }

  protected addView(component){
    this.viewsData.push(component);
  }

  public getName(){
    return this.name;
  }

  public getViewsData(){
    return this.viewsData;
  }

  public getViewsActions(){
    return this.viewsActions;
  }

  public setViewsData(data?: any[]){
    if(data){
      this.viewsData = data;
    } else {
      this.viewsData = [];
    }
  }

  public setViewsEvents(subj?:Subject<CoreEvent>){
    if(subj){
      this.viewsEvents = subj;
    } else {
      this.viewsEvents = new Subject();
    }
  }

  public setViewsActions(arr?:Action[]){
    if(arr){
      this.viewsActions = arr;
    } else {
      this.viewsActions = [];
    }
  }

  ngOnDestroy(){}
}
