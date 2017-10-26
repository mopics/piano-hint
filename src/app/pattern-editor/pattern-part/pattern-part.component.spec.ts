import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternPartComponent } from './pattern-part.component';

describe('PatternPartComponent', () => {
  let component: PatternPartComponent;
  let fixture: ComponentFixture<PatternPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
