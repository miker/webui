import { Component, ViewChild, OnInit, AfterViewInit, Input, ViewContainerRef,ComponentRef,ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { LayoutContainer, LayoutChild } from 'app/core/classes/layouts';
import { ViewConfig } from 'app/core/components/viewcontroller/viewcontroller.component';
import { Subject } from 'rxjs/Subject';
import { CoreEvent } from 'app/core/services/core.service';

@Component({
  selector:'display-container',
  template: `<!-- This is just a placeholder similar to RouterOutlet. DONT PUT ANYTHING HERE!! -->`
})
export class DisplayContainer{
  constructor(public viewContainerRef:ViewContainerRef){}
}
@Component({
  selector:'display',
  template: `
    <div> 
      <div fxLayoutWrap fxLayout="{{layoutContainer.layout}}" fxLayoutAlign="{{layoutContainer.align}}" fxLayoutGap="{{layoutContainer.gap}}">
	<ng-container><display-container #wrapper></display-container></ng-container>
      </div>
    </div>
  `
})
export class Display implements OnInit,AfterViewInit{

  public displayList: any[] = []; // items in DOM
  public children: any[] = [];
  @ViewChild('wrapper') wrapper
  public layoutContainer:LayoutContainer = {layout:"row", align:"space-between start", gap:"5%"};
  public layoutChild?:LayoutChild;

  constructor(private resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef){
    console.log("Display Component Constructor");
    
  }

  ngOnInit(){}

  ngAfterViewInit(){
    console.log("******** Display AfterViewInit ********");    
    console.log(this.wrapper.viewContainerRef);

    if(!this.wrapper.viewContainerRef){ throw "WTF... this.wrapper.viewContainerRef is undefined!"}
    //this.layout({layout:"row", align:"space-between start", gap:"5%"})

    console.log("******** Display is Ready!!!! ********");
  }

  layout(layout:LayoutContainer){
    this.layoutContainer = layout;
  }

  create(component:any){
    console.log("******** Create()!!!! ********");
    console.log(this.wrapper);
    //const injector = this.viewContainerRef.injector;
    //const injector = this.wrapperVCR.injector;
    const compRef = <any>this.resolver.resolveComponentFactory(component).create(this.wrapper.viewContainerRef.injector);
    this.children.push(compRef);
    return compRef.instance ;
  }

  addChild(instance){
    let compRef = this.getChild(instance);
    console.log("******** addChild()!!!! ********");
    /* NEW WAY */
    this.wrapper.viewContainerRef.insert(compRef.hostView);// addChild();
    compRef.changeDetectorRef.detectChanges();    
    this.displayList.push(instance);
  }

  getChild(instance){
    for(let i = 0; i < this.children.length; i++){
      if(this.children[i].instance == instance){
	return this.children[i];
      }
    }
  }
}
