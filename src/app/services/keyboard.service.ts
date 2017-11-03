import { Injectable, HostListener, EventEmitter } from '@angular/core';

@Injectable()
export class KeyboardService {

  delete:EventEmitter<boolean> = new EventEmitter();

  @HostListener('window:keydown', ['$event']) keydown(e){
    if( e.code==="Delete" || e.code==="Backspace" ){
      this.delete.emit( true );
    }
  };
  @HostListener('window:keyup', ['$event']) keyup(e){
    
  };
  constructor() { }

}
