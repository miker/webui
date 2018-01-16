import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {RestService} from '../../../../services/rest.service';

import {EntityTableComponent} from './entity-table.component';

@Component({
  selector : 'app-entity-table-add-actions',
  template : `
	<div *ngIf="this.entity.conf.route_add || this.actions.length > 0">
		<smat-fab-speed-dial #myFab [direction]="direction" [animationMode]="animationMode"
				(mouseenter)="myFab.open = true" (mouseleave)="myFab.open = false">
			<smat-fab-trigger [spin]="spin">
				<button mat-fab><mat-icon>list</mat-icon></button>
			</smat-fab-trigger>

			<smat-fab-actions>
				<button *ngIf="this.entity.conf.route_add" mat-mini-fab (click)="this.entity.doAdd()" mdTooltip="{{this.entity.conf.route_add_tooltip}}">
					<mat-icon>add</mat-icon>
				</button>
				<button *ngFor="let action of actions" mat-mini-fab (click)="action.onClick()" mdTooltip="{{action.label}}">
					<mat-icon>{{action.icon}}</mat-icon>
				</button>
			</smat-fab-actions>
		</smat-fab-speed-dial>
	</div>
  `
})
export class EntityTableAddActionsComponent implements OnInit {

  @Input('entity') entity: any;

  public actions: any[];

  public spin: boolean = true;
  public direction: string = 'right';
  public animationMode: string = 'fling';

  ngOnInit() { 
		this.actions = this.entity.getAddActions(); 
	}
}
