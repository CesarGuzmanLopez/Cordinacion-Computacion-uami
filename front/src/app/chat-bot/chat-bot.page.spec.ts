import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChatBotPage } from './chat-bot.page';
describe('ChatBotPage', () => {
  let component: ChatBotPage;
  let fixture: ComponentFixture<ChatBotPage>;
  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ChatBotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
