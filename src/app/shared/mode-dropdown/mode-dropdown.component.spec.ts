import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeDropdownComponent } from './mode-dropdown.component';

describe('ModeDropdownComponent', () => {
  let component: ModeDropdownComponent;
  let fixture: ComponentFixture<ModeDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
