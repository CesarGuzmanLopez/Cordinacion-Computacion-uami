import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModules } from '../shared/shared-modules.module';
import { MenuPageRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    SharedModules,
  ],
  declarations: [MenuPage],
})
export class MenuPageModule {}
