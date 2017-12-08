import { MdDialog, MdDialogRef} from '@angular/material';
import { Component } from '@angular/core';
import { ColorPickerService, Rgba } from 'ngx-color-picker';

import {
  DialogService,
  RestService,
  WebSocketService
} from '../../../../services/';

@Component({
  selector: 'customtheme-dialog',
  styleUrls: ['./customtheme-dialog.component.css'],
  templateUrl: './customtheme-dialog.component.html',
})
export class CustomThemeModalDialog {

  public myTheme: any = {};

  constructor(
    public dialogRef: MdDialogRef<CustomThemeModalDialog>,
    private ws: WebSocketService) { }
    
  ngOnInit() {
    
  }

}