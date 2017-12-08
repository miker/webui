import { NgModule, ModuleWithProviders } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';

import { PageComponent } from 'app/core/components/page/page.component';
import { ViewComponent } from 'app/core/components/view/view.component';
import { CardComponent } from 'app/core/components/card/card.component';
import { ViewControlComponent } from 'app/core/components/viewcontrol/viewcontrol.component';
import { ViewControllerComponent } from 'app/core/components/viewcontroller/viewcontroller.component';
import { CoreContainer } from 'app/core/components/corecontainer/corecontainer.component';
import { ViewButtonComponent } from './viewbutton/viewbutton.component';

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
    CardComponent,
    ViewControlComponent,
    ViewControllerComponent,
    CoreContainer,
    ViewButtonComponent
  ],
  exports: [ // Modules and Components here
    CommonModule,
    MaterialModule,
    CoreContainer,
    PageComponent,
    ViewComponent,
    ViewControlComponent,
    ViewButtonComponent,
    ViewControllerComponent,
    CardComponent
  ],
  entryComponents:[
    ViewComponent,
    ViewControlComponent,
    ViewButtonComponent,
    ViewControllerComponent,
    CardComponent
  ]
})
export class CoreComponents {}
