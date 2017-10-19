import { Component, OnInit, Input, Output, EventEmitter, ViewChild, NgZone } from '@angular/core';

// components
// import { SuiSelect } from 'ng2-semantic-ui';
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
  // @ViewChild('scaleSelect') scaleSelect:SuiSelect;

  notes:Note[] = Array<Note>(12).fill(new Note(0)).map((n,i)=>new Note(i));
  chords:Chord[] = Array<Chord>(ChordSteps.length).fill(new Chord(0)).map((c,i)=> new Chord(i));
  scales:Scale[] = Array<Scale>(ChordSteps.length).fill(new Scale(0)).map((c,i)=> new Scale(i));
  scalesFiltered:Scale[];

  constructor(private _ngZone: NgZone) {
  }

  ngOnInit() {
    this.piano.root = this.part.root.name;
    this.piano.numOctaves = 2;
    this.piano.keyHeight = 200;
    this.piano.keyWidth = 80;
    this.filterScales();
    this.piano.redrawKeys( this.part );
  }
  filterScales():void{
    this.scalesFiltered = this.scales.filter( s=> {
      let notesMatch:boolean = true;
      this.part.chord.steps.forEach( ( n,i )=>{ 
        if( n===1 && s.steps[i]===0 ){
          notesMatch = false;
        }
      });
      return notesMatch;
     });
     console.log('foo');
  }
  onRootChange():void {
    this.part.chord.midiNotes = Note.createMidiNotes( this.part.root, this.part.chord.steps );
    this.part.scale.midiNotes = Note.createMidiNotes( this.part.root, this.part.scale.steps );
    this.piano.redrawKeys(this.part);
    this.emitPartChange();
  }
  onChordChange():void {
    this.part.chord.midiNotes = Note.createMidiNotes( this.part.root, this.part.chord.steps );
    this.filterScales();
    // if current scale is not in scalesFiltered: set first scale in scalesFiltered as current scale 
    if( !this.scalesFiltered.find( s=> s.name===this.part.scale.name ) ){
      this.part.scale = this.scalesFiltered[0];
      this.onScaleChange();
    } else {
      this.piano.redrawKeys(this.part);
      this.emitPartChange();
    }
  }
  onScaleChange():void {
    this.part.scale.midiNotes = Note.createMidiNotes( this.part.root, this.part.scale.steps );
    this.piano.redrawKeys(this.part);
    this.emitPartChange();
  }
  emitPartChange():void {
    this.change.emit( this.part );
  }
  deletePart():void {
    this.delete.emit( this.part );
  }
}
