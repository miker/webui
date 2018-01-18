import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgUploaderModule} from 'ngx-uploader';
import { MatCommonModule, MatTableModule, MatCardModule, MatOptionModule, MatSelectModule } from '@angular/material';

import {EntityModule} from '../common/entity/entity.module';
import {NetworkService} from '../../services';

import {VlanFormComponent} from './vlans/vlan-form/';
import {VlanListComponent} from './vlans/vlan-list/';
import {LaggFormComponent} from './laggs/lagg-form/';
import {LaggListComponent} from './laggs/lagg-list/';
import {StaticRouteFormComponent} from './staticroutes/staticroute-form/';
import {StaticRouteListComponent} from './staticroutes/staticroute-list/';
import {InterfacesFormComponent} from './interfaces/interfaces-form/';
import {InterfacesListComponent} from './interfaces/interfaces-list/';
import {ConfigurationComponent} from './configuration/';
import {IPMIComponent} from './ipmi'
import {routing} from './network.routing';

@NgModule({
  imports : [
    EntityModule, CommonModule, FormsModule, MatCardModule, MatOptionModule,
    ReactiveFormsModule, NgUploaderModule, routing, MatCommonModule, MatSelectModule
  ],
  declarations : [
    VlanFormComponent,
    VlanListComponent,
    LaggFormComponent,
    LaggListComponent,
    StaticRouteFormComponent,
    StaticRouteListComponent,
    InterfacesListComponent,
    InterfacesFormComponent,
    ConfigurationComponent,
    IPMIComponent,
  ],
  providers : [NetworkService]
})
export class NetworkModule {
}
