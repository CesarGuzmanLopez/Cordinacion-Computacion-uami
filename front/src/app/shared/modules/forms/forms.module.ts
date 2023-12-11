import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ProgressBarComponent],
  exports: [ProgressBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppFormsModule {}
