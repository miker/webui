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

  public primary: string = "#0095d5";
  public accent: string = "#ffc107";

  constructor(
    public dialogRef: MdDialogRef<CustomThemeModalDialog>,
    private ws: WebSocketService) { }
    
  ngOnInit() {
    
  }

}