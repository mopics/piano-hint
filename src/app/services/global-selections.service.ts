import { Injectable, EventEmitter } from '@angular/core';

import { Progression } from './progression.models';

@Injectable()
export class GlobalSelectionsService   {

  private _selectedProgression:Progression;
  private _selectedProgressionEmitter:EventEmitter<Progression> = new EventEmitter();

  constructor() { }

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

}
