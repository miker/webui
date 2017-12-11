import { Component, ViewChild, OnInit, AfterViewInit, Input, ViewContainerRef,ComponentRef,ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { LayoutContainer, LayoutChild } from 'app/core/classes/layouts';
import { ViewConfig } from 'app/core/components/viewcontroller/viewcontroller.component';
import { Subject } from 'rxjs/Subject';
import { CoreEvent } from 'app/core/services/core.service';

@Component({
  selector:'[displayContainer]',
  template: `<!-- This is just a placeholder similar to RouterOutlet. DONT PUT ANYTHING HERE!! -->`
})
export class DisplayContainer{
  constructor(public viewContainerRef:ViewContainerRef){}
}
@Component({
  selector:'display',
  template: `<ng-container #test><ng-container displayContainer  #wrapper></ng-container></ng-container>`
})
export class Display implements OnInit,AfterViewInit{

  public displayList: any[] = []; // items in DOM
  public children: any[] = [];
  @ViewChild('wrapper') wrapper;
  @ViewChild('test',{read:ViewContainerRef}) test:ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef){
    console.log("Display Component Constructor");
    
  }

  ngOnInit(){}

  ngAfterViewInit(){
    console.log("******** Display AfterViewInit ********");    
    console.log(this.test);

    if(!this.wrapper.viewContainerRef){ throw "WTF... this.wrapper.viewContainerRef is undefined!"}

    console.log("******** Display is Ready!!!! ********");
  }

  create(component:any){
    console.log("******** Create()!!!! ********");
    console.log(this.wrapper);
    let compRef = <any>this.resolver.resolveComponentFactory(component).create(this.viewContainerRef.injector);
    //let compRef = <any>this.resolver.resolveComponentFactory(component).create(this.test.injector);
    this.children.push(compRef);
    return compRef.instance ;
  }

  addChild(instance){
    let compRef = this.getChild(instance);
    console.log("******** addChild()!!!! ********");
    /* NEW WAY */
    this.viewContainerRef.insert(compRef.hostView);// addChild();
    //this.test.insert(compRef.hostView);// addChild();
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
