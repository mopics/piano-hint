import { Component, OnInit, ViewChild, NgZone, Output, EventEmitter, HostListener, Input } from '@angular/core';

// models
import { Chords, Notes, Note } from '../services';
import { Progression, ProgressionPart } from '../services';
// service
import { ProgressionsService, ChordPatternsService, ChordPattern, GlobalSelectionsService, ToneService } from '../services';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { ConfirmModal } from '../shared/modals/modal-confirm/modal-confirm.component';
// components
import { PianoOctaveComponent } from '../shared/piano-octave/piano-octave.component';
import { PatternPartComponent, PatternNoteDirective } from './pattern-part/pattern-part.component';
import { PianoComponent } from '../piano/piano.component';

@Component({
  selector: 'app-pattern-editor',
  templateUrl: './pattern-editor.component.html',
  styleUrls: ['./pattern-editor.component.scss']
})
export class PatternEditorComponent implements OnInit {

  @Output() partselected:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();
  @Input() parent:PianoComponent;

  @ViewChild(PianoOctaveComponent) piano:PianoOctaveComponent;

  @HostListener('document:mousemove', ['$event']) documenmousemove(e){ 
    if( !this.draggingNote ){ return; }
    window.document.body.style.cursor = "ew-resize";
    this.draggingNote.mousemove( e );
  };
  @HostListener( 'document:mouseup', ['$event'] ) documentmouseup(e){
    if( this.draggingNote ) {
      window.document.body.style.cursor = "default";
      this.draggingNote.mouseup( e );
    }
  };

  progression:Progression;
  currPartIndex:number = 0;
  chordPatterns:ChordPattern[];
  pianoInitiated:boolean = false;
  draggingNote:PatternNoteDirective;

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
    this.reIndex();

    this.globalSelections.selectedProgressionEmitter.subscribe( p => {
      this.progression = p;
      this.initPiano();
      this.reIndex();
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
    this.reIndex();
    this.partselected.emit( part );
    // TODO send change to service
  }
  // adding part's
  handleAddPart2End( part:ProgressionPart ):void {
    this.progression.parts.push( part );
    this.reIndex();
    // TODO send add to service
  }
  handleAddPart2Next( part:ProgressionPart ):void {
    let l:number = this.progression.parts.length;
    if( part.index===l-1 ){ return this.handleAddPart2End(part);}
    let a = this.progression.parts.splice( 0, part.index );
    a.push( part );
    this.progression.parts = a.concat(this.progression.parts);
    this.reIndex();
    // TODO send add to service
  }
  // deleting part
  handleDeleteRequest( part:ProgressionPart ):void {
    // show modal
    /*this.modalService.open( new ConfirmModal( "Delete Part", 
      "Are you sure you want to delete this part. This action can not be undone.",
      ModalSize.Mini ))
      .onApprove( ()=> { */
        this.removePart( part );
      //})
      /*.onDeny( ()=>{

      });*/
  }
  handleKeyClicked( n:Note ):void{
    this.ts.playNote( n, 3, "8n" );
  }
  removePart( part:ProgressionPart ):void {
    let pi:number = this.progression.parts.findIndex( p =>  part.index==p.index );
    this.progression.parts.splice( pi, 1 );
    this.reIndex();
  }
  reIndex():void{
    // reindex
    let pi = 0;
    let posX = 50;
    this.progression.parts.forEach( p => { 
      p.index = pi; 
      p.pattern.posX = posX;
      p.pattern.width = p.pattern.ticks.length * PatternPartComponent.CELL_WIDTH;
      posX += p.pattern.width;
      pi++;
    });
  }

  get editorScrolLeft():number{ return this.globalSelections.editorScrolLeft; }

}
