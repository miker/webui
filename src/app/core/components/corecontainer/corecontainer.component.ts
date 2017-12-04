import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef,ComponentRef,ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { ViewConfig } from 'app/core/components/viewcontroller/viewcontroller.component';

@Component({
  selector:'core-container',
  template: '<ng-template></ng-template>'
})
export class CoreContainer implements OnInit {

  readonly componentName = CoreContainer;
  @Input() loadedView: any;

  constructor(private resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef){
  }

  ngOnInit(){
    this.loadComponent();
  }

  loadComponent(){
    console.log("Loading Component ********");
    console.log(this.loadedView)
    const factory = this.resolver.resolveComponentFactory(this.loadedView.componentName);
    const ref = <any>this.viewContainerRef.createComponent(factory);
    this.configureComponent(ref);
    ref.changeDetectorRef.detectChanges();    
  }

  configureComponent(ref){
    for(var prop in this.loadedView){
      if(typeof this.loadedView[prop] !== "function"){
	ref.instance[prop] = this.loadedView[prop]
      }
    }
  }
}
