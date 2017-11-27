import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './test.routing';
import { CoreComponents } from 'app/core/corecomponents.module';
import { TestPage } from './page/test-page.component';

@NgModule({
  imports: [
    CommonModule,
    CoreComponents,
    routing
  ],
  declarations: [TestPage]
})
export class TestPageModule { }
