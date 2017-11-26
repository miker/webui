import { Component } from '@angular/core';
//import { SubComponent } from '../../../core/decorators/subcomponent';

import { CoreService,CoreEvent } from 'app/core/services/core.service';
import { Page, PageOptions } from 'app/core/classes/page';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPage {

  constructor(protected core: CoreService){
    //super({ events:new Subject(), data:[], url:"Test Page" });
    this.core.register({observerClass: this, eventName:"someRandomEvent"}).subscribe((evt) => {console.log('Blah')});
    console.log('TestPage Component Contructor')
  }
}
