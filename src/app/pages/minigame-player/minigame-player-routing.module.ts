import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinigamePlayerPage } from './minigame-player.page';

const routes: Routes = [
  {
    path: '',
    component: MinigamePlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinigamePlayerPageRoutingModule {}
