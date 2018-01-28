import { Component, ViewChild, OnInit, AfterViewInit, Input, Renderer2, ViewContainerRef,ComponentRef,ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { LayoutContainer, LayoutChild } from 'app/core/classes/layouts';
import { ViewConfig } from 'app/core/components/viewcontroller/viewcontroller.component';
import { Subject } from 'rxjs/Subject';
import {Subscription} from "rxjs/Subscription";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import { CoreEvent } from 'app/core/services/core.service';

@Component({
  selector:'[displayContainer]',
  //template: `<!-- This is just a placeholder similar to RouterOutlet. DONT PUT ANYTHING HERE!! -->`
  template: `<ng-container layoutComponent></ng-container>`
})
export class DisplayContainer{
  @Input() layoutChild: LayoutChild = {flex:"99"}
  constructor(public viewContainerRef:ViewContainerRef){}

  get vcRef(){
    return this.viewContainerRef;
  }
}

@Component({
  selector:'[layoutComponent]',
  template: `<!--<div fxFlex="{{layoutChild.flex}}"><ng-container displayContainer #vcr></ng-container></div>-->`
})
export class LayoutComponent{
  @Input() layoutChild: LayoutChild = {flex:"99"}
  @ViewChild('vcr') vcr;
  constructor(){}

  get vcRef(){
    return this.vcr.vcRef;
  }
}

@Component({
  selector:'display',
  //template: `<ng-container #test><div fxFlex="{{layoutChild.flex}}"><ng-container displayContainer  #wrapper></ng-container></div></ng-container>`
  template: `<div displayContainer #wrapper style="display:none"></div>
              <!--<div displayContainer class="{{i}}"  fxFlex="{{displayList[i].instance.layoutChild.flex || '92'}}"></div></ng-container>-->
             <!--<ng-container #test><ng-container displayContainer [layoutChild]="layoutChild"></ng-container></ng-container>-->`
})
export class Display implements OnInit,AfterViewInit{

  public displayList: any[] = []; // items in DOM
  public children: any[] = [];
  public layoutContainer: LayoutContainer;
  public layoutChild: LayoutChild = {flex:"91"};
  private ready:boolean = false;
  private flexChange: Subscription;
  
  @ViewChild('wrapper') wrapper;
  //@ViewChild('test',{read:ViewContainerRef}) test:ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef, private renderer: Renderer2, flexMedia: ObservableMedia){
    //DEBUG: console.log("Display Component Constructor");
    this.flexChange = flexMedia.subscribe((change: MediaChange) => {
      console.log("**** BREAK!! ****");
      console.log(change);
      //this.moveAllStyles();
    });
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
    //DEBUG: console.log("******** Display AfterViewInit ********");    
    //console.log(this.test);

    //if(!this.wrapper.viewContainerRef){ throw "WTF... this.wrapper.viewContainerRef is undefined!"}
    //DEBUG: console.log("******** Display is Ready!!!! ********");
    this.ready = true;
  }

  create(component:any, returnCompRef?:boolean){
    //DEBUG: console.log("******** Create()!!!! ********");
    //DEBUG: console.log(component);
    let compRef = <any>this.resolver.resolveComponentFactory(component).create(this.viewContainerRef.injector);
    //let compRef = <any>this.resolver.resolveComponentFactory(component).create(this.test.injector);
    this.children.push(compRef);
    //console.log(compRef.instance.layoutChild);
    //this.layoutChild.flex = compRef.instance.layoutChild.flex;
    if(returnCompRef){return compRef;}
    return compRef.instance ;
  }

  addChild(instance){
    if(this.children.length == 0){return -1;}
    let compRef = this.getChild(instance);
    let childIndex = this.children.indexOf(compRef);
    //DEBUG: console.log("******** addChild()!!!! ********");

    /* NEW WAY */
    // Insert into DOM
    //this.viewContainerRef.insert(compRef.hostView);// addChild();
    this.wrapper.vcRef.insert(compRef.hostView);// addChild();
    //compRef.changeDetectorRef.markForCheck();

    // Setup ChangeDetection and add to DisplayList
    compRef.changeDetectorRef.detectChanges();    
    this.displayList.push(instance);
  
    // Deal with component's selector element
    let container = this.viewContainerRef.element.nativeElement;
    this.moveStyles(compRef); //move flex layout styles to component seletor element
  }

  /*
  private moveContents(compRef, container ){
    let selector = compRef.hostView.rootNodes["0"];
    let contents = compRef.hostView.rootNodes["0"].childNodes;
    let node: any;
    //DEBUG: console.log("******** moveContents() ********");
    //console.log(contents);
    for(let i = 0; i < contents.length; i++){
      //DEBUG: console.log(contents[i].tagName);
      if(contents[i].tagName){ // Comments come up as "undefined"
	this.renderer.appendChild(container, contents[i]);
	this.renderer.removeChild(container, selector);
      }
    }
  }
  */

 moveAllStyles(){
  for(let i = 0; i < this.children.length; i++){
    this.moveStyles(this.children[i]);
  }
 }

  moveStyles(compRef,test?:boolean){
    let elRef = compRef.location;
    let el = elRef.nativeElement;
    let innerEl = el.children[0];
    let innerElRef = el.firstElementChild
    let style: string;

    // fetch style from element
    for(let i in innerElRef.attributes){
      if(innerElRef.attributes[i].name == "style"){
        style = innerElRef.attributes[i].value;
      }
    }
    if(!style){return -1;}
    // Apply style to parent
    this.renderer.setAttribute(el, "style", ""); // clear the style
    this.renderer.setAttribute(el, "style", style);
    this.renderer.removeAttribute(innerEl,"style");

    //DEBUG: console.log("******** Moving Styles to Parent ********");
    //DEBUG: console.log(compRef);
    //DEBUG: console.log(style);
    //DEBUG: console.log(el);
    //DEBUG: console.log(innerEl);
  }

  removeChild(instance){
    let compRef = this.getChild(instance);
    // Remove from children
    let ci = this.children.indexOf(compRef);
    this.children.splice(ci,1);
    // Remove from displayList
    let dli = this.displayList.indexOf(instance);
    this.displayList.splice(dli,1);

    // Destroy component reference
    compRef.destroy();
  }

  /*
  getLayoutCompRef(index){
    let dc = this.viewContainerRef.get(index); //displayContainer's vcRef 
    //DEBUG: console.log(dc);
    //let lc = dc.instance.vcRef; // layoutContainer's vcRef
    return dc;
  }
  */

  getChild(instance){
    for(let i = 0; i < this.children.length; i++){
      if(this.children[i].instance == instance){
	return this.children[i];
      }
    }
  }
}
