import { Component,Input, OnInit } from '@angular/core';
import { ViewComponent } from 'app/core/components/view/view.component';
import { MaterialModule } from '@angular/material';

export interface CardData {
  header?: any;
  content?: any;
  footer?: any;
}

// This makes the metadata available globally
export const CardComponentMetadata = {
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
}

@Component(CardComponentMetadata)
export class CardComponent extends ViewComponent {

  readonly componentName = CardComponent;
  @Input() data: any; //CardData = {};

  constructor(){
    super();
  }
}
