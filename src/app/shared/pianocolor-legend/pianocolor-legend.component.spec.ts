import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PianocolorLegendComponent } from './pianocolor-legend.component';

describe('PianocolorLegendComponent', () => {
  let component: PianocolorLegendComponent;
  let fixture: ComponentFixture<PianocolorLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PianocolorLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PianocolorLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
