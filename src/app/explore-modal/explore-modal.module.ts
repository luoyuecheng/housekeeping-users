import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExploreModalComponent } from './explore-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      { path: 'modal', component: ExploreModalComponent },
    ])
  ],
  declarations: [ExploreModalComponent],
  exports: [ExploreModalComponent]
})
export class ExploreModalComponentModule {}