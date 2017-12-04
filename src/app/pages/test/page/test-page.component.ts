import { Component, AfterViewInit } from '@angular/core';
import { CoreService, CoreEvent } from 'app/core/services/core.service';
import { ViewControllerComponent, ViewConfig, ViewControllerMetadata } from 'app/core/components/viewcontroller/viewcontroller.component';
import { CardComponent, CardData } from 'app/core/components/card/card.component';
import { Subject } from 'rxjs/Subject';
import { CoreContainer } from 'app/core/components/corecontainer/corecontainer.component';

@Component({
  selector: 'test-page',
  //templateUrl: '../../../core/components/page/page.component.html',
  template:ViewControllerMetadata.template,
  //template:'<core-container [loadedView]="loadedView"></core-container>',
  styleUrls: ['./test-page.component.css']
})
export class TestPage extends ViewControllerComponent implements AfterViewInit {

   readonly componentName = TestPage;
  constructor(){
    super();

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

  ngAfterViewInit(){
  }

  init(){
    let actions = [
      {
	control:'ViewControlButton',
	coreEvent:{ name:'VmProfile' },
	id: "0"
      }
    ];
    this.setViewsActions(actions);
    this.core.emit({name:"VmProfilesRequest"});
  }

  processEvent(evt){
    let result = [];
    for(var i = 0; i < evt.length; i++){
      let card: CardData = {};
      card.header = evt[i].name;
      card.content = evt[i].vm_type;
      let view = new CardComponent();
      view.viewController = this.viewEvents;
      view.data = card;
      this.addView(view);
    }
  }
}
