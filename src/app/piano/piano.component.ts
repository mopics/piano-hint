import { Component, OnInit, ViewChild } from '@angular/core';

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

  @ViewChild(PianoOctaveComponent) piano:PianoOctaveComponent;

  constructor( 
    private progService:ProgressionsService,
    private globalSelections:GlobalSelectionsService,
    private tone:ToneService
  ) { }

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
    this.piano.numOctaves = 3;
    this.piano.keyHeight = 300;
    this.piano.keyWidth = 80;
    this.piano.redrawKeys( this.progression.parts[0] );
    this.piano.keyClicked.subscribe( n=> this.tone.playNote(n,n.octave) );
  }
  playProgression():void{
    if( this.progression ){
      this.tone.playProgression( this.progression );
    }
  }
  pauseProgression():void{
    this.tone.pauseProgression();
  }
  stopProgression():void {
    this.tone.stopProgression();
  }

}
