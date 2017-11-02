import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

// models & services
import { Note, Notes, Chord, Chords, Scale, Progression, ProgressionPart, ToneService, TickNote, GlobalSelectionsService, VisibilityEvent } from '../../services';

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
  styleUrls: ['./piano-octave.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PianoOctaveComponent implements OnInit {

  @Input() root:string = "C";
  @Input() startOctave:number = 2;
  @Input() numOctaves:number = 1;
  @Input() keyHeight:number = 400;
  @Input() keyWidth:number = 80;
  @Input() rotation:number = 0;
  @Input() reverseKeys:boolean = false;
  @Input() equalWidth:boolean = false;
  @Input() hintWidth:number = 70;
  @Output() keyClicked:EventEmitter<Note>=new EventEmitter();

  octaves:number[];
  keys:Note[];
  whiteKeys:Note[];
  blackKeys:Note[];
  allKeys:Object;
  allKeysA:Note[];

  blackBgFill:string = Note.blackFill;
  blackKeyWidth:number;
  blackKeyHeight:number;
  scaleHints:Hint[];
  viewBox:string;
  transform:string;
  octaveWidth:number;
  progression:Progression;
  //visibility flags
  scaleVisible:boolean = true;
  chordVisible:boolean = true;

  @ViewChild('piano') piano: ElementRef;

  constructor( private ts:ToneService, private _ngZone: NgZone, private cd: ChangeDetectorRef, private gss:GlobalSelectionsService ) {
  }

  ngOnInit() {
    this.octaveWidth = this.keyWidth*7;
    this.blackKeyWidth = this.keyWidth*.5;
    this.blackKeyHeight = this.keyHeight*.72;
    if( this.equalWidth ){
      this.blackKeyWidth = this.keyWidth;
      this.blackKeyHeight = this.keyHeight*.8;
    }
    this.gss.visibilityEmitter.subscribe( e=>{
      if( e.what===VisibilityEvent.PIANO_SCALE ){
        this.scaleVisible = e.visible;
        this.cd.markForCheck();
      } else if( e.what===VisibilityEvent.PIANO_CHORD ){
        this.chordVisible = e.visible;
        if( !e.visible ){
          this.updateKeysDefaultColor();
        } else {
          this.updateKeys( this.gss.selectedProgression.parts[this.gss.selectedPartIndex] );
        }
        this.cd.markForCheck();
      }
    });
    this.scaleVisible = this.gss.pianoScaleVisible;
    this.chordVisible = this.gss.pianoChordVisible;
  }
  
  highlightTickNotes( notes:TickNote[] ) {
    notes.forEach( en=> {
      let n:Note = this.allKeys[en.name+en.octave];
      if( n ){
        n.highlight = Note.HI;
      }
      setTimeout( ()=>{
          this._ngZone.run(() => {
            n.highlight = Note.NO;
            this.cd.markForCheck();
          });
        }, this.ts.noteLength2Ms( en.length )-50 );
      });
      this.cd.markForCheck();
  }
  updateKeysDefaultColor():void {
    // set all keys back to normal
    this.allKeysA.forEach( n=>{
      if( n.whiteKey )
        n.fill = Note.whiteFill;
      else 
        n.fill = "#332";//Note.blackFill;
    });
  }
  updateKeys( part:ProgressionPart ):void {
    if( !this.chordVisible ){ 
      this.createHints( part );
      this.cd.markForCheck();
      return; 
    }

    let chordNotes:Note[] = part.chord.midiNotes;
    // get keys
    let rootKeys:Note[] = this.allKeysA.filter( n=> n.name===chordNotes[0].name );
    let thirdKeys:Note[] = this.allKeysA.filter( n=> n.name===chordNotes[1].name );
    let fifthKeys:Note[] = this.allKeysA.filter( n=> n.name===chordNotes[2].name );
    let seventhKeys:Note[];
    if( part.chord.index >= Chords.Dom7 ){
      seventhKeys = this.allKeysA.filter( n=> n.name===chordNotes[3].name );
    }
    this.updateKeysDefaultColor();
    // color keys
    rootKeys.forEach( n=>{
      n.fill = Note.rootFill;
    });
    thirdKeys.forEach( n=>{
      n.fill = Note.thirdFill;
    });
    fifthKeys.forEach( n=>{
      n.fill = Note.fifthFill;
    });
    if( seventhKeys ){
      seventhKeys.forEach( n=>{
        n.fill = Note.seventhFill;
      });
    }
    
    this.createHints( part );

    this.cd.markForCheck();
  }
  createKeys( part:ProgressionPart ):void {
    this.root = "C";//part.root.name;
    if( this.rotation===90 && this.equalWidth ){
      this.viewBox = `0 0 ${this.keyHeight} ${this.keyWidth*12*this.numOctaves+this.keyWidth}`;
      this.transform = `translate(${this.keyHeight}) rotate(90 0 0)`;
    }
    else {
      this.viewBox = `0 0 ${this.keyWidth*7*this.numOctaves+this.keyWidth} ${this.keyHeight}`;
      this.transform = `rotate(0 0 0)`;
    }
    
    this.octaves = Array( this.numOctaves ).fill(1).map( (x,i) =>i );
    this.keys = Note.getNotesFromRoot( Note.toFlat(this.root), this.numOctaves, this.startOctave, true );

    if( this.reverseKeys ){ this.keys.reverse(); }

    this.whiteKeys = new Array<Note>();
    this.blackKeys = new Array<Note>();
    this.allKeys = new Object();

    var xWhite= this.keys[0].whiteKey ? 0 : -this.keyWidth*.25;
    var xBlack = this.keys[0].whiteKey ? this.keyWidth*.75 : this.keyWidth*.5;
    var pk;
    this.keys.forEach( ( k, i ) => {
        if( k.whiteKey ){ 
          if( this.equalWidth )
            k.xPos = i*this.keyWidth;
          else
            k.xPos = xWhite;
          xWhite += this.keyWidth;
          if( pk ){ if(pk.whiteKey) {xBlack += this.keyWidth;} }
          
          this.whiteKeys.push(k);
          pk = k;
        }
        else { 
          if( this.equalWidth )
            k.xPos = i*this.keyWidth;
          else
            k.xPos = xBlack;
          this.blackKeys.push(k);
          xBlack += this.keyWidth;
          pk = k;
        }
        this.allKeys[ k.fullName ] = k;
    });

    this.allKeysA = this.whiteKeys.concat(this.blackKeys );

    if( this.gss.pianoChordVisible ){
      this.updateKeys( part );
    }
    else {
      this.updateKeysDefaultColor();
      this.createHints( part );
    }
    

    

  }
  createHints( part:ProgressionPart ):void {
    // create scale hints as dots
    this.scaleHints = new Array<Hint>();
    this.keys.forEach( (k,i)=>{
      if( part.scale.midiNotes.find( n=>n.name===k.name) ){
        let h:Hint = new Hint();
        h.rx = this.keyWidth*.18; h.ry = h.rx;
        h.note = k;
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

  totalHeight():number {
    return this.keyHeight;
  }
  totalWidth():number {
    return this.keyWidth*7 * this.numOctaves;
  }

}
