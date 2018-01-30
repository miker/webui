import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CoreService, CoreEvent } from 'app/core/services/core.service';
import { Subject } from 'rxjs/Subject';
import { WidgetComponent } from 'app/core/components/widgets/widget/widget.component'; // POC
import { AnimationDirective } from 'app/core/directives/animation.directive';

@Component({
  selector: 'dashboard',
  template:`
  <div class="widgets-wrapper"
  fxLayout="row"
  fxLayoutWrap
  fxLayoutAlign="space-around center"
  fxLayoutGap="1%">
    <widget fxFlex="250px" [widgetSize]="small" animate [animation]="animation" [shake]="shake"></widget>
      <button md-fab color="primary" (click)="toggleShake()"><md-icon role="img">settings</md-icon></button>
  </div>
  `
})
export class DashboardComponent implements AfterViewInit {

  protected core:CoreService;
  public large: string = "lg";
  public medium: string = "md";
  public small: string = "sm";

  public animation = "stop";
  public shake = false;

  constructor(){
  }

  ngAfterViewInit(){
    this.init();
  }

  init(){

    console.log("******** Dashboard Initializing... ********");
  }

  toggleShake(){
    if(this.shake){
      this.shake = false;
    } else if(!this.shake){
      this.shake= true;
    }
  }

  updateData(data){
    // Do Something
    }

  updateDataAll(data){
  }
}
