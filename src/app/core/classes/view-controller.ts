import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CoreEvent } from '../services/core.service';

export interface ViewControllerOptions {
  data: any[];
  events: Subject<CoreEvent>;
}

export abstract class ViewController {

  private viewsData: any[]; // (each of these are passed to view as <data> property)
  private viewsEvents: Subject<CoreEvent>;

  constructor(options: ViewControllerOptions) {
    //this.viewsData
    console.log('ViewController Class Constructor');
  }
}
