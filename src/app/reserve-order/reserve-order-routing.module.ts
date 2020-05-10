import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReserveOrderPage } from './reserve-order.page';

const routes: Routes = [
  {
    path: '',
    component: ReserveOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReserveOrderPageRoutingModule {}
