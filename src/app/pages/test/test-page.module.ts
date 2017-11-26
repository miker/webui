import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './test.routing';

import { TestPage } from './page/test-page.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [TestPage]
})
export class TestPageModule { }
