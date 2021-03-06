import { Injectable, EventEmitter } from '@angular/core';

import { Progression, ProgressionPart } from './progression.models';
import { PatternPartComponent, PatternNoteDirective } from '../pattern-editor/pattern-part';
import { TickNote } from './tone.service';
import { Vector2 } from '../shared/models';

export class VisibilityEvent {
  static PIANO:string = "piano";
  static PATTERN_EDIT_MENUS:string = "pattern-edit-menus";
  static PIANO_SCALE:string = "piano-scale";
  static PIANO_CHORD:string = "piano-chord";
  static PART_CHORD:string = "part-chord";
  visible:boolean;
  what:string;
  constructor( v:boolean , w:string ){ this.visible =v; this.what = w;}
}
@Injectable()
export class GlobalSelectionsService   {

  private _selectedProgression:Progression;
  private _selectedProgressionEmitter:EventEmitter<Progression> = new EventEmitter();
  private _editorScrollX:number = 0;
  private _editorScrollY:number = 0;
  requestScrollUpdate:EventEmitter<Vector2> = new EventEmitter();

  private _busy:boolean = false;
  private _busyMessage:string = "Loading Samples...";
  private _busyEmitter:EventEmitter<boolean> = new EventEmitter();
  private _draggingNote:PatternNoteDirective;
  private _selectedNotes:PatternNoteDirective[] = Array();
  updatePartViewEmitter:EventEmitter<number> = new EventEmitter();

  private _selectedPartIndex:number;
  selectedPartIndexEmitter:EventEmitter<number> = new EventEmitter();

  private _pianoVisible:boolean = true;
  private _patternEditMenuVisible:boolean = true;
  private _pianoScaleVisible:boolean = false;
  private _pianoChordVisible:boolean = false;
  private _partChordVisible:boolean = false;
  visibilityEmitter:EventEmitter<VisibilityEvent> = new EventEmitter();


  constructor() {}

   // progression selection
  selectProgression( p:Progression ):void{
    this._selectedPartIndex = 0;
    this.selectedPartIndexEmitter.emit( this._selectedPartIndex );
    this._selectedProgression = p;
    this._selectedProgressionEmitter.emit( p );
  }
  get selectedProgression():Progression {
    return this._selectedProgression;
  }
  get selectedProgressionEmitter():EventEmitter<Progression> {
    return this._selectedProgressionEmitter;
  }
  set editorScrolLeft( n:number ){ this._editorScrollX = n; }
  get editorScrolLeft():number { return this._editorScrollX; }
  set editorScrolTop( n:number ){ this._editorScrollY = n; }
  get editorScrolTop():number { return this._editorScrollY; }

  
  set appBusy( b:boolean ) { this._busy = b; this._busyEmitter.emit( b ); }
  get appBusy():boolean { return this._busy; }
  set appBusyMessage( m:string ){ this._busyMessage = m; }
  get appBusyMessage():string { return this._busyMessage; }
  get appBusyEmitter():EventEmitter<boolean>{ return this._busyEmitter; }
  set draggingNote( dn:PatternNoteDirective ) { this._draggingNote = dn; }
  get draggingNote(){ return this._draggingNote; }
  set selectedPartIndex( p:number ) { 
    this._draggingNote = null;
    this.selectedNotes = Array();
    this._selectedPartIndex=p; 
    this.selectedPartIndexEmitter.emit(p); 
  }
  get selectedPartIndex() { return this._selectedPartIndex; }

  // visibility selections
  set pianoVisible( b:boolean ){ this._pianoVisible = b; this.visibilityEmitter.emit( new VisibilityEvent( b, VisibilityEvent.PIANO ) ) };
  get pianoVisible(){ return this._pianoVisible; }
  set patternEditMenuVisible( b:boolean ){ 
    this._patternEditMenuVisible = b; 
    this.visibilityEmitter.emit( new VisibilityEvent( b, VisibilityEvent.PATTERN_EDIT_MENUS ) ) 
  };
  get patternEditMenuVisible(){ return this._patternEditMenuVisible; }
  set pianoScaleVisible( v:boolean ) { this._pianoScaleVisible=v;
    this.visibilityEmitter.emit( new VisibilityEvent( v, VisibilityEvent.PIANO_SCALE ) );
  }
  get pianoScaleVisible(){ return this._pianoScaleVisible; }
  set pianoChordVisible( v:boolean ) { this._pianoChordVisible=v;
    this.visibilityEmitter.emit( new VisibilityEvent( v, VisibilityEvent.PIANO_CHORD ) );
  }
  get pianoChordVisible(){ return this._pianoChordVisible; }

  set partChordVisible( b:boolean ) { this._partChordVisible = b; 
    this.visibilityEmitter.emit( new VisibilityEvent( b, VisibilityEvent.PART_CHORD ) );
  }
  get partChordVisible(){ return this._partChordVisible; }

  set selectedNotes( n:PatternNoteDirective[] ){ 
    // de-select old ones
    if( this._selectedNotes.length>0 ){
      this._selectedNotes.forEach( tn=>{
        tn.tickNote.selected = false;
      });
    }
    // select new ones
    n.forEach( tn=>{
      tn.tickNote.selected = true; 
    })
    this._selectedNotes = n;
  }
  addSelectedNote( n:PatternNoteDirective ){
    this._selectedNotes.push( n );
    n.tickNote.selected = true;
  }
  removeSelectedNote( n:PatternNoteDirective ){
    let i:number = this._selectedNotes.findIndex( tn=>tn===n);
    if( i ){
      let a = this._selectedNotes.slice( 0, i );
      let b = this._selectedNotes.slice( i );
      b.shift().tickNote.selected = false;
      this._selectedNotes = a.concat(b);
    }
  }
  get selectedNotes( ) { return this._selectedNotes; }
}
