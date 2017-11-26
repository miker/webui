//import { SubComponent } from '../../decorators/subcomponent';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { ViewController, ViewControllerOptions } from './view-controller';
import { CoreService, CoreEvent } from '../services/core.service';

export interface PageOptions {
  data: any[];
  events: Subject<CoreEvent>;
  url: string;
}

export abstract class Page extends ViewController {

  //protected name: string = "Page";
  private url: string; // Give the page a url
  private displayList: any[]; // (This is a copy of the <viewsData>. If filtering view nodes, this is what gets altered instead of the actual viewsData)

  constructor(options: PageOptions) {
    super({events: options.events, data: options.data});
    // url ??
    console.log(super.getName() + ' Class Constructor');
  }
}