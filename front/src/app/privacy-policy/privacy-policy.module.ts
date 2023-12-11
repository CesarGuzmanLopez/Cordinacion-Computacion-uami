import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModules } from '../shared/shared-modules.module';
import { PrivacyPolicyPageRoutingModule } from './privacy-policy-routing.module';
import { PrivacyPolicyPage } from './privacy-policy.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyPolicyPageRoutingModule,
    SharedModules,
  ],
  declarations: [PrivacyPolicyPage],
})
export class PrivacyPolicyPageModule {}
