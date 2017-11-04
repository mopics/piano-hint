import { Component, OnInit, ViewChild, ElementRef, NgZone, Directive, Renderer, HostListener, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { trigger,state,style,transition,animate } from '@angular/animations';

// components
import { PianoOctaveComponent } from '../shared/piano-octave/piano-octave.component';
import { MenuItem } from '../shared/models';

// models
import { ProgressionPart, Progression, Pattern } from '../services';

// service
import { ProgressionsService, GlobalSelectionsService, ToneService, VisibilityEvent } from '../services';

class VisibilityMenuItem implements MenuItem {
  id:string;
  label:string;
  icon:string;
  items:MenuItem[] = Array( 
    /* test left-sided submenu
    { label:"test1", icon:"", items:Array(), component:null, parent:null },
    { label:"test2", icon:"", items:Array(), component:null, parent:null }*/
  );
  component:any = null;
  parent:MenuItem = null;
  active:boolean = false;
  iconVisible:string;
  iconHidden:string;
  labelVisible:string;
  labelHidden:string;
  _visible:boolean;
  constructor( id:string, l:string, i:string, iv:string, ih:string, lv:string, lh:string, v:boolean ){
    this.id = id;
    this.label = l; this.icon = i; this.labelVisible = lv;
    this.iconVisible = iv; this.iconHidden = ih;
    this.labelHidden = lh; this._visible = v;
  }
  set visible( b:boolean ){
    this._visible = b;
    if( b ){
      this.icon = this.iconVisible;
      this.label = this.labelVisible;
    } else {
      this.icon = this.iconHidden;
      this.label = this.labelHidden;
    }
  }
  get visible(){return this._visible;}
}

@Directive({
  selector:'[tonality-display]'
})
export class TonalityDisplayDirective {

  @Input() pianoActualHeight:number;
  observer:MutationObserver;
  @HostListener( 'window:resize', ['$event'] ) windowresize(e){
    this.updateClassAndPos();
  }

  constructor( private el:ElementRef, private r:Renderer, private gss:GlobalSelectionsService ){
    this.gss.visibilityEmitter.subscribe( e=>{
      if( e.what===VisibilityEvent.PIANO ){
        this.r.setElementStyle( this.el.nativeElement, "opacity", '0' );
        setTimeout( ()=> {
          this.updateClassAndPos();
          if( e.visible )
            this.r.setElementStyle( this.el.nativeElement, "opacity", '1' );
         }, 500 );
      }
    });
    this.gss.selectedPartIndexEmitter.subscribe( e=>{
      setTimeout( ()=>{
        this.updateLeft();
      }, 500 )
      
    })
  }
  ngAfterViewInit(){
    this.updateClassAndPos();
    this.observer = new MutationObserver( mutations => {
      mutations.forEach( m=> console.log( `TonalityDisplay:mutation=${m.type}` ) );
    });
    var config = { characterData: true };
    this.observer.observe(this.el.nativeElement, config);
  }

  updateClassAndPos():void {
    let borderRadius:number = 20;
    if( window.innerWidth <= 425 ) { // mobile
      borderRadius = 10;
      this.r.setElementStyle( this.el.nativeElement, 'height', borderRadius+'px' );
      this.r.setElementStyle( this.el.nativeElement, 'border-radius', `0 0 ${borderRadius}px ${borderRadius}px` );
      this.r.setElementStyle( this.el.nativeElement, 'padding', `0 ${borderRadius}px` );
      this.r.setElementStyle( this.el.nativeElement, 'font-size', '0.5em' );
      this.r.setElementStyle( this.el.nativeElement, 'bottom', this.pianoActualHeight+'px' );
    }
    else if( window.innerWidth <= 770 ){ // tablet 
      borderRadius = 15;
      this.r.setElementStyle( this.el.nativeElement, 'height', borderRadius+'px' );
      this.r.setElementStyle( this.el.nativeElement, 'border-radius', `0 0 ${borderRadius}px ${borderRadius}px` );
      this.r.setElementStyle( this.el.nativeElement, 'padding', `0 ${borderRadius}px` );
      this.r.setElementStyle( this.el.nativeElement, 'font-size', '0.8em' );
      this.r.setElementStyle( this.el.nativeElement, 'bottom', this.pianoActualHeight-8+'px' );
    } else { // desktop
      this.r.setElementStyle( this.el.nativeElement, 'height', borderRadius+'px' );
      this.r.setElementStyle( this.el.nativeElement, 'border-radius', `0 0 ${borderRadius}px ${borderRadius}px` );
      this.r.setElementStyle( this.el.nativeElement, 'padding', `2px ${borderRadius}px` );
      this.r.setElementStyle( this.el.nativeElement, 'font-size', '.95em' );
      this.r.setElementStyle( this.el.nativeElement, 'bottom', this.pianoActualHeight-10+'px' );
    }
    this.updateLeft();
    
  }
  updateLeft():void{
    let left:number = window.innerWidth/2 - this.el.nativeElement.clientWidth/2;
    this.r.setElementStyle( this.el.nativeElement, "left", left+'px' );
  }
};

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations:[ // <=====add to decorator
    // define animation triggers
    trigger('pianoAnimation',[
      // define animation states
      state('hidden',style({
        bottom: '-{{piano_height}}px',
      }), {params:{piano_height:0}} ),
      state('visible',style({
        bottom: '0', // <== user interpolation to pass in variable
      })),// <== default valus is required
      transition('visible <=> hidden', animate('100ms ease-in'))
    ]),
    trigger('dividerAnimation',[
      state('hidden',style({
        bottom: '0',
      }) ),
      state('visible',style({
        bottom: '{{piano_height}}px', // <== user interpolation to pass in variable
      }), {params:{piano_height:0}}),// <== default valus is required
      transition('visible <=> hidden', animate('100ms ease-in'))
    ]),
  ]
})
export class PianoComponent implements OnInit {
  progression:Progression;
  currPartIndex:number = 0;
  pianoInitiated:boolean = false;
  playing:boolean = false;
  pianoActualHeight:number = 300;
  editorBottom:number = 310;
  pianoActualHeightInversed:number = -300;
  pianoState:string = 'visible';

