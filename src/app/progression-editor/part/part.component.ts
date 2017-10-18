import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PianoOctaveComponent } from '../../shared/piano-octave/piano-octave.component';


// models
import { Chords, Chord, ChordSteps, Notes, Note, Scales, Scale, ScaleSteps } from '../../services';
import { Progression, ProgressionPart } from '../../services';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  @Input() part:ProgressionPart;
  @Output() change:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();
  @Output() delete:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();
  @ViewChild(PianoOctaveComponent) piano:PianoOctaveComponent;

  notes:Note[] = Array<Note>(12).fill(new Note(0)).map((n,i)=>new Note(i));
  chords:Chord[] = Array<Chord>(ChordSteps.length).fill(new Chord(0)).map((c,i)=> new Chord(i));
  scales:Scale[] = Array<Scale>(ChordSteps.length).fill(new Scale(0)).map((c,i)=> new Scale(i));

  constructor() {

  }

  ngOnInit() {
  }
  updatePiano():void {
    this.piano.redrawKeys(this.part.root.name);
  }
  emitPartChange():void {
    this.change.emit( this.part );
  }
  deletePart():void {
    this.delete.emit( this.part );
  }
}
