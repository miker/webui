import 'style-loader!./baPageTop.scss';
import {BaThemeConfigProvider} from '../../theme.configProvider';

import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';

import { GlobalState } from '../../../global.state';
import { WebSocketService, DialogService } from '../../../services/index';
import { BaThemePreloader } from '../../services/baThemePreloader';
import { BaThemeConfig } from '../../theme.config';
import { Router } from '@angular/router';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  providers: [DialogService]
})
export class BaPageTop {

  public isScrolled: boolean = false;
  public isMenuCollapsed: boolean = false;
  
  constructor(protected router: Router, private _state: GlobalState, public _ws: WebSocketService, private dialogService: DialogService){
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  changeTheme() {
      const mainElement: any = document.getElementById("mainbodyElement");
      let themeClass: string = mainElement.className;
    
      // This is a hack.. Id pull the actual theme name from your dialog.. That'd come up in this method.. 
      // This function can be executed from anywhere/component cause Im just using document.getElementById (the straight up dom)
      // This toggles.. If material.. It gets switched to dark.  If dark switched to material.
      if( themeClass.indexOf("material-theme") !== -1) {
        themeClass = themeClass.replace("material-theme", "dark-theme");
      } else if( themeClass.indexOf("dark-theme") !== -1 ) {
        themeClass = themeClass.replace("dark-theme", "material-theme");
      } else {
        themeClass += " material-theme";
      }
      
      // Old school.. Straight up dom element here.
      mainElement.className = themeClass;  // You can find this in any W3 JavaScript description.. Not framework.
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) { this.isScrolled = isScrolled; }

  public logOut() {
    this.dialogService.confirm("Logout", "You are about to LOGOUT the system, are you sure?").subscribe((res) => {
      if (res) {
        this._ws.logout();
      }
    });
  }

  public onShutdown(): void {
    this.dialogService.confirm("Reboot", "You are about to SHUTDOWN the system, are you sure?").subscribe((res) => {
      if (res) {
        this._ws.call('system.shutdown', {}).subscribe( (res) => {
        });
      }
    })
  }

  public onReboot(): void {
    this.dialogService.confirm("Reboot", "You are about to REBOOT the system, are you sure?").subscribe((res) => {
      if (res) {
        this._ws.call('system.reboot', {}).subscribe( (res) => {
        });
      }
    })
  }
}
