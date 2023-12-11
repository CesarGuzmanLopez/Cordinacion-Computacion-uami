import { TestBed } from '@angular/core/testing';
import { SessionMenuService } from './session.service';
describe('SessionService', () => {
  let service: SessionMenuService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionMenuService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
