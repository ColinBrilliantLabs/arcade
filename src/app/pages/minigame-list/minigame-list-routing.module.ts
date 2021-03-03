import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinigameListPage } from './minigame-list.page';

const routes: Routes = [
  {
    path: '',
    component: MinigameListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinigameListPageRoutingModule {}
