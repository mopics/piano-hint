import { Injectable, EventEmitter } from '@angular/core';

import { Progression } from './progression.models';
import { PatternPartComponent, PatternNoteDirective } from '../pattern-editor/pattern-part/pattern-part.component';

@Injectable()
export class GlobalSelectionsService   {

  private _selectedProgression:Progression;
  private _selectedProgressionEmitter:EventEmitter<Progression> = new EventEmitter();
  private _editorScrollX:number = 0;
  private _busy:boolean = false;
  private _busyMessage:string = "Loading Samples...";
  private _busyEmitter:EventEmitter<boolean> = new EventEmitter();
  private _draggingNote:PatternNoteDirective;


  constructor() {}

   // progression selection
  selectProgression( p:Progression ):void{
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
  set appBusy( b:boolean ) { this._busy = b; this._busyEmitter.emit( b ); }
  get appBusy():boolean { return this._busy; }
  set appBusyMessage( m:string ){ this._busyMessage = m; }
  get appBusyMessage():string { return this._busyMessage; }
  get appBusyEmitter():EventEmitter<boolean>{ return this._busyEmitter; }
  set draggingNote( dn:PatternNoteDirective ) { this._draggingNote = dn; }
  get draggingNote(){ return this._draggingNote; }
}
