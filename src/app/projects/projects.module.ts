import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectsPage } from './projects.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ProjectsPageRoutingModule } from './projects-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ProjectsPageRoutingModule
  ],
  declarations: [ProjectsPage]
})
export class ProjectsPageModule {}
