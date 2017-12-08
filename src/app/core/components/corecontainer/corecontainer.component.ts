import { Component, OnInit, Input,  OnChanges, SimpleChanges,EventEmitter, ViewContainerRef,ComponentRef,ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { ViewConfig } from 'app/core/components/viewcontroller/viewcontroller.component';
import { Subject } from 'rxjs/Subject';
import { CoreEvent } from 'app/core/services/core.service';

@Component({
  selector:'core-container',
  template: '<ng-template></ng-template>'
})
export class CoreContainer implements OnInit, OnChanges {

  readonly componentName = CoreContainer;
  @Input() child:any;
  private instance: any;
  public changeEvents: Subject<CoreEvent>;

  constructor(private resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef){      
  }

  ngOnInit(){
    //this.loadComponent();
  }

  ngOnChanges(changes: SimpleChanges){
    
    console.log("ngOnChanges() ********");
    this.onChange();
  }

  onChange(){
    if(this.instance){
      this.configureComponent(this.instance);
    } else {
      this.loadComponent();
    }
  }

  loadComponent(){
    console.log("Loading Component ********");
    
    const factory = this.resolver.resolveComponentFactory(this.child.componentName);
    
    const ref = <any>this.viewContainerRef.createComponent(factory);
    this.instance = ref.instance;
    this.configureComponent(ref.instance);
    ref.changeDetectorRef.detectChanges();    
    
  }
  
  configureComponent(inst){
    for(var prop in this.child){
      if(typeof this.child[prop] !== "function"){
	inst[prop] = this.child[prop]
      }
    }
  }
  
}
