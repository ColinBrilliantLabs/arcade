import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavbarComponent } from './navbar/navbar.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [NavbarComponent, ModalLoginComponent],
  declarations: [NavbarComponent, ModalLoginComponent]
})
export class ComponentsModule {}
