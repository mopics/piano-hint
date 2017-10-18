import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';

// models
import { Note, Notes, Chord, Scale, ProgressionPart } from '../../services';

export class Hint {
  x:number = 0;
  y:number = 0;
  rx:number = 10;
  ry:number = 10;
  note:Note;

  constructor(){}

}

@Component({
  selector: 'app-piano-octave',
  templateUrl: './piano-octave.component.html',
  styleUrls: ['./piano-octave.component.css']
})
export class PianoOctaveComponent implements OnInit {

  @Input() root:string = "C";
  @Input() chord:string;
  @Input() scale:string;

  @Input() numOctaves:number = 1;
  @Input() keyHeight:number = 400;
  @Input() keyWidth:number = 80;
  @Input() hintWidth:number = 70;

  octaves:number[];
  keys:Note[];
  whiteKeys:Note[];
  blackKeys:Note[];
  chordHints:Hint[];
  scaleHints:Hint[];
  viewBox:string;
  octaveWidth:number;

  @ViewChild('piano') piano: ElementRef;

  constructor() {
    
  }

  ngOnInit() {
    this.octaveWidth = this.keyWidth*7;
  }
  redrawKeys(r:string):void {
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
  redrawHints( part:ProgressionPart ):void {
    this.redrawKeys(part.root.name);

    this.chordHints = new Array<Hint>(3).fill( new Hint() ).map( ( hint, i )=>{
      let nHint:Hint = new Hint();
      let midiNote:Note = part.chord.midiNotes[i];
      let key:Note;
      let yPos:number;
      let xPos:number;
      if( midiNote.whiteKey ) {
        key = this.whiteKeys.find( n=> n.name===midiNote.name ); 
        yPos = this.keyHeight*.85;
        xPos = key.xPos + this.keyWidth/2;
      }
      else {
        key = this.blackKeys.find(n=>n.name===midiNote.name); 
        yPos = this.keyHeight*.6;
        xPos = key.xPos + this.keyWidth/2;
      }
      // TODO: set x and y using white&black keys already present
      nHint.x = xPos;
      nHint.y = yPos;
      nHint.rx = nHint.ry = this.keyWidth/5;

      return nHint;
    });
    this.scaleHints = new Array<Hint>();
    // TODO
  }

  // key click events
  onKeyClick( name:string ):void {
    alert( `TODO:play ${name} with webkit.midi?` );
  }

}
