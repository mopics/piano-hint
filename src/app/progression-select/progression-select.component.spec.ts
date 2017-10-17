import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionSelectComponent } from './progression-select.component';

describe('ProgressionSelectComponent', () => {
  let component: ProgressionSelectComponent;
  let fixture: ComponentFixture<ProgressionSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressionSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
