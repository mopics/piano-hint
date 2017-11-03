import { Component, OnInit, Input, Output, EventEmitter, ViewChild, NgZone, Directive, ElementRef, HostListener, Renderer, ChangeDetectionStrategy, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { List } from 'immutable';

// components
// import { SuiSelect } from 'ng2-semantic-ui';
import { PianoOctaveComponent } from '../../shared/piano-octave/piano-octave.component';
import { SelectComponent } from '../../shared/select/select.component';

// models & services
import { Chords, Chord, ChordSteps, Notes, Note, Scales, Scale, ScaleSteps, TickNote, GlobalSelectionsService, VisibilityEvent, NoteMenuItems, KeyboardService } from '../../services';
import { Progression, ProgressionPart, ToneService } from '../../services';
import { MenuItem, Rectangle } from '../../shared/models';
import { TickNoteChange } from './pattern-note.directive';

// components
import { PatternEditorComponent } from '../pattern-editor.component';

class MenuLabels {
  static SELECT_ROOT:string = "Select Root";
  static SELECT_CHORD:string = "Select Chord";
  static SELECT_SCALE:string = "Select Scale";
  static COPY_2_NEXT:string = "Copy part to next";
  static COPY_2_END:string = "Copy part to end";
  static DELETE_PART:string = "Delete part";
}

@Component({
  selector: 'app-pattern-part',
  templateUrl: './pattern-part.component.html',
  styleUrls: ['./pattern-part.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatternPartComponent implements OnInit {
  @Input() part:ProgressionPart;

  @Input() numOctaves:number = 4;
  @Input() startOctave:number = 1;

  @Output() change:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();
  @Output() delete:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();
  @Output() add2next:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();
  @Output() add2end:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();

  @ViewChild('selectionRect') selectionRect:ElementRef;
  @HostListener('window:keydown', ['$event']) keydown(e){
    if( e.code==="Delete" || e.code==="Backspace" ){
      if( this.gss.selectedNotes.length > 0 && this.gss.selectedPartIndex===this.part.index ){
        
          let toBeRemoved:TickNote[] = Array();
  
          this.activeNotes.forEach( an=>{
            this.gss.selectedNotes.forEach( sn=>{
              if( an===sn ){
                toBeRemoved.push( an );
              }
            });
          });
  
          this.removeActiveNotes( toBeRemoved );
          this.gss.selectedNotes = Array();
        }
    }
  };


  notes:Note[] = Array<Note>(12).fill(new Note(0)).map((n,i)=>new Note(i));
  chords:Chord[] = Array<Chord>(ChordSteps.length).fill(new Chord(0)).map((c,i)=> new Chord(i));
  scales:Scale[] = Array<Scale>(ScaleSteps.length).fill(new Scale(0)).map((c,i)=> new Scale(i));
  scalesFiltered:Scale[];
  keys:List<Note>;
  pattern:string[][];
  tickIndexes:Array<number>;
  selectedVelocity:number = 8;
  activeNotes:List<TickNote>;
  partActive:boolean = false;
  patternBackgroundClasses:Array<string> = new Array<string>( "pattern-background" );
  patternNotesClasses:Array<string> = new Array<string>( "pattern" );
  topMenuVisible:boolean = false;
  cellDown:any;

  static CELL_WIDTH:number = 16; // 16th note
  static CELL_HEIGHT:number = 13;
  static CELL_SNAP:number = 4; // => CELL_WIDTH / 4

  tonalityMenuItemClasses:string[] = Array( "music", "icon", "pattern-top-edit-icon" );
  tonalityMenuItems:MenuItem[] = new Array(
    { label:MenuLabels.SELECT_ROOT, icon:"", items:NoteMenuItems.notesAsMenuItems(), component:null, parent:null, active:false } as MenuItem,
    { label:MenuLabels.SELECT_CHORD, icon:"", items:NoteMenuItems.chordsAsMenuItems(), component:null, parent:null, active:false } as MenuItem,
    { label:MenuLabels.SELECT_SCALE, icon:"", items:NoteMenuItems.scalesAsMenuItems(), component:null, parent:null, active:false }as MenuItem,
  )
  copyMenuItemClasses:string[] = Array("copy", "icon", "pattern-top-edit-icon" );
  copyMenuItems:MenuItem[] = new Array( 
    { label:MenuLabels.COPY_2_NEXT, icon:"", items:Array(), component:null, parent:null, active:false }as MenuItem, 
    { label:MenuLabels.COPY_2_END, icon:"", items:Array(), component:null, parent:null, active:false }as MenuItem, 
    { label:MenuLabels.DELETE_PART, icon:"", items:Array(), component:null, parent:null, active:false }as MenuItem );

  constructor(private tone:ToneService, private ngZone:NgZone, private cd: ChangeDetectorRef, private gss:GlobalSelectionsService ) { }

  ngOnInit() {
    let octaves = Array( this.numOctaves ).fill(1).map( (x,i) =>i );
    this.keys = List( Note.getNotesFromRoot( Note.toFlat("C"), this.numOctaves, this.startOctave, true ).reverse() );
    this.tickIndexes = new Array( this.part.pattern.ticks.length ).fill(0);
    this.tickIndexes = this.tickIndexes.map( ( itm, i ) => i );
    this.filterScales();
    this.reColorCells();
    this.setActiveNotes();
    this.gss.selectedPartIndexEmitter.subscribe( p=>{
      //this.ngZone.run( ()=>{
        this.updatePartClasses();
        this.cd.markForCheck();
      //});
    } );
    this.gss.visibilityEmitter.subscribe( e=>{
      if( e.what===VisibilityEvent.PATTERN_EDIT_MENUS ) {
        this.topMenuVisible = e.visible;
        this.updatePartClasses();
        this.cd.markForCheck();
      }
    });
    this.topMenuVisible = this.gss.patternEditMenuVisible;

    this.updatePartClasses();
    this.setActiveTonalityItems();
  }
  setActiveTonalityItems():void {
    this.tonalityMenuItems[0].items.forEach( i=>{ 
      if(i.label===this.part.root.name){
        i.active = true;
      }
    });
    this.tonalityMenuItems[1].items.forEach( i=>{ 
      if(i.label===this.part.chord.name){
        i.active = true;
      }
    });
    this.tonalityMenuItems[2].items.forEach( i=>{ 
      if(i.label===this.part.scale.name){
        i.active = true;
      }
    });
  }
  /**
   * Pattern cells are bound to this.keys:Note[] 
   * Pattern active notes are bound to this.activeNotes && this.pattern.ticks: TickNote
   */
  setActiveNotes():void{
    let a = new Array<TickNote>();
    this.part.pattern.ticks.forEach( (ta,i)=>{
      ta.forEach( (tn)=>{
        tn.col = i;
        tn.width = this.setCellWidthFromNoteLength( tn.length );
        tn.posX = i*PatternPartComponent.CELL_WIDTH; if( tn.posX===0 ){ tn.posX = 2; tn.width-=2; }
        tn.posY = this.keys.findIndex( n=> {
          if( n.fullName===tn.name+tn.octave ){
            tn.fill = n.fill;
            return true;
          }
         } )*PatternPartComponent.CELL_HEIGHT+2;
        a.push( tn );
      });
    });
    this.activeNotes = List( a );
  }
  updateActiveNotes( changes:TickNoteChange[] ):void{
    changes.forEach( c=>{
      if( c.prevCol!==c.tickNote.col ){
        // remove from prev Col
        let i:number = this.part.pattern.ticks[c.prevCol].findIndex( n=>n === c.tickNote );
        this.part.pattern.ticks[c.prevCol].splice( i, 1 );
        this.activeNotes = this.activeNotes.remove( this.activeNotes.findIndex( n=> n === c.tickNote ) );
        // add to new col
        this.part.pattern.ticks[c.tickNote.col].push( c.tickNote );
        this.activeNotes = this.activeNotes.push( c.tickNote );
      }
    })
  }
  removeActiveNotes( notes:TickNote[] ):void {
    notes.forEach( tn=> {
      let i:number = this.part.pattern.ticks[tn.col].findIndex( n=>n === tn );
      this.part.pattern.ticks[tn.col].splice( i, 1 );
      this.activeNotes = this.activeNotes.remove( this.activeNotes.findIndex( n=> n === tn ) );
    });
    this.cd.markForCheck();
  }
  recolorActiveNotes():void{
    this.part.pattern.ticks.forEach( (ta,i)=>{
      ta.forEach( (tn)=>{
        this.keys.findIndex( n=> {
          if( n.fullName===tn.name+tn.octave ){
            tn.fill = n.fill;
            return true;
          }
         } );
      });
    });
  }
  setCellWidthFromNoteLength( l:number ):number {
    // l = num 16n

    return l*PatternPartComponent.CELL_WIDTH-2;
  }
  getNoteLengthFromWidth( w:number ):number {
    return w/PatternPartComponent.CELL_WIDTH;
  }
  reColorCells():void{
    // set scale colors and non-tone colors
    let allScaleNotes:Note[] = this.part.scale.midiNotes.slice( 0, 9 );
    this.keys.forEach( n=>{
      if( allScaleNotes.find( sn=>sn.name===n.name ) ){
        n.fill = Note.scaleFill;
      } else{
        n.fill = Note.nonToneFill;
      }
    });
    
    
    // set third highlicht color
    this.keys.filter( n=>n.name===this.part.chord.midiNotes[1].name ).forEach( n=> n.fill=Note.thirdFill );
    
    // set root hightlight color
    this.keys.filter( n=>n.name===this.part.chord.midiNotes[0].name ).forEach( n=> n.fill=Note.rootFill );
    
    // set third highlicht color
    this.keys.filter( n=>n.name===this.part.chord.midiNotes[1].name ).forEach( n=> n.fill=Note.thirdFill );
    
    // set fifth highlicht color
    this.keys.filter( n=>n.name===this.part.chord.midiNotes[2].name ).forEach( n=> n.fill=Note.fifthFill );
    
    // set seventh highlicht color
    if( this.part.chord.index>=Chords.Dom7 ) {
      this.keys.filter( n=>n.name===this.part.chord.midiNotes[3].name ).forEach( n=> n.fill=Note.seventhFill );
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
     this.tonalityMenuItems[2].items = Array();
     this.scalesFiltered.forEach( s=>{
        let a:boolean = false;
        if( s.name===this.part.scale.name ){ a = true; }
        this.tonalityMenuItems[2].items.push({
          label:s.name, icon:"", items:Array(), component:null, parent:null, active:a
        });
     });
  }
  onRootChange( n:Note ):void {
    this.part.root = n;
    this.part.chord.midiNotes = Note.createMidiNotes( this.part.root, this.part.chord.steps );
    this.part.scale.midiNotes = Note.createMidiNotes( this.part.root, this.part.scale.steps );
    this.tone.playNote( n, 3 );
    this.reColorCells();
    this.recolorActiveNotes();
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
      this.recolorActiveNotes();
      this.emitPartChange();
    }
  }
  onScaleChange(scale:Scale, triggeredBySelect:boolean=true ):void {
    this.part.scale = scale;
    this.part.scale.midiNotes = Note.createMidiNotes( this.part.root, this.part.scale.steps );
    
    if( triggeredBySelect ) { this.tone.playScale( scale ); }

    this.reColorCells();
    this.recolorActiveNotes();
    this.emitPartChange();
  }
  // pattern listeners
  onPatternBackgroundMousedown():void {
    if( this.part.index!==this.gss.selectedPartIndex ) {
      this.selectPart(); return;
    }
  }
  onPatternBackgroundSelection( rect:Rectangle ):void {
    let cellH:number = 11;
    let a:TickNote[] = Array();
    rect.x -= this.part.pattern.posX;
    rect.y -= 150;
    this.activeNotes.forEach( tn=>{
      if( tn.posX+tn.width > rect.x && tn.posY+cellH > rect.y && tn.posX < rect.x+rect.width && tn.posY < rect.y+rect.height ){
        a.push( tn );
      } 
    });
    this.gss.selectedNotes = a;
    this.cd.markForCheck();
  }
  deselectSelectedNotes():void{
    // deselect active selection
    if( this.gss.selectedNotes.length>0 ){
      this.gss.selectedNotes.forEach( tn=>{
        tn.selected = false;
      });
      this.gss.selectedNotes = Array();
    }
    this.cd.markForCheck();
  }
  onCellMouseDown( event ){
    if( this.part.index!==this.gss.selectedPartIndex ) {
      this.selectPart();
    }
    this.cellDown = event.target;
  }
  onCellMouseUp( event, note:Note, index:number ){
    
    if( this.cellDown!==event.target ){
      return;
    }
    this.deselectSelectedNotes();

    this.tone.triggerAttackRelease( note.fullName, "16n", this.selectedVelocity/10, this.tone.context.currentTime );
    this.setNoteActive( note, index, event.target.offsetLeft, event.target.offsetTop );

    // this.emitPartChange();
  }
  setNoteActive( n:Note, index:number, posX:number, posY:number ):void{
    let tn:TickNote = new TickNote();
    tn.name = n.name;
    tn.octave = n.octave;
    tn.length = 1;
    tn.width = this.setCellWidthFromNoteLength( tn.length );
    tn.velocity = this.selectedVelocity;
    tn.fill = n.fill;
    tn.col = index;
    tn.posX = posX;
    tn.posY = posY;
    this.part.pattern.ticks[index].push( tn );
    this.activeNotes = this.activeNotes.push( tn );
    this.cd.markForCheck();
  }
  setNoteNotActive( note:TickNote, index:number ):void{
    this.deselectSelectedNotes();
    this.selectPart();
    let i:number = this.part.pattern.ticks[index].findIndex( n=>n === note );
    this.part.pattern.ticks[index].splice( i, 1 );
    this.activeNotes = this.activeNotes.remove( this.activeNotes.findIndex( n=> n === note ) );
    this.cd.markForCheck();
  }
  noteIsActive( note:Note, index:number ):number{
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
  getNoteByPos( y:number ):Note{
    let noteIndex:number = Math.floor( y/PatternPartComponent.CELL_HEIGHT );
    return this.keys.get(noteIndex);
  }


  emitPartChange():void {
    this.change.emit( this.part );
  }
  onCopyMenuSelect( item:MenuItem ):void {
    if( item.label===MenuLabels.DELETE_PART) {
      return this.delete.emit( this.part );
    }
    else if( item.label===MenuLabels.COPY_2_END) {
      return this.add2end.emit( this.part.clone() );
    }
    else if( item.label===MenuLabels.COPY_2_NEXT ) {
      return this.add2next.emit( this.part.clone() );
    }
  }
  onTonalityMenuSelect( item:MenuItem ):void {
    if( item.parent.label===MenuLabels.SELECT_ROOT ){
      this.onRootChange( new Note(Notes[item.label]) );
    }
    else if( item.parent.label===MenuLabels.SELECT_CHORD ){
      this.onChordChange( new Chord( Chords[item.label]));
    }
    else if( item.parent.label===MenuLabels.SELECT_SCALE ){
      this.onScaleChange( new Scale( Scales[item.label]));
    }
    this.cd.markForCheck();
  }
  addTickCollumn():void {
    this.part.pattern.ticks.push( new Array<TickNote>() );
    this.tickIndexes.push( this.tickIndexes.length );
    this.emitPartChange();
  }
  removeTickCollumn():void {
    this.part.pattern.ticks.pop( );
    this.tickIndexes.pop();
    this.emitPartChange();
  }
  selectPart():void {
    if( !this.partActive ){
      this.gss.selectedPartIndex = this.part.index;
    }
  }

  // patternBackgroundClasses updaters
  updatePartClasses(){
    if( this.part.index===this.gss.selectedPartIndex ){
      this.setPartActive();
    } else {
      this.setPartNonActive();
    }
    this.setPartTop();
  }
  setPartActive(){
    this.partActive = true;
    this.patternBackgroundClasses = new Array<string>( "pattern-background", "part-selected" );
  }
  setPartNonActive() {
    this.partActive = false;
    this.patternBackgroundClasses = new Array<string>( "pattern-background" );
  }
  setPartTop() {
    if( this.topMenuVisible ){
      this.patternBackgroundClasses.push( "top-menu-visible");
      this.patternNotesClasses = Array( "pattern", "top-menu-visible" );
    } else {
      this.patternBackgroundClasses.push( "top-menu-hidden");
      this.patternNotesClasses = Array( "pattern", "top-menu-hidden" );
    }
  }
  

}