  // view hide functionality:
  pianoViewHideItem:VisibilityMenuItem = new VisibilityMenuItem( VisibilityEvent.PIANO, "Hide Piano", "hide", "hide", "unhide", "Hide Piano", "Show Piano", true );
  patternEditMenuViewItem:VisibilityMenuItem = new VisibilityMenuItem( VisibilityEvent.PATTERN_EDIT_MENUS, "Hide pattern edit menu's", "setting", "setting", "setting", "Hide pattern edit menu's", "Show pattern edit menu's", true );
  pianoScaleVHItem:VisibilityMenuItem = new VisibilityMenuItem( VisibilityEvent.PIANO_SCALE,"Show scale on piano", "music", "music", "music","Hide scale on piano", "Show scale on piano", false );
  pianoChordVHItem:VisibilityMenuItem = new VisibilityMenuItem( VisibilityEvent.PIANO_CHORD, "Show chord on piano", "music", "music", "music","Hide chord on piano", "Show chord on piano", false );
  viewHideMenuIconClasses = new Array<string>( "unhide", "view-edit-icon", "icon" );
  viewHideMenuItems:MenuItem[] = new Array(
    this.pianoViewHideItem,
    this.patternEditMenuViewItem,
    this.pianoScaleVHItem,
    this.pianoChordVHItem
  );
  


  @ViewChild(PianoOctaveComponent) piano:PianoOctaveComponent;
  @ViewChild( 'editor' ) editor:ElementRef;

  @HostListener( 'window:resize', ['$event'] ) windowresize(e){
    this.setpianoActualHeight();
  }
  @HostListener( 'window:keyup', ['$event'] ) keyup(e){
    if( e.code==="Space" ){
      if( this.playing ){
        this.pauseProgression();
      } else {
         this.playProgression();
      }
    }
  }

  constructor( 
    private progService:ProgressionsService,
    private gss:GlobalSelectionsService,
    private ts:ToneService,
    private ngZone:NgZone,
    private cd:ChangeDetectorRef
  ) { 
    
  }

