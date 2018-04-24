import { RestService, WebSocketService } from '../../../services';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppLoaderService } from '../../../services/app-loader/app-loader.service';
import { T } from '../../../translate-marker';

@Component({
  selector: 'app-plugins-available-list',
  template: `<entity-table [title]="title" [conf]="this"></entity-table>`
})
export class PluginsAvailabelListComponent {

  public title = "Available Plugins";
  protected queryCall = 'jail.list_resource';
  protected queryCallOption = ["PLUGIN", true];
  protected entityList: any;

  public columns: Array < any > = [
    { name: T('Name'), prop: '0', icon: '5' },
    { name: T('Description'), prop: '1' },
    { name: T('Official'), prop: '4'},
  ];
  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
  };

  constructor(protected router: Router, protected rest: RestService, protected ws: WebSocketService, protected loader: AppLoaderService) {}

  getActions(parentRow) {
    return [{
        id: "install",
        label: T("install"),
        onClick: (row) => {
          this.router.navigate(
            new Array('').concat(["plugins", "add", row[2]]));
        }
      }
    ]
  }
}
