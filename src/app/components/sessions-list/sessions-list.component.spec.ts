import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsListComponent } from './sessions-list.component';

describe('SessionsListComponent', () => {
  let component: SessionsListComponent;
  let fixture: ComponentFixture<SessionsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionsListComponent]
    });
    fixture = TestBed.createComponent(SessionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
