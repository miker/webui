import { Component, OnInit } from '@angular/core';
import { CoreServiceInjector } from 'app/core/services/coreserviceinjector';
import { CoreContainer } from 'app/core/components/corecontainer/corecontainer.component';
import { CoreService, CoreEvent } from 'app/core/services/core.service';
import { ViewController } from 'app/core/classes/viewcontroller';
import { Subject } from 'rxjs/Subject';

export const ViewControllerMetadata = {
  template: `
  <ng-container *ngIf="viewsData.length > 0;">
    <ng-container *ngFor="let view of viewsData; let i=index;">
      <core-container [loadedView]="viewsData[i]"></core-container>
    </ng-container>
  </ng-container>
  `,
}

export interface ViewConfig {
  componentName: any,
  componentData: any;
  controller?: Subject<any>;
}

@Component({
  selector: 'viewcontroller',
  template:ViewControllerMetadata.template,
  //template: '<core-container *ngFor="let view of viewsData; let i=index;" [loadedView]="view[i]"></core-container>',
  styleUrls: ['./viewcontroller.component.css']
})
export class ViewControllerComponent extends ViewController implements OnInit {

  readonly componentName = ViewControllerComponent;
  protected core: CoreService;
  public viewEvents: Subject<CoreEvent> = new Subject();

  constructor() {
    super();
    this.core = CoreServiceInjector.get(CoreService);
  }

  ngOnInit(){
  }

}
