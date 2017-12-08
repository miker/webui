import { Component,Input, OnInit } from '@angular/core';
import { CoreContainer } from 'app/core/components/corecontainer/corecontainer.component';
import { ViewControllerComponent } from 'app/core/components/viewcontroller/viewcontroller.component';
import { MaterialModule } from '@angular/material';

/*
export interface CardData {
  header?: any;
  content?: any;
  footer?: any;
}
 */

// This makes the metadata available globally
export const CardComponentMetadata = {
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
}

@Component(CardComponentMetadata)
export class CardComponent extends ViewControllerComponent {

  readonly componentName = CardComponent;
  @Input() data: any; 


  /*
   * Properties
   * Wraps all content in an md-card
   * private headerTitle?: string 
   * private headerOptions?: ViewControl 
   * private primaryAction?: ViewFabButton
   * Methods
   * addHeaderTitle(title: string);
   * addHeaderOptions(); // adds Options menu to header
   * addFooterControls(ViewButton[]);
   * addPrimaryAction(btn:  ViewFabButton);
   */	

  public headerTitle?: string;
  public headerOptions?: any; /*ViewControl*/
  public primaryAction?: any; /*ViewFabButton*/
  public footerControls?: any[];

  constructor(){
    super();
  }

  getHeaderTitle(): string{
    return this.headerTitle;
  }
  setHeaderTitle(title: string){
    this.headerTitle = title
  }
  addHeaderOptions(){} // adds Options menu to header
  addFooterControls(controls: any /*ViewButton[]*/){}
  addPrimaryAction(fab:any/*ViewFabButton*/){}


}
