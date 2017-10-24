import { Injectable, EventEmitter } from '@angular/core';

import { Progression, ChordPattern } from './progression.models';

@Injectable()
export class GlobalSelectionsService   {

  private _selectedProgression:Progression;
  private _selectedProgressionEmitter:EventEmitter<Progression>;
  private _selectedChordPattern:ChordPattern;
  private _selectedChordPatternEmitter:EventEmitter<ChordPattern>;


  constructor() {
    this._selectedProgressionEmitter = new EventEmitter();
   }

   // progression selection
  selectProgression( p:Progression ):void{
    this._selectedProgression = p;
    this._selectedProgressionEmitter.emit( p );
  }
  selectPattern( p:ChordPattern ):void {
    this._selectedChordPattern = p;
    this._selectedChordPatternEmitter.emit( p );
  }
  get selectedProgression():Progression {
    return this._selectedProgression;
  }
  get selectedProgressionEmitter():EventEmitter<Progression> {
    return this._selectedProgressionEmitter;
  }
  get selectedChordPattern():ChordPattern {
    return this._selectedChordPattern;
  }
  get selectedChordPatternEmitter():EventEmitter<ChordPattern> {
    return this._selectedChordPatternEmitter;
  }

}
