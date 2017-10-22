import { Component, OnInit, Input, Output, EventEmitter, ViewChild, NgZone } from '@angular/core';

// components
// import { SuiSelect } from 'ng2-semantic-ui';
import { PianoOctaveComponent } from '../../shared/piano-octave/piano-octave.component';

// models & services
import { Chords, Chord, ChordSteps, Notes, Note, Scales, Scale, ScaleSteps } from '../../services';
import { Progression, ProgressionPart, ToneService, ChordPattern } from '../../services';


@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  @Input() part:ProgressionPart;
  @Input() chordPatterns:ChordPattern[];
  @Output() change:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();
  @Output() delete:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();
  @Output() keyClicked:EventEmitter<Note> = new EventEmitter();
  @ViewChild(PianoOctaveComponent) piano:PianoOctaveComponent;
  // @ViewChild('scaleSelect') scaleSelect:SuiSelect;

  notes:Note[] = Array<Note>(12).fill(new Note(0)).map((n,i)=>new Note(i));
  chords:Chord[] = Array<Chord>(ChordSteps.length).fill(new Chord(0)).map((c,i)=> new Chord(i));
  scales:Scale[] = Array<Scale>(ScaleSteps.length).fill(new Scale(0)).map((c,i)=> new Scale(i));
  scalesFiltered:Scale[];

  constructor(private tone:ToneService) {
  }

  ngOnInit() {
    this.piano.root = this.part.root.name;
    this.piano.startOctave = 3;
    this.piano.numOctaves = 2;
    this.piano.keyHeight = 200;
    this.piano.keyWidth = 80;
    this.filterScales();
    this.piano.redrawKeys( this.part );
    this.piano.keyClicked.subscribe( n=> {
      this.onRootChange(n);
      this.keyClicked.emit(n)
     } );
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
  onRootChange( n:Note ):void {
    this.part.root = n;
    this.part.chord.midiNotes = Note.createMidiNotes( this.part.root, this.part.chord.steps );
    this.part.scale.midiNotes = Note.createMidiNotes( this.part.root, this.part.scale.steps );
    this.piano.redrawKeys(this.part);
    this.tone.playNote( n, 3 );
    this.emitPartChange();
  }
  onChordChange( chord:Chord ):void {
    this.part.chord = chord;
    this.part.chord.midiNotes = Note.createMidiNotes( this.part.root, this.part.chord.steps );
    this.tone.playChord( chord, 3, '4n' );
    this.filterScales();
    // if current scale is not in scalesFiltered: set first scale in scalesFiltered as current scale 
    if( !this.scalesFiltered.find( s=> s.name===this.part.scale.name ) ){
      this.onScaleChange(this.scalesFiltered[0], false );
    } else {
      this.piano.redrawKeys(this.part);
      this.emitPartChange();
    }
  }
  onScaleChange(scale:Scale, play:boolean=true ):void {
    this.part.scale = scale;
    this.part.scale.midiNotes = Note.createMidiNotes( this.part.root, this.part.scale.steps );
    if( play ) { this.tone.playScale( scale ); }
    this.piano.redrawKeys(this.part);
    this.emitPartChange();
  }
  onMeasuresChange(m:any):void{
    this.part.measures = m.label;
    this.emitPartChange();
  }
  onChordPatternChange(cp:ChordPattern):void{
    this.part.chordPattern = cp.index;
    this.emitPartChange();
  }
  emitPartChange():void {
    this.change.emit( this.part );
  }
  deletePart():void {
    this.delete.emit( this.part );
  }
}
