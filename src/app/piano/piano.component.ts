import { Component, OnInit, ViewChild, ElementRef, NgZone, Directive, Renderer, HostListener, Input } from '@angular/core';

// components
import { PianoOctaveComponent } from '../shared/piano-octave/piano-octave.component';

// models
import { ProgressionPart, Progression } from '../services';

// service
import { ProgressionsService, GlobalSelectionsService, ToneService } from '../services';


@Directive({ selector: '[ep-divider]' })
export class EpDividerDirective {

  @Input() editorDiv:ElementRef; // fsdf
  @Input() pianoDiv:ElementRef; // afsdf

  editorTop:number = 120; // should correspond with $editorTop in scss-file
  menuHeight:number = 26; // sgeg

  constructor(private el: ElementRef, private renderer: Renderer) {}

  @HostListener('drag', ['$event']) onDrag(e) {
      e.preventDefault();
      e.stopPropagation();
      this.update( e.pageY, e.view.innerHeight );
      
  };
  @HostListener('dragend', ['$event']) onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.update( e.pageY, e.view.innerHeight );
  };
  update ( mouseY:number, pageHeight:number ):void{
    //if( mouseY< 200 ) { return; }
    let dividerPos:number = pageHeight-mouseY;
    this.renderer.setElementStyle( this.el.nativeElement, 'bottom',  dividerPos+"px" );
    // update editor:
    this.renderer.setElementStyle( this.editorDiv, "bottom", (dividerPos+10)+"px" );
    this.renderer.setElementStyle( this.pianoDiv, "height", dividerPos+"px");
  };
}


@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss']
})
export class PianoComponent implements OnInit {
  progression:Progression;
  currPartIndex:number = 0;
  pianoInitiated:boolean = false;
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
    this.initPiano();

    this.globalSelections.selectedProgressionEmitter.subscribe( p => {
      this.progression = p;
      this.initPiano();
    } );
  }
  initPiano():void {
    if( this.pianoInitiated ){ return; }
    this.piano.root = "C";
    this.piano.startOctave = 2;
    this.piano.numOctaves = 4;
    this.piano.keyHeight = 300;
    this.piano.keyWidth = 80;
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
    this.bpm = this.ts.getBPM();
    this.pianoInitiated = true;
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
  onPartSelect( part:ProgressionPart ):void {
    this.currPartIndex = part.index;
    this.piano.updateKeys( part );
  }

}
