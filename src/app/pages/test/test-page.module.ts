import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './test.routing';
import { CoreComponents } from 'app/core/components/corecomponents.module';
//import { CardComponent } from 'app/core/components/card/card.component';
import { TestPage } from './page/test-page.component';

@NgModule({
  imports: [
    CommonModule,
    CoreComponents,
    routing
  ],
  declarations: [
    TestPage
  ],
  entryComponents:[
    //CardComponent
  ],
})
export class TestPageModule { }
