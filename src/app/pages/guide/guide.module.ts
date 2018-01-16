//Common Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCommonModule, MatCardModule } from '@angular/material';
//Component Modules
import { GuideComponent } from './guide.component';
import { routing } from './guide.routing';

@NgModule({
  imports: [routing, MatCommonModule, MatCardModule],
  declarations: [
    GuideComponent
  ],
  providers: []
})
export class GuideModule {}
