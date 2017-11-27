import { Component, Input, OnInit } from '@angular/core';
import { View, Action } from 'app/core/classes/view';

// This makes the metadata available globally
// Deal Breaker: Angular injects the component's
// directory path forcing relative paths
export const ViewComponentMetadata = {
  selector: 'view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
}

@Component(ViewComponentMetadata)
export class ViewComponent extends View {

  @Input() data: any;

  constructor(){
    super();
  }

  ngOnInit() {
  }

}
