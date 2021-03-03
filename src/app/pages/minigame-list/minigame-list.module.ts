import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinigameListPageRoutingModule } from './minigame-list-routing.module';

import { MinigameListPage } from './minigame-list.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MinigameListPageRoutingModule
  ],
  declarations: [MinigameListPage]
})
export class MinigameListPageModule {}
