import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';

import { Note, Notes } from '../../services';

@Component({
  selector: 'app-piano-octave',
  templateUrl: './piano-octave.component.html',
  styleUrls: ['./piano-octave.component.css']
})
export class PianoOctaveComponent implements OnInit {

  @Input() root:string;
  @Input() numOctaves:number;
  @Input() keyHeight:number;
  @Input() keyWidth:number;

  octaves:number[];
  keys:Note[];
  whiteKeys:Note[];
  blackKeys:Note[];
  viewBox:string;
  octaveWidth:number;

  @ViewChild('piano') piano: ElementRef;

  constructor() {
    
  }

  ngOnInit() {
    this.redraw(this.root);
    this.octaveWidth = this.keyWidth*7;
  }
  redraw(r:string):void {
    this.root = r;
    this.viewBox = `0 0 ${this.keyWidth*7*this.numOctaves+this.keyWidth} ${this.keyHeight}`;
    this.octaves = Array( this.numOctaves ).fill(1).map( (x,i) =>i );
    this.keys = Note.getNotesFromRoot( Note.toFlat(this.root), this.numOctaves, true );

    this.whiteKeys = new Array<Note>();
    this.blackKeys = new Array<Note>();
    var xWhite= this.keys[0].whiteKey ? 0 : -this.keyWidth*.25;
    var xBlack = this.keys[0].whiteKey ? this.keyWidth*.75 : this.keyWidth*.5;
    var pk;
    this.keys.forEach( ( k ) => {
        if( k.whiteKey ){ 
          k.xPos = xWhite
          xWhite += this.keyWidth;
          if( pk ){ if(pk.whiteKey) {xBlack += this.keyWidth;} }
          this.whiteKeys.push(k);
          pk = k;
        }
        else { 
          k.xPos = xBlack;
          this.blackKeys.push(k);
          xBlack += this.keyWidth;
          pk = k;
        }
    });
    
    
  }

}
