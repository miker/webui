//Common Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCommonModule, MatCardModule, MatListModule, MatSliderModule } from '@angular/material';
import { EntityModule } from '../common/entity/entity.module';
//Component Modules
import { ShellComponent } from './shell.component';
import { routing } from './shell.routing';

@NgModule({
  imports: [CommonModule, FormsModule, EntityModule, routing, MatCommonModule, MatCardModule, MatListModule, MatSliderModule],
  declarations: [
    ShellComponent
  ],
  providers: []
})
export class ShellModule {}
