import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CompletePageComponent } from './complete-page/complete-page.component';
@NgModule({
  declarations: [CompletePageComponent],
  imports: [CommonModule, IonicModule],
  exports: [CompletePageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SpinnersModule {}
