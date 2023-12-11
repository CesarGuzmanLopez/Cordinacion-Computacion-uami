import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HeadComponentInfoUser } from './head.component';
describe('HeadComponent', () => {
  let component: HeadComponentInfoUser;
  let fixture: ComponentFixture<HeadComponentInfoUser>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeadComponentInfoUser],
      imports: [IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(HeadComponentInfoUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
