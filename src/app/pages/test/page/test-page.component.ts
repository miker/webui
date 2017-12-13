import { Component, AfterViewInit } from '@angular/core';
import { CoreService, CoreEvent } from 'app/core/services/core.service';
import { ViewControllerComponent, ViewConfig, ViewControllerMetadata } from 'app/core/components/viewcontroller/viewcontroller.component';
import { ViewComponent } from 'app/core/components/view/view.component';
import { CardComponent } from 'app/core/components/card/card.component';
import { ViewButtonComponent } from 'app/core/components/viewbutton/viewbutton.component';
import { Subject } from 'rxjs/Subject';
import { Display } from 'app/core/components/display/display.component';

@Component({
  selector: 'test-page',
  template:ViewControllerMetadata.template,
  styles: ViewControllerMetadata.styles
})
export class TestPage extends ViewControllerComponent implements AfterViewInit {

  readonly componentName = TestPage;
  constructor(){
    super();
  }

  ngAfterViewInit(){
    console.log("******** TestPage OnInit() ********");
    this.controlEvents.subscribe((evt:CoreEvent) => {
      switch(evt.name){
	case "RemoveCard":
	  this.removeChild(evt.sender);
	  break;
	default:
	  let card = evt.sender;
	  card.headerTitle = "Title Changed!";
	  break;
      }
    });

    this.init();
  }

  init(){

    console.log("******** TestPage Initializing... ********");

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

    this.core.emit({name:"VmProfilesRequest"});
  }

  updateData(data){
    // Do Something
  }

  updateDataAll(data){
    console.log("updateDataAll()");
    for(var i = 0; i < data.length; i++){
      // Setup Card (ViewController)
      let card = this.create(CardComponent);
      card.layoutChild = { flex:"45%" }
      card.header = true;
      card.headerTitle = data[i].name;

      // Setup the View
      let view = card.create(ViewComponent);
      card.addChild(view);

      // Setup Controls
      let button = card.create(ViewButtonComponent, 'footerControls');
      button.raised = false;
      button.label = "Delete";
      button.action = { name:"RemoveCard", sender:card};
      button.target = this.controlEvents;
      button.contextColor = "warn";
      card.footer = true;
      card.addChild(button,'footerControls');
      this.addChild(card);
    }
  }
}
