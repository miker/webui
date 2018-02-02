import { Component, AfterViewInit, OnInit, OnChanges, Input } from '@angular/core';
import { LayoutChild } from 'app/core/classes/layouts';
import { ViewComponent } from 'app/core/components/view/view.component';
import {UUID} from 'angular2-uuid';
import * as c3 from 'c3';
import { ChartConfiguration, LegendOptions } from 'c3';

export interface ChartData {
  legend: string;
  data: any[];
}

export const ViewChartMetadata = {
  template: `<div id="{{chartId}}" [ngClass]="chartClass" style="position:absolute!important;bottom:0;"></div>`
}

@Component({
  selector: 'viewchart',
  template: ViewChartMetadata.template,
  //templateUrl: './viewchart.component.html',
  styleUrls: ['./viewchart.component.css']
})
export class ViewChartComponent extends ViewComponent implements AfterViewInit {

  public chartColors: string[];
  public maxLabels: number;
  public units: string;
  @Input() width: number;
  @Input() height: number;

  protected chart: any;
  protected _chartType: string;
  protected _data: any[];
  protected _chartId: string;
  protected colors: string[];
  protected legendOptions: LegendOptions = {show: false};

  protected chartConfig: ChartConfiguration;

  constructor() { 
    super();
    this.chartId = "chart-" + UUID.UUID();
    this.chartType = "pie";
    this.units = '';
  }

  ngAfterViewInit() {
    console.log("******** CHART DIMENSIONS - Width:" + this.width + "/ Height: " + this.height);
    this.render();
  }

  ngOnChanges(changes) {
    console.log("OnChanges");
    if(changes.data){
      this.render();
    }
  }

  get data(){
    return this._data;
  }

  set data(d:ChartData[]){
    if(/*!this.chartConfig ||*/ !d){
      /*this.chartConfig = {
        data:{
          columns:[]
        }
      }*/
      this._data = [];
    } else {
      let result: any[] = [];
     
      for(let i = 0; i < d.length; i++){
        let item = d[i];
        let legend = [item.legend];
        let dataObj = legend.concat(item.data)
        result.push(dataObj);
      }
      this._data = result;

      console.log("DEBUG: set data() ********");
      console.log(d);
      //console.log(this.chartConfig);

      //this.chartConfig.data.columns = result;
      this.render();
    }
  }

  get chartId(){
    return this._chartId;
  }

  set chartId(sel: string){
    this._chartId = sel;
    //this.chartConfig.bindto = '#' + sel;
  }

  get chartClass(){
    return this._chartType;
    //return this.chartConfig.data.type;
  }

  get chartType(){
    return this._chartType;
    //return this.chartConfig.data.type;
  }

  set chartType(str:string){
    this._chartType = str;
    //this.chartConfig.data.type = str;
  }

  makeConfig(){
    this.chartConfig = {
     bindto: '#' + this.chartId,
     data: {
       columns: this._data,
       type: this.chartType
     },
     size:{
       width: this.width,
       height: this.height
     },
     tooltip:{
       format: {
         value: (value, ratio, id, index) => {
           if(this.units){
             console.log("Units = " + this.units)
             return value + this.units; 
           } else {
             return value;
           }
         }
       }
     }
    }
    return this.chartConfig;
  }

  render(){
    if(this.data.length == 0){
      console.log("NO DATA FOUND");
      return -1;
    }

    let conf = this.makeConfig();
    let colors = this.colorsFromTheme();
    if(colors){
      let color = {
        pattern: colors
      }
      conf.color = color;
    }

    // Hide legend. We've moved the legends out of the svg and into Angular
    conf.legend = this.legendOptions;
    
    console.log("GENERATING DATA FROM ...");
    console.log(conf);
    this.chart = c3.generate(conf);
    return this.chart
  }

}
