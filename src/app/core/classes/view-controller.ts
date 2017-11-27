import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CoreEvent } from '../services/core.service';

export interface ViewControllerOptions {
  data: any[];
  events: Subject<CoreEvent>;
}

export abstract class ViewController {

  protected name: string = "ViewController";
  public viewsData: any[]; // (each of these are passed to view as <data> property)
  protected viewsEvents: Subject<CoreEvent>;

  constructor(options?: ViewControllerOptions) {
    console.log(this.name + ' Class Constructor'); 
    if(options){
      this.setViewsData(options.data);
      this.setViewsEvents(options.events);
    } else {
      this.setViewsData();
      this.setViewsEvents();
    }
  }

  public getName(){
    return this.name;
  }

  public getViewsData(){
    return this.viewsData;
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
}
