import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HeadComponentInfoUser } from './head/head.component';
@NgModule({
  declarations: [HeadComponentInfoUser],
  imports: [CommonModule],
  exports: [HeadComponentInfoUser],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AspiranteInfoModule {}
