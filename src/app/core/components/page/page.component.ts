import { Component } from '@angular/core';
import { Page, PageOptions } from 'app/core/classes/page';
import { CardComponent } from 'app/core/components/card/card.component';
import { CoreService, CoreEvent } from 'app/core/services/core.service';

// This makes the metadata available globally 
// Deal-Breaker: Angular injects the component's 
// directory path forcing relative paths
export const PageComponentMetadata = {
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
}

@Component(PageComponentMetadata)
export class PageComponent extends Page{

  public name: string = "PageComponent";

  constructor(protected core: CoreService) { 
    super();
  }
}
