import { Injectable } from '@angular/core';
import * as domHelper from '../../helpers/dom.helper';
import { RestService, WebSocketService } from 'app/services';

export interface Theme {
  name: string;
  label: string;
  baseColor: string;
  isActive: boolean;
  isHidden: boolean;
  hasDarkLogo: boolean;
  rh: string
}

@Injectable()
export class ThemeService {
  readonly freeThemeDefaultIndex = 3;

  public freenasThemes: Theme[] = [{
    name: 'egret-dark-purple',
    label: 'Dark Purple',
    baseColor: '#9c27b0',
    isActive: false,
    isHidden: false,
    hasDarkLogo: false,
    rh: "24px"
  }, {
    name: 'egret-dark-pink',
    label: 'Dark Pink',
    baseColor: '#e91e63',
    isActive: false,
    isHidden: false,
    hasDarkLogo: false,
    rh: "24px"
  }, {
    name: 'egret-blue',
    label: 'Blue',
    baseColor: '#2196f3',
    isActive: false,
    isHidden: false,
    hasDarkLogo: true,
    rh: "24px"
  }, {
    name: 'ix-blue',
    label: 'iX Blue',
    baseColor: '#0095D5',
    isActive: true,
    isHidden: false,
    hasDarkLogo: false,
    rh: "24px"
  }, {
    name: 'egret-indigo',
    label: 'Indigo',
    baseColor: '#3f51b5',
    isActive: false,
    isHidden: false,
    hasDarkLogo: false,
    rh: "24px"
  }, {
    name: 'freenas-warriors',
    label: 'Warriors',
    baseColor: '#fdb927',
    isActive: false,
    isHidden: false,
    hasDarkLogo: true,
    rh: "24px"
  }, {
    name: 'freenas-sharks',
    label: 'Sharks',
    baseColor: '#088696',
    isActive: false,
    isHidden: false,
    hasDarkLogo: false,
    rh: "24px"
  }, {
    name: 'custom-light',
    label: 'Custom Light',
    baseColor: '#0095D5',
    isActive: false,
    isHidden: true,
    hasDarkLogo: false,
    rh: "0"
  }, {
    name: 'custom-dark',
    label: 'Custom Dark',
    baseColor: '#0095D5',
    isActive: false,
    isHidden: true,
    hasDarkLogo: true,
    rh: "0"
  }];

  savedUserTheme = "";

  constructor(private rest: RestService, private ws: WebSocketService) {

    this.rest.get("account/users/1", {}).subscribe((res) => {
      this.savedUserTheme = res.data.bsdusr_attributes.usertheme;
      this.freenasThemes.forEach((t) => {
        t.isActive = (t.name === this.savedUserTheme);
      });

      if( typeof(this.savedUserTheme) !== "undefined" && this.savedUserTheme !== "" ) {
        domHelper.changeTheme(this.freenasThemes, this.savedUserTheme);
      } else {{
        this.freenasThemes[this.freeThemeDefaultIndex].isActive = true;
      }}

    });
  }


  changeTheme(theme) {
    domHelper.changeTheme(this.freenasThemes, theme.name);
    this.freenasThemes.forEach((t) => {
      t.isActive = (t.name === theme.name);
    });

    this.ws.call('user.update', [1, {
      attributes: {
        usertheme: theme.name
      }
    }]).subscribe((res_ws) => {
      console.log("Saved usertheme:", res_ws, theme.name);
    });
  }
}
