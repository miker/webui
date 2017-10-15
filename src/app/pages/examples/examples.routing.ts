import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleCardsComponent } from './example-cards/example-cards.component';

export const routes: Routes = [{
  path: '',
  data: { title: 'Examples' },
  children: [{
    path: 'cards',
    data: { title: 'Cards', breadcrumb: 'Cards' },
    children: [{
      path: '',
      component: ExampleCardsComponent,
      data: { title: 'Cards', breadcrumb: 'Cards' },
    }]
  }]
}]
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
