import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModules } from '../shared/shared-modules.module';
import { ChatBotPageRoutingModule } from './chat-bot-routing.module';
import { ChatBotPage } from './chat-bot.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatBotPageRoutingModule,
    SharedModules,
  ],
  declarations: [ChatBotPage],
})
export class ChatBotPageModule {}
