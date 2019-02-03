import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTabComponent } from './dialog-tab.component';

describe('DialogTabComponent', () => {
  let component: DialogTabComponent;
  let fixture: ComponentFixture<DialogTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
