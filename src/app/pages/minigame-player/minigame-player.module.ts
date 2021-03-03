import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinigamePlayerPageRoutingModule } from './minigame-player-routing.module';

import { MinigamePlayerPage } from './minigame-player.page';

import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MinigamePlayerPageRoutingModule
  ],
  declarations: [MinigamePlayerPage]
})
export class MinigamePlayerPageModule {}
