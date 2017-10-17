import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionEditorComponent } from './progression-editor.component';

describe('ProgressionEditorComponent', () => {
  let component: ProgressionEditorComponent;
  let fixture: ComponentFixture<ProgressionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
