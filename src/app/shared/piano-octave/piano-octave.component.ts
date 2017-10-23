import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, NgZone } from '@angular/core';

// models & services
import { Note, Notes, Chord, Chords, Scale, Progression, ProgressionPart, ToneService } from '../../services';

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
  @Input() startOctave:number = 2;
  @Input() numOctaves:number = 1;
  @Input() keyHeight:number = 400;
  @Input() keyWidth:number = 80;
  @Input() hintWidth:number = 70;
  @Output() keyClicked:EventEmitter<Note>=new EventEmitter();

  octaves:number[];
  keys:Note[];
  whiteKeys:Note[];
  blackKeys:Note[];
  allKeys:Object;
  blackBgFill:string = Note.blackFill;
  scaleHints:Hint[];
  viewBox:string;
  octaveWidth:number;
  progression:Progression;

  @ViewChild('piano') piano: ElementRef;

  constructor( private ts:ToneService, private _ngZone: NgZone ) {
  }

  ngOnInit() {
    this.octaveWidth = this.keyWidth*7;
  }
  setProgression( p:Progression ):void {
    this.progression = p;
    if( this.progression ){
      this.ts.sequenceEmitter.subscribe( event=> {
        if( event.partIndex > -1 ){ // change part
          this.redrawKeys( this.progression.parts[ event.partIndex ] );
        }
        this._ngZone.run(() => {
          event.notes.forEach( en=> {
            let n:Note = this.allKeys[en.fullName];
            if( n ){
              n.highlight = Note.HI;
            }
            setTimeout( ()=>{
              this._ngZone.run(() => {
                n.highlight = Note.NO;
            });
            }, 1800 ); // TODO: use actual event.note.length to turn off key again
          });
       });
        
      });
    }
  }
  redrawKeys( part:ProgressionPart ):void {
    this.root = "C";//part.root.name;
    this.viewBox = `0 0 ${this.keyWidth*7*this.numOctaves+this.keyWidth} ${this.keyHeight}`;
    this.octaves = Array( this.numOctaves ).fill(1).map( (x,i) =>i );
    this.keys = Note.getNotesFromRoot( Note.toFlat(this.root), this.numOctaves, this.startOctave, true );

    this.whiteKeys = new Array<Note>();
    this.blackKeys = new Array<Note>();
    this.allKeys = new Object();

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
        this.allKeys[ k.fullName ] = k;
    });
    // set highlicht color's
    this.keys.filter( n=>n.name===part.chord.midiNotes[0].name ).forEach( n=> n.fill=Note.rootFill );
    //this.keys.filter( n=>n.name===part.scale.midiNotes[1].name ).forEach( n=> n.fill=Note.scaleFill );
    // set third highlicht color
    this.keys.filter( n=>n.name===part.chord.midiNotes[1].name ).forEach( n=> n.fill=Note.thirdFill );
    // set fourth highlicht color
    //this.keys.filter( n=>n.name===part.scale.midiNotes[3].name ).forEach( n=> n.fill=Note.scaleFill );
    // set fifth highlicht color
    this.keys.filter( n=>n.name===part.chord.midiNotes[2].name ).forEach( n=> n.fill=Note.fifthFill );
    // set sixth highlicht color
    //this.keys.filter( n=>n.name===part.scale.midiNotes[5].name ).forEach( n=> n.fill=Note.scaleFill );
    if( part.chord.index >= Chords.Dom7 ){
      // set seventh highlicht color
      this.keys.filter( n=>n.name===part.chord.midiNotes[3].name ).forEach( n=> n.fill=Note.seventhFill );
    }
    /*else {
      this.keys.filter( n=>n.name===part.scale.midiNotes[6].name ).forEach( n=> n.fill=Note.scaleFill );
    }*/
    // create scale hints as dots
    this.scaleHints = new Array<Hint>();
    this.keys.forEach( (k,i)=>{
      if( part.scale.midiNotes.find( n=>n.name===k.name) ){
        let h:Hint = new Hint();
        h.rx = this.keyWidth*.18; h.ry = h.rx;
        if( k.whiteKey ){
          h.x = k.xPos + this.keyWidth/2;
          h.y = this.keyHeight*.85;
        } else {
          h.x = k.xPos + this.keyWidth/4;
          h.y = this.keyHeight*.6;
        }
        this.scaleHints.push(h);
      }
    });

  }

  // key click events
  onKeyClick( note:Note ):void {
    this.keyClicked.emit( note );
  }

}
