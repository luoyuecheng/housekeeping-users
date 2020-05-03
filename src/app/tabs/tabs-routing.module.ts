import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ExploreModalComponentModule } from '../explore-modal/explore-modal.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'service',
        loadChildren: () => import('../projects/projects.module').then(m => m.ProjectsPageModule)
      },
      {
        path: 'optimization',
        loadChildren: () => import('../message/message.module').then(m => m.MessagePageModule)
      },
      {
        path: 'message',
        loadChildren: () => import('../message/message.module').then(m => m.MessagePageModule)
      },
      {
        path: 'aboutMe',
        loadChildren: () => import('../about-me/about-me.module').then(m => m.AboutMePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('../explore-modal/explore-modal.module').then(m => m.ExploreModalComponentModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
