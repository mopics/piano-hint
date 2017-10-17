import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoOctaveComponent } from './piano-octave.component';

describe('PianoOctaveComponent', () => {
  let component: PianoOctaveComponent;
  let fixture: ComponentFixture<PianoOctaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PianoOctaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PianoOctaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
