import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientareaLayoutComponent } from './clientarea-layout.component';

describe('ClientareaLayoutComponent', () => {
  let component: ClientareaLayoutComponent;
  let fixture: ComponentFixture<ClientareaLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientareaLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientareaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
