import { Component, OnInit, ViewChild, NgZone, Output, EventEmitter } from '@angular/core';

// models
import { Chords, Notes, Note } from '../services';
import { Progression, ProgressionPart } from '../services';
// service
import { ProgressionsService, ChordPatternsService, ChordPattern, GlobalSelectionsService, ToneService } from '../services';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { ConfirmModal } from '../shared/modals/modal-confirm/modal-confirm.component';
// components
import { PianoOctaveComponent } from '../shared/piano-octave/piano-octave.component';

@Component({
  selector: 'app-pattern-editor',
  templateUrl: './pattern-editor.component.html',
  styleUrls: ['./pattern-editor.component.scss']
})
export class PatternEditorComponent implements OnInit {

  @Output() partselected:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();

  @ViewChild(PianoOctaveComponent) piano:PianoOctaveComponent;

  progression:Progression;
  currPartIndex:number = 0;
  chordPatterns:ChordPattern[];
  pianoInitiated:boolean = false;

  constructor(
    private progService:ProgressionsService,
    private cp:ChordPatternsService,
    private globalSelections:GlobalSelectionsService,
    private modalService:SuiModalService,
    private ts:ToneService,
    private ngZone:NgZone
  ) {  }

  ngOnInit() {
    this.progression = this.globalSelections.selectedProgression;
    this.initPiano();

    this.globalSelections.selectedProgressionEmitter.subscribe( p => {
      this.progression = p;
      this.initPiano();
    } );

    this.loadChordPatterns();
  }
  private loadChordPatterns():void{
		this.cp.getPatterns().then( patterns =>{
			 this.chordPatterns = patterns;
		 } );
  }
  initPiano():void {
    if( this.pianoInitiated ){ return; }
    this.piano.root = "C";
    this.piano.startOctave = 2;
    this.piano.numOctaves = 4;
    this.piano.keyHeight = 154;
    this.piano.keyWidth = 40;
    this.piano.rotation = 90;
    this.piano.reverseKeys = true;
    this.piano.equalWidth = true;
    this.piano.updatePatternNotes = false;
    this.piano.setProgression( this.progression );
    this.piano.createKeys( this.progression.parts[0] );
    this.piano.keyClicked.subscribe( n=> this.ts.playNote(n,n.octave) );

    this.ts.sequenceEmitter.subscribe( event=> {
      if( event.partIndex > -1 ){ // change part
        this.ngZone.run( ()=> {
          this.currPartIndex = event.partIndex;
        });
      }
    });
    this.pianoInitiated = true;
  }

  handlePartChange( part:ProgressionPart ):void {
    this.progression.parts[ part.index ] = part;
    this.piano.updateKeys( part );
    this.partselected.emit( part );
    // TODO send change to service
  }
  // adding part
  addPart():void {
    this.progression.parts.push( this.progression.duplicatePrevPart() );
    this.progression.reIndexParts();
    // TODO send add to service
  }
  // deleting part
  handleDeleteRequest( part:ProgressionPart ):void {
    // show modal
    this.modalService.open( new ConfirmModal( "Delete Part", 
      "Are you sure you want to delete this part. This action can not be undone.",
      ModalSize.Mini ))
      .onApprove( ()=> {
        this.removePart( part );
      })
      /*.onDeny( ()=>{

      });*/
  }
  handleKeyClicked( n:Note ):void{
    this.ts.playNote( n, 3, "8n" );
  }
  removePart( part:ProgressionPart ):void {
    let pi:number = this.progression.parts.findIndex( p =>  part.index==p.index );
    this.progression.parts.splice( pi, 1 );
    // reindex
    pi = 0;
    this.progression.parts.map( p => { p.index = pi; pi++; return p; });
  }

}
