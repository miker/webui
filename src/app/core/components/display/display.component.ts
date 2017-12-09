import { Component, OnInit, Input,  OnChanges, SimpleChanges,EventEmitter, ViewContainerRef,ComponentRef,ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { ViewConfig } from 'app/core/components/viewcontroller/viewcontroller.component';
import { Subject } from 'rxjs/Subject';
import { CoreEvent } from 'app/core/services/core.service';

@Component({
  selector:'display',
  template: `
    <ng-container *ngFor="let child of children; let i = index">
      <ng-template></ng-template>
    <ng-container>
  `
})
export class Display implements OnInit, OnChanges {

  public displayList: any[] = []; // items in DOM
  public children: any[] = [];

  constructor(private resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef){
    console.log("Display Component Constructor");
  }

  ngOnInit(){}

  ngOnChanges(changes: SimpleChanges){}

  create(component){
    const injector = this.viewContainerRef.injector;
    const compRef = <any>this.resolver.resolveComponentFactory(component).create(injector);
    this.children.push(compRef);
    return compRef.instance ;
  }

  addChild(instance){
    let compRef = this.getChild(instance);
    /* NEW WAY */
    this.viewContainerRef.insert(compRef.hostView);// addChild();
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
