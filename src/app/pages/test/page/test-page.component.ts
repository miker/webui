import { Component } from '@angular/core';
import { SubComponent } from 'app/core/decorators/subcomponent';
import { CoreService,CoreEvent } from 'app/core/services/core.service';
import { PageComponent } from 'app/core/components/page/page.component';
import { CardComponent, CardData } from 'app/core/components/card/card.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'test-page',
  templateUrl: '../../../core/components/page/page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPage extends PageComponent {

  constructor(protected core: CoreService){
    super(core);
    console.log('TestPage Component Contructor');

    /* 
     * Register the component with the EventBus 
     * and subscribe to the observable it returns
     */
    this.core.register({observerClass:this, eventName:"VmProfiles"}).subscribe((evt: CoreEvent) => { 
      console.log(evt);
      this.processEvent(evt.data); 
    });

    this.init();
  }

  init(){
    this.core.emit({name:"VmProfilesRequest"});
  }

  processEvent(evt){
    let result = [];
    for(var i = 0; i < evt.length; i++){
      let card: CardData = {};
      card.header = evt[i].name;
      card.content =evt[i].vm_type;
      card.footer = "Actions go here";

      result.push(card);
    }
    this.setViewsData(result);
  }

}