  ngOnInit() {
    this.progression = this.gss.selectedProgression;
    this.initPiano();
    this.setpianoActualHeight();

    this.gss.selectedProgressionEmitter.subscribe( p => {
      this.stopProgression();
      this.progression = p;
      this.currPartIndex = 0;
      this.initPiano();
      this.setpianoActualHeight();
      this.cd.markForCheck();
    } );
    this.gss.selectedPartIndexEmitter.subscribe( p=>{
      this.currPartIndex = p;
      this.piano.updateKeys( this.progression.parts[p] );
      this.cd.markForCheck();
    });
    this.gss.visibilityEmitter.subscribe( e=>{
      switch( e.what ){
        case VisibilityEvent.PIANO:
        this.togglePiano( e.visible );
        this.pianoViewHideItem.visible = e.visible;
        break;
        case VisibilityEvent.PATTERN_EDIT_MENUS:
        this.patternEditMenuViewItem.visible = e.visible;
        break;
        case VisibilityEvent.PIANO_SCALE:
        this.pianoScaleVHItem.visible = e.visible;
        break;
        case VisibilityEvent.PIANO_CHORD:
        this.pianoChordVHItem.visible = e.visible;
        break;
      }
      this.cd.markForCheck();
    });
    this.pianoViewHideItem.visible = this.pianoState==='visible' ? true: false;
    this.patternEditMenuViewItem.visible = this.gss.patternEditMenuVisible;
  }
  initPiano():void {
    if( this.pianoInitiated ){ 
      this.piano.root = "C";
      this.piano.startOctave = this.progression.startOctave;
      this.piano.numOctaves = this.progression.numOctaves;
      this.piano.keyHeight = 250;
      this.piano.keyWidth = 80;
      //this.piano.setProgression( this.progression );
      this.piano.createKeys( this.progression.parts[0] );
      return;
    }
    this.piano.root = "C";
    this.piano.startOctave = this.progression.startOctave;
    this.piano.numOctaves = this.progression.numOctaves;
    this.piano.keyHeight = 250;
    this.piano.keyWidth = 80;
    //this.piano.setProgression( this.progression );
    this.piano.createKeys( this.progression.parts[0] );
    this.piano.keyClicked.subscribe( n=> this.ts.playNote(n,n.octave) );

    this.ts.sequenceEmitter.subscribe( event=> {
      this.ngZone.run( ()=> {
        if( event.partIndex > -1 ){ // change part
          
            this.gss.selectedPartIndex = event.partIndex;
            // check if part is almost offscreen
            let pattern:Pattern = this.progression.parts[event.partIndex].pattern;
            let scrollLeft:number = this.editor.nativeElement.scrollLeft;
            let el = this.editor.nativeElement;
            let win = window;

            if( pattern.posX > scrollLeft+win.innerWidth*.5 ){
              // animate scroll
              let targetScroll:number = pattern.posX - 20;
              let step:number = ( targetScroll - scrollLeft ) / 10;
              let i:number = 0;
              // requesAnimationKeyframe way:
              let frame = (timestamp) => {
                el.scrollLeft += step;
                i++;
                if( i<10 ){
                  win.requestAnimationFrame(frame);
                }
              }
              win.requestAnimationFrame(frame);
            }
            else if( pattern.posX < scrollLeft ){
               // animate scroll
               let step:number = ( scrollLeft ) / 10;
               let i:number = 0;
               // requesAnimationKeyframe way:
               let frame = (timestamp) => {
                  el.scrollLeft -= step;
                  i++;
                  if( i<10 ){
                    win.requestAnimationFrame(frame);
                  }
                }
                win.requestAnimationFrame(frame);
            }
          
        }
        this.piano.highlightTickNotes( event.notes );
      });
    });

    this.pianoInitiated = true;
  }
  playProgression():void{
    if( this.progression ){
      this.playing = true;
      this.ts.playProgression( this.progression, this.gss.selectedPartIndex );
    }
  }
  pauseProgression():void{
    this.playing = false;
    this.ts.pauseProgression();
  }
  stopProgression():void {
    this.playing = false;
    this.ts.stopProgression();
  }
  onBpmSliderChange( value:number ):void {
    this.ts.setBPM( value );
  }
  onPartSelect( part:ProgressionPart ):void {
    this.currPartIndex = part.index;
    this.piano.updateKeys( part );
  }
  onEditorScroll( event ):void {
    this.gss.editorScrolLeft = this.editor.nativeElement.scrollLeft;
    this.gss.editorScrolTop = this.editor.nativeElement.scrollTop;
  }
  setpianoActualHeight():void {
    let pianoWidth = this.piano.totalWidth();
    let pianoScaling = window.innerWidth / pianoWidth;
    this.pianoActualHeight = this.piano.keyHeight * pianoScaling;
    this.pianoActualHeightInversed = this.pianoActualHeight*-1;
    this.editorBottom = this.pianoActualHeight+10;
  }


  // visibility stuff
  onViewHideMenuSelect( itm:VisibilityMenuItem ){
    switch( itm.id ){
      case VisibilityEvent.PIANO:
      this.gss.pianoVisible = !itm.visible; break;
      case VisibilityEvent.PATTERN_EDIT_MENUS:
      this.gss.patternEditMenuVisible = !itm.visible; break;
      case VisibilityEvent.PIANO_SCALE:
      this.gss.pianoScaleVisible = !itm.visible; break;
      case VisibilityEvent.PIANO_CHORD:
      this.gss.pianoChordVisible = !itm.visible; break;
    }
  }
  togglePiano( v:boolean ):void {
    this.pianoState = v ? 'visible': 'hidden'; // triggers pianoState animation
  }
  onDividerAnimationStart():void{
    if( this.pianoState==="hidden")
      this.editorBottom = 10;
    else 
      this.editorBottom = this.pianoActualHeight+10;
  }
}
