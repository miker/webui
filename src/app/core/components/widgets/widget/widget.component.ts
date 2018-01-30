import { Component, AfterViewInit, Input, ViewChild } from '@angular/core';
import { CoreServiceInjector } from 'app/core/services/coreserviceinjector';
import { CoreService, CoreEvent } from 'app/core/services/core.service';
import { MaterialModule } from '@angular/material';
import { ChartData } from 'app/core/components/viewchart/viewchart.component';
import { ViewChartDonutComponent } from 'app/core/components/viewchartdonut/viewchartdonut.component';
import { ViewChartPieComponent } from 'app/core/components/viewchartpie/viewchartpie.component';
import { AnimationDirective } from 'app/core/directives/animation.directive';
import filesize from 'filesize';

@Component({
  selector: 'widget',
  template:`
  <div class="widget widget-{{widgetSize}}">
  <div class="card-container {{flipDirection}} front" animate [animation]="flipAnimation">
  <md-card class="front">
    <md-card-content fxLayout="row" fxLayoutWrap fxLayoutAlign="center center"><viewchartdonut fxFlex="100" #chart [width]="chartSize" [height]="chartSize"></viewchartdonut></md-card-content>
    <div class="widget-footer"><button md-raised-button color="primary" (click)="toggleConfig()">Flip</button></div>
  </md-card>
  <md-card class="back">
    <md-card-content>
      <h3>Form goes here</h3>
    </md-card-content>
    <div class="widget-footer"><button md-raised-button color="primary" (click)="toggleConfig()">Flip</button></div>
  </md-card>
  </div>
  </div>
  `
})
export class WidgetComponent implements AfterViewInit {

  protected core:CoreService;
  @Input() widgetSize: string;
  @ViewChild('chart') chart: ViewChartDonutComponent;// | ViewChartPieComponent;
  public chartSize:number = 160;
  public flipAnimation = "stop";
  public flipDirection = "horizontal";
  public isFlipped: boolean = false;

  constructor(){
    this.core = CoreServiceInjector.get(CoreService);
  }

  ngAfterViewInit(){
    this.core.register({observerClass:this,eventName:"PoolData"}).subscribe((evt:CoreEvent) => {
      console.log(evt);
      this.setChartData(evt);
      //this.animation = "stop";
    });

    this.core.emit({name:"PoolDataRequest"});
  }

  toggleConfig(){
    if(this.isFlipped){
      this.flipAnimation = "unflip";
    } else {
      this.flipAnimation = "flip"
    }
  
    if(this.flipDirection == "vertical"){
      this.flipAnimation += "V";
    } else if(this.flipDirection == "horizontal"){
      this.flipAnimation += "H";
    }

    this.isFlipped = !this.isFlipped;
  }

  setChartData(evt:CoreEvent){
    let usedObj = filesize(evt.data[0].used, {output: "object", exponent:3});
    let used: ChartData = {
      legend: 'Used', 
      data: [usedObj.value]
    };

    let  availableObj = filesize(evt.data[0].avail, {output: "object", exponent:3});
    let available: ChartData = {
      legend:'Available', 
      data: [availableObj.value]
    };

    this.chart.units = 'GB';
    this.chart.title = 'Zpool';
    this.chart.data = [used,available];
    console.log(this.chart.data);
    this.chart.width = this.chartSize;
    this.chart.height = this.chartSize;
  }

}
