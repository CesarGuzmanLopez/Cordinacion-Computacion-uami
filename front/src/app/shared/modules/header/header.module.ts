import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeadComponent } from './head/head.component';
import { MenuComponent } from './menu/menu.component';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [MenuComponent, HeadComponent],
  exports: [MenuComponent, HeadComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderModule {}
