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
    this.piano.root = this.part.root.name;
    this.piano.numOctaves = 2;
    this.piano.keyHeight = 200;
    this.piano.keyWidth = 80;
    this.piano.redrawHints( this.part );
  }
  onRootChange():void {
    this.piano.redrawKeys(this.part.root.name);
    this.emitPartChange();
  }
  onChordChange():void{
    this.part.chord.midiNotes = Note.createMidiNotes( this.part.root, this.part.chord.steps );
    this.piano.redrawHints(this.part);
    this.emitPartChange();
  }
  onScaleChange():void{
    this.part.scale.midiNotes = Note.createMidiNotes( this.part.root, this.part.scale.steps );
    this.piano.redrawHints(this.part);
    this.emitPartChange();
  }
  emitPartChange():void {
    this.change.emit( this.part );
  }
  deletePart():void {
    this.delete.emit( this.part );
  }
}
