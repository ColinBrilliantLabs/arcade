import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'minigame-list',
    pathMatch: 'full'
  },
  {
    path: 'minigame-list',
    loadChildren: () => import('./pages/minigame-list/minigame-list.module').then( m => m.MinigameListPageModule)
  },
  {
    path: 'minigame-player',
    loadChildren: () => import('./pages/minigame-player/minigame-player.module').then( m => m.MinigamePlayerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
