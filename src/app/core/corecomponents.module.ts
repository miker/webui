import { NgModule, ModuleWithProviders } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { PageComponent } from 'app/core/components/page/page.component';
import { ViewComponent } from './components/view/view.component';
import { CardComponent } from './components/card/card.component';

/*
 *
 * This is the Core Module. By importing this module you'll 
 * ensure your page will have the right dependencies in place
 * to make use of the CoreService (event bus) and any helper
 * services that get added later on.
 *
 * */

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    PageComponent,
    ViewComponent,
    CardComponent
  ],
  exports: [ // Modules and Components here
    CommonModule,
    MaterialModule,
    PageComponent,
    ViewComponent,
    CardComponent
  ]
})
export class CoreComponents {}
