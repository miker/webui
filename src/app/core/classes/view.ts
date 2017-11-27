//import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface Action {
  element: string;
  eventName: string;
}

export abstract class View {

  public actions?: Action[];
  public primaryAction?: Action;// (this should be your only FAB button in template) 
  public parent:Subject<any>;// (Send actions back to ViewController via this Subject)
  public data: any;

  constructor() { }
}
