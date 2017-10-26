import { Component, OnInit, Input, Output, EventEmitter, ViewChild, NgZone } from '@angular/core';

// components
// import { SuiSelect } from 'ng2-semantic-ui';
import { PianoOctaveComponent } from '../../shared/piano-octave/piano-octave.component';
import { SelectComponent } from '../../shared/select/select.component';

// models & services
import { Chords, Chord, ChordSteps, Notes, Note, Scales, Scale, ScaleSteps, TickNote } from '../../services';
import { Progression, ProgressionPart, ToneService, ChordPattern } from '../../services';

@Component({
  selector: 'app-pattern-part',
  templateUrl: './pattern-part.component.html',
  styleUrls: ['./pattern-part.component.scss']
})
export class PatternPartComponent implements OnInit {
  @Input() part:ProgressionPart;
  @Input() chordPatterns:ChordPattern[];

  @Input() numOctaves:number = 4;
  @Input() startOctave:number = 2;

  @Output() change:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();
  @Output() delete:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();
  @ViewChild('scaleSelect') scaleSelect:SelectComponent;

  notes:Note[] = Array<Note>(12).fill(new Note(0)).map((n,i)=>new Note(i));
  chords:Chord[] = Array<Chord>(ChordSteps.length).fill(new Chord(0)).map((c,i)=> new Chord(i));
  scales:Scale[] = Array<Scale>(ScaleSteps.length).fill(new Scale(0)).map((c,i)=> new Scale(i));
  scalesFiltered:Scale[];
  keys:Note[];
  pattern:string[][];

  constructor(private tone:ToneService, private ngZone:NgZone ) { }

  ngOnInit() {
    let octaves = Array( this.numOctaves ).fill(1).map( (x,i) =>i );
    this.keys = Note.getNotesFromRoot( Note.toFlat("C"), this.numOctaves, this.startOctave, true );
    this.keys.reverse();
    this.reColorCells();
  }
  reColorCells():void{

    this.filterScales();

    this.keys.forEach( n=>{
      n.fill = Note.nonToneFill;
    });
    
    let scaleLength:number = this.part.scale.steps.filter( i=>i===1).length;
    let sixthIndex:number = 5;
    let fourfthIndex:number = 3;
    if( scaleLength===8 ){
      sixthIndex = 6;
      fourfthIndex = 4;
      // set eight hightlight color
      this.keys.filter( n=>n.name===this.part.scale.midiNotes[2].name ).forEach( n=> n.fill=Note.scaleFill ); // Altered and SymetricalDiminished have 8 notes!!
      // set third highlicht color
      this.keys.filter( n=>n.name===this.part.chord.midiNotes[1].name ).forEach( n=> n.fill=Note.thirdFill );
    }
    // set root hightlight color
    this.keys.filter( n=>n.name===this.part.chord.midiNotes[0].name ).forEach( n=> n.fill=Note.rootFill );
    // set second hightlight color
    this.keys.filter( n=>n.name===this.part.scale.midiNotes[1].name ).forEach( n=> n.fill=Note.scaleFill );
    // set third highlicht color
    this.keys.filter( n=>n.name===this.part.chord.midiNotes[1].name ).forEach( n=> n.fill=Note.thirdFill );
    // set fourth highlicht color
    this.keys.filter( n=>n.name===this.part.scale.midiNotes[fourfthIndex].name ).forEach( n=> n.fill=Note.scaleFill );
    // set fifth highlicht color
    this.keys.filter( n=>n.name===this.part.chord.midiNotes[2].name ).forEach( n=> n.fill=Note.fifthFill );
    // set sixth highlicht color
    this.keys.filter( n=>n.name===this.part.scale.midiNotes[sixthIndex].name ).forEach( n=> n.fill=Note.scaleFill );
    // set seventh highlicht color
    if( this.part.chord.index>=Chords.Dom7 ) {
      this.keys.filter( n=>n.name===this.part.chord.midiNotes[3].name ).forEach( n=> n.fill=Note.seventhFill );
    }
    else {
      this.keys.filter( n=>n.name===this.part.scale.midiNotes[6].name ).forEach( n=> n.fill=Note.scaleFill );
    }
    
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
    this.tone.playNote( n, 3 );
    this.reColorCells();
    this.emitPartChange();
  }
  onChordChange( chord:Chord ):void {
    this.part.chord = chord;
    this.part.chord.midiNotes = Note.createMidiNotes( this.part.root, this.part.chord.steps );
    
    this.tone.playChord( chord, 3, '4n' );
    // if current scale is not in scalesFiltered: set first scale in scalesFiltered as current scale 
    this.filterScales();
    if( !this.scalesFiltered.find( s=> s.name===this.part.scale.name ) ){
      this.onScaleChange(this.scalesFiltered[0], false );
    } else {
      this.reColorCells();
      this.emitPartChange();
    }
  }
  onScaleChange(scale:Scale, triggeredBySelect:boolean=true ):void {
    this.part.scale = scale;
    this.part.scale.midiNotes = Note.createMidiNotes( this.part.root, this.part.scale.steps );
    
    if( triggeredBySelect ) { this.tone.playScale( scale ); }

    this.reColorCells();
    this.emitPartChange();
  }
  // pattern listeners
  onCellAttack( note:TickNote, index:number ){
    if( this.keys.find( n=>n.name===note.name).fill===Note.nonToneFill){return;}
    this.tone.triggerAttack( note.fullName, .8 );
    this.emitPartChange();
  }
  onCellRelease( note:TickNote, index:number ){
    if( this.noteIsActive( note, index )===1 ){
      this.setNoteNotActive( note, index );
    }
    else {
      this.setNoteActive( note, index );
    }
    this.tone.triggerRelease( note.fullName );
  }
  setNoteActive( note:TickNote, index:number ):void{
    note.length = "8n";
    this.part.pattern.ticks[index].push( note );
  }
  setNoteNotActive( note:TickNote, index:number ):void{
    let i:number = this.part.pattern.ticks[index].findIndex( n=>n.name+n.octave===note.fullName );
    this.part.pattern.ticks[index].splice( i, 1 );
  }
  noteIsActive( note:TickNote, index:number ):number{
    if( this.part.pattern.ticks[index].find( (n) => {
      if( n.name+n.octave===note.fullName ){ return true;}
    } ) ) {
      return 1;
    }
    if( this.keys.find( n=> n.name === note.name ).fill===Note.nonToneFill ){
      return .1;
    }
    return .25;
  }


  emitPartChange():void {
    this.change.emit( this.part );
  }
  deletePart():void {
    this.delete.emit( this.part );
  }
  

}
