import { Component, AfterViewInit } from '@angular/core';
import { CoreService, CoreEvent } from 'app/core/services/core.service';
import { ViewControllerComponent, ViewConfig, ViewControllerMetadata } from 'app/core/components/viewcontroller/viewcontroller.component';
import { ViewComponent } from 'app/core/components/view/view.component';
import { CardComponent } from 'app/core/components/card/card.component';
import { ViewButtonComponent } from 'app/core/components/viewbutton/viewbutton.component';
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
      this.updateDataAll(evt.data); 
    });

    this.core.register({observerClass:this, eventName:"VmProfile"}).subscribe((evt: CoreEvent) => { 
      console.log(evt);
      this.updateData(evt.data); 
    });

    this.init();
  }

  ngAfterViewInit(){
  }

  init(){
    this.core.emit({name:"VmProfilesRequest"});
    this.controlEvents.subscribe((evt:CoreEvent) => {
      switch(evt.name){
	default:
	  console.log("btnPress received. Changing card.headerTitle...")
	  console.log(evt.sender);
	  console.log(this.displayList);
	    
	  let card = new CardComponent();
	  card.headerTitle = "Title Changed!";
	  let index = this.displayList.indexOf(evt.sender);
	  this.displayList[index] = card;

	break;
      }
    });
  }

  updateData(data){
    // Do Something
  }

  updateDataAll(data){
    console.log("updateDataAll()");
    let card = new CardComponent();
    card.headerTitle = "All of the Views";//data[i].name;

    for(var i = 0; i < data.length; i++){
      let view = new ViewComponent();
      card.addChild(view);
    }

    let button = new ViewButtonComponent();
    button.raised = false;
    button.label = "Send";
    button.action = { name:"btnPress", sender:card};
    button.target = this.controlEvents;
    button.contextColor = "warn";
    card.footerControls = [button];
    this.addChild(card);
  }
}
