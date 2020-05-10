import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReserveOrderPageRoutingModule } from './reserve-order-routing.module';

import { ReserveOrderPage } from './reserve-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReserveOrderPageRoutingModule
  ],
  declarations: [ReserveOrderPage]
})
export class ReserveOrderPageModule {}
