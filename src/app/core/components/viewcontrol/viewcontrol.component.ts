import { Component } from '@angular/core';
import { ViewControl } from 'app/core/classes/viewcontrol';

@Component({
  selector: 'viewcontrol',
  templateUrl: './viewcontrol.component.html',
  styleUrls: ['./viewcontrol.component.css']
})
export class ViewControlComponent extends ViewControl {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
