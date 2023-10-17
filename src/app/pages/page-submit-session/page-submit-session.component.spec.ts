import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSubmitSessionComponent } from './page-submit-session.component';

describe('PageSubmitSessionComponent', () => {
  let component: PageSubmitSessionComponent;
  let fixture: ComponentFixture<PageSubmitSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageSubmitSessionComponent]
    });
    fixture = TestBed.createComponent(PageSubmitSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
