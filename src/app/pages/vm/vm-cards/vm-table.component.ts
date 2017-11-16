import {Component, ElementRef, OnInit, Input} from '@angular/core';
import { MaterialModule } from '@angular/material';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';

import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {RestService, WebSocketService} from '../../../services/';

@Component({
  selector : 'vm-table',
  //templateURL: 'vm-table.component.html' // Why does this throw a missing template error?
  template : `
    <ngx-datatable
      class='material'
      [rows]='data'
      [columnMode]="'force'"
      [scrollbarH]="true"
      [rowHeight]="'50px'"
      [headerHeight]="'50px'"
      [footerHeight]="'50px'"
      [limit]="12">

      <ngx-datatable-column name="Name" [flexGrow]="3" [width]="120" [frozenLeft]="true">
	<ng-template let-column="column" ngx-datatable-header-template>
	  {{column.name}}
	</ng-template>
	<ng-template let-i="index" let-row="row" let-value="value" ngx-datatable-cell-template>
	  <!--<span>{{row.state}}</span>-->  <strong>{{value}} {{i}}</strong>
	</ng-template>
      </ngx-datatable-column>

            <ngx-datatable-column name="Description" [flexGrow]="3">
        <ng-template let-column="column" ngx-datatable-header-template>
          {{column.name}}
        </ng-template>
        <ng-template let-value="value" ngx-datatable-cell-template>
          <div>{{value}}</div>
        </ng-template>
      </ngx-datatable-column>

      <ngx-datatable-column name="vCPUs" [flexGrow]="1">
        <ng-template let-column="column" ngx-datatable-header-template>
          {{column.name}}
        </ng-template>
        <ng-template let-value="value" ngx-datatable-cell-template>
          <div>{{value}}</div>
        </ng-template>
      </ngx-datatable-column>

      <ngx-datatable-column name="Memory" [flexGrow]="2">
        <ng-template let-column="column" ngx-datatable-header-template>
          {{column.name}}
        </ng-template>
        <ng-template let-value="value" ngx-datatable-cell-template>
          <div>{{value}}</div>
        </ng-template>
      </ngx-datatable-column>

      <ngx-datatable-column name="Bootloader" [flexGrow]="2">
        <ng-template let-column="column" ngx-datatable-header-template>
          {{column.name}}
        </ng-template>
        <ng-template let-value="value" ngx-datatable-cell-template>
          <div>{{value}}</div>
        </ng-template>
      </ngx-datatable-column>

      <ngx-datatable-column name="AutoStart" [flexGrow]="1">
        <ng-template let-column="column" ngx-datatable-header-template>
          {{column.name}}
        </ng-template>
        <ng-template let-value="value" ngx-datatable-cell-template>
          <div>{{value}}</div>
        </ng-template>
      </ngx-datatable-column>


    </ngx-datatable>
  `
})
export class VmTableComponent {
  /*
  protected resource_name: string = 'vm/vm';
  protected route_add: string[] = [ 'vm', 'add' ];
  protected route_add_tooltip: string = "Add VM";
  protected route_edit: string[] = [ 'vm', 'edit' ];
  protected runnningState: string = "RUNNING";
  protected toggleProp: string = "state";
  protected toggleStart: string = "vm.start";
  protected toggleStop: string = "vm.stop";
  */
  constructor(protected router: Router, protected rest: RestService,
    protected ws: WebSocketService) {}
  public title = "Virtual Machines"

  public columns: Array<any> = [
    {name : 'State', prop : 'state'},
    {name : 'Name', prop : 'name'} ,
    {name : 'Description', prop : 'description'},
    //{name : 'Info', prop : 'info' },
    {name : 'vCPUs', prop : 'vcpus'},
    {name : 'Memory', prop : 'memory'},
    {name : 'Bootloader', prop : 'bootloader'},
    {name: 'Autostart', prop : 'autostart'},
    /*{name: 'Actions', prop : 'cardActions'}*/
  ];

  @Input() data: any[];
  public config: any = {
    paging : true,
    sorting : {columns : this.columns},
    rows: this.data,
  };

  afterInit() { 
    this.config.rows = this.data;
    this.config.columns = this.columns;
  }
}
