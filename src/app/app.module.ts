import 'style-loader!tixif-ngx-busy/build/style/busy.css';
import 'hammerjs';

import {ApplicationRef, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ConfirmDialog} from './pages/common/confirm-dialog/confirm-dialog.component';








import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { routing, appRoutingProviders } from './app.routing';

/* App component */
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/* Core Module */
import { CoreModule } from './core/core.module';

import { MaterialModule } from '@angular/material';

@NgModule({
declarations: [
AppComponent,
PageNotFoundComponent
],
imports: [
BrowserModule,
CoreModule,
FormsModule,
HttpModule,
ChartsModule,
routing
],
providers: [
appRoutingProviders
],
bootstrap: [AppComponent]
})
export class AppModule { }



/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from '../environments/environment';

// App is our top level component
import {App} from './app.component';
import {routing} from './app.routing';
import {AppState, InternalStateType} from './app.service';
import {GlobalState} from './global.state';
import {PagesModule} from './pages/pages.module';
import {NgaModule} from './theme/nga.module';


// Application wide providers
const APP_PROVIDERS = [ AppState, GlobalState ];

export type StoreType = {
  state : InternalStateType,
  restoreInputValues : () => void,
  disposeOldHosts : () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    ConfirmDialog
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    PagesModule,
    routing,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ],
  entryComponents: [
    ConfirmDialog,
  ],
})

export class AppModule {
}
