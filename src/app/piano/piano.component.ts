import { Component, OnInit, ViewChild, NgZone } from '@angular/core';

// components
import { PianoOctaveComponent } from '../shared/piano-octave/piano-octave.component';

// models
import { ProgressionPart, Progression } from '../services';

// service
import { ProgressionsService, GlobalSelectionsService, ToneService } from '../services';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.css']
})
export class PianoComponent implements OnInit {

  progression:Progression;
  currPartIndex:number = 0;
  bpm:number = 120;

  @ViewChild(PianoOctaveComponent) piano:PianoOctaveComponent;

  constructor( 
    private progService:ProgressionsService,
    private globalSelections:GlobalSelectionsService,
    private ts:ToneService,
    private ngZone:NgZone
  ) { 
    
  }

  ngOnInit() {
    this.progression = this.globalSelections.selectedProgression;
    if( this.progression ){ this.initPiano(); }
    else {
      this.globalSelections.selectedProgressionEmitter.subscribe( p => {
        this.progression = p;
        this.initPiano();
       } );
    }
  }
  initPiano():void {
    this.piano.root = "C";
    this.piano.startOctave = 2;
    this.piano.numOctaves = 4;
    this.piano.keyHeight = 300;
    this.piano.keyWidth = 80;
    this.piano.setProgression( this.progression );
    this.piano.redrawKeys( this.progression.parts[0] );
    this.piano.keyClicked.subscribe( n=> this.ts.playNote(n,n.octave) );

    this.ts.sequenceEmitter.subscribe( event=> {
      if( event.partIndex > -1 ){ // change part
        this.ngZone.run( ()=> {
          this.currPartIndex = event.partIndex;
        });
      }
    });
    this.bpm = this.ts.getBPM();
  }
  playProgression():void{
    if( this.progression ){
      this.ts.playProgression( this.progression );
    }
  }
  pauseProgression():void{
    this.ts.pauseProgression();
  }
  stopProgression():void {
    this.ts.stopProgression();
  }
  onBpmSliderChange( value:number ):void {
    this.ts.setBPM( value );
  }

}
