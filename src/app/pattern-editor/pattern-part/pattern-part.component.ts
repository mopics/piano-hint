import { Component, OnInit, Input, Output, EventEmitter, ViewChild, NgZone, Directive, ElementRef, HostListener, Renderer } from '@angular/core';

// components
// import { SuiSelect } from 'ng2-semantic-ui';
import { PianoOctaveComponent } from '../../shared/piano-octave/piano-octave.component';
import { SelectComponent } from '../../shared/select/select.component';

// models & services
import { Chords, Chord, ChordSteps, Notes, Note, Scales, Scale, ScaleSteps, TickNote } from '../../services';
import { Progression, ProgressionPart, ToneService, ChordPattern } from '../../services';
import { MenuItem } from '../../shared/models';
// components
import { PatternEditorComponent } from '../pattern-editor.component';

@Directive({ selector: '[pattern-note]' })
export class PatternNoteDirective {

  @Input() parent:PatternPartComponent; // fsdf
  @Input() tickNote:TickNote; //khkh

  editorTop:number = 120; // should correspond with $editorTop in scss-file
  menuHeight:number = 26; // sgeg

  resizeMode:boolean = false;
  dragging:boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer) {}

  @HostListener('mouseenter', ['$event']) mouseenter(e){
    this.mousemove(e);
  };
  @HostListener('mousemove', ['$event']) mousemove(e){
    if( this.dragging ) { 
      let scrollX:number = this.parent.parent.editorScrolLeft;
      let nw:number = e.pageX + scrollX - this.tickNote.posX - this.parent.part.pattern.posX;
      let cw:number = PatternPartComponent.CELL_WIDTH;
      this.renderer.setElementStyle( this.el.nativeElement, "width", nw+"px");
      this.tickNote.length = Math.round((cw/nw)*16)+"n";
      this.tickNote.width = nw;
    }
    // if hovering over end of note 8px from right;
    if( e.layerX > e.target.clientWidth-7 ){ // 
      this.renderer.setElementStyle( this.el.nativeElement, "cursor", "ew-resize");
      this.resizeMode = true;
    }
    else {
      this.renderer.setElementStyle( this.el.nativeElement, "cursor", "move");
      this.resizeMode = false;
    }
  };
  @HostListener('mouseleave', ['$event']) mouseleave(e){
    // this.dragging = false;
  };
  @HostListener('mousedown', ['$event']) mousedown(e) {
    if( this.resizeMode ){
      this.dragging = true;
      this.parent.parent.draggingNote = this;
      return;
    }
    this.parent.setNoteNotActive( this.tickNote, this.tickNote.col );
  };
  @HostListener('mouseup', ['$event']) mouseup(e) {
    this.dragging = false;
    this.parent.parent.draggingNote = null;
    window.document.body.style.cursor = "default";
  };
}

@Component({
  selector: 'app-pattern-part',
  templateUrl: './pattern-part.component.html',
  styleUrls: ['./pattern-part.component.scss']
})
export class PatternPartComponent implements OnInit {
  @Input() parent:PatternEditorComponent;
  @Input() part:ProgressionPart;
  @Input() chordPatterns:ChordPattern[];

  @Input() numOctaves:number = 4;
  @Input() startOctave:number = 2;

  @Output() change:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();
  @Output() delete:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();
  @Output() add2next:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();
  @Output() add2end:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();


  notes:Note[] = Array<Note>(12).fill(new Note(0)).map((n,i)=>new Note(i));
  chords:Chord[] = Array<Chord>(ChordSteps.length).fill(new Chord(0)).map((c,i)=> new Chord(i));
  scales:Scale[] = Array<Scale>(ScaleSteps.length).fill(new Scale(0)).map((c,i)=> new Scale(i));
  scalesFiltered:Scale[];
  keys:Note[];
  pattern:string[][];
  selectedVelocity:number = 8;
  activeNotes:TickNote[];

  static CELL_WIDTH:number = 32; // 16th note
  static CELL_HEIGHT:number = 13;
  static COPY_2_NEXT:string = "Copy part to next";
  static COPY_2_END:string = "Copy part to end";
  static DELETE_PART:string = "Delete part";

  sideMenuItems:MenuItem[] = new Array( 
    { label:PatternPartComponent.COPY_2_NEXT, icon:"" }, 
    { label:PatternPartComponent.COPY_2_END, icon:"" }, 
    { label:PatternPartComponent.DELETE_PART, icon:"" } );

  constructor(private tone:ToneService, private ngZone:NgZone ) { }

  ngOnInit() {
    let octaves = Array( this.numOctaves ).fill(1).map( (x,i) =>i );
    this.keys = Note.getNotesFromRoot( Note.toFlat("C"), this.numOctaves, this.startOctave, true );
    this.keys.reverse();
    this.reColorCells();
    this.setActiveNotes();
  }
  setActiveNotes():void{
    this.activeNotes = new Array<TickNote>();
    this.part.pattern.ticks.forEach( (ta,i)=>{
      ta.forEach( (tn)=>{
        tn.col = i;
        tn.width = this.setCellWidthFromNoteLength( tn.length )
        tn.posX = i*PatternPartComponent.CELL_WIDTH; if( tn.posX===0 ){ tn.posX = 2; }
        tn.posY = this.keys.findIndex( n=> {
          if( n.fullName===tn.name+tn.octave ){
            tn.fill = n.fill;
            return true;
          }
         } )*PatternPartComponent.CELL_HEIGHT+2;
        this.activeNotes.push( tn );
      });
    });
  }
  setCellWidthFromNoteLength( l:string ):number {
    let n:number = parseInt( l.replace("n","") );
    return PatternPartComponent.CELL_WIDTH / (n/16) -2;
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
  onCellAttack( event, note:TickNote, index:number ){
    this.tone.triggerAttackRelease( note.fullName, note.length, this.selectedVelocity/10 );
    if( this.noteIsActive( note, index )===1 ){
      this.setNoteNotActive( note, index );
    }
    else {
      this.setNoteActive( note, index, event.target.offsetLeft, event.target.offsetTop );
    }
    // this.emitPartChange();
  }
  onCellRelease( note:TickNote, index:number ){
     this.tone.triggerRelease( note.fullName );
  }
  setNoteActive( n:TickNote, index:number, posX:number, posY:number ):void{
    n.length = "16n";
    n.velocity = this.selectedVelocity;
    this.part.pattern.ticks[index].push( n );
    n.col = index;
    n.posX = posX;
    n.posY = posY;
    this.activeNotes.push( n );
  }
  setNoteNotActive( note:TickNote, index:number ):void{
    let i:number = this.part.pattern.ticks[index].findIndex( n=>n.name+n.octave===note.fullName );
    this.part.pattern.ticks[index].splice( i, 1 );
    this.activeNotes.splice( this.activeNotes.findIndex( n=> (n.name+n.octave===note.name+note.octave&&n.col===note.col) ), 1 );
    console.log('foo');
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
  onSideMenuSelect( item:MenuItem ):void {
    if( item.label===PatternPartComponent.DELETE_PART) {
      return this.delete.emit( this.part );
    }
    if( item.label===PatternPartComponent.COPY_2_END) {
      return this.add2end.emit( this.part.clone() );
    }
    if( item.label===PatternPartComponent.COPY_2_NEXT ) {
      return this.add2next.emit( this.part.clone() );
    }
  }
  addTickCollumn():void {
   this.part.pattern.ticks.push( new Array<TickNote>() );
   this.emitPartChange();
  }
  removeTickCollumn():void {
    this.part.pattern.ticks.splice( this.part.pattern.ticks.length-1);
    this.emitPartChange();
  }
  

}
