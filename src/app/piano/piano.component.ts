import { Component, OnInit, ViewChild, ElementRef, NgZone, Directive, Renderer, HostListener, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

// components
import { PianoOctaveComponent } from '../shared/piano-octave/piano-octave.component';
import { MenuItem } from '../shared/models';

// models
import { ProgressionPart, Progression } from '../services';

// service
import { ProgressionsService, GlobalSelectionsService, ToneService, VisibilityEvent } from '../services';

class VisibilityMenuItem {
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

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PianoComponent implements OnInit {
  progression:Progression;
  currPartIndex:number = 0;
  pianoInitiated:boolean = false;
  playing:boolean = false;
  dividerBottom:number = 300;
  tonalityLeft:number;
  pianoVisible:boolean = true;

  // view hide functionality:
  pianoViewHideItem:VisibilityMenuItem = new VisibilityMenuItem( VisibilityEvent.PIANO, "Hide Piano", "hide", "hide", "unhide", "Hide Piano", "Show Piano", true );
  patternEditMenuViewItem:VisibilityMenuItem = new VisibilityMenuItem( VisibilityEvent.PATTERN_EDIT_MENUS, "Show pattern edit menu's", "setting", "setting", "setting", "Hide pattern edit menu's", "Show pattern edit menu's", true );
  viewHideMenuIconClasses = new Array<string>( "unhide", "view-edit-icon", "icon" );
  viewHideMenuItems:MenuItem[] = new Array(
    this.pianoViewHideItem,
    this.patternEditMenuViewItem
  );
  


  @ViewChild(PianoOctaveComponent) piano:PianoOctaveComponent;
  @ViewChild( 'editor' ) editor:ElementRef;
  @ViewChild( 'tonality' ) tonality:ElementRef;

  @HostListener( 'window:resize', ['$event'] ) windowresize(e){
    this.setDividerBottom();
    this.setTonalityLeft();
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
    this.setDividerBottom();

    this.gss.selectedProgressionEmitter.subscribe( p => {
      this.stopProgression();
      this.progression = p;
      this.currPartIndex = 0;
      this.initPiano();
      this.setDividerBottom();
      this.cd.markForCheck();
    } );
    this.gss.selectedPartIndexEmitter.subscribe( p=>{
      this.currPartIndex = p;
      this.piano.updateKeys( this.progression.parts[p] );
      this.setTonalityLeft();
      this.cd.markForCheck();
    });
    this.gss.visibilityEmitter.subscribe( e=>{
      switch( e.what ){
        case VisibilityEvent.PIANO:
        this.togglePiano( e.visible );
        // update viewHideMenuItems
        this.pianoViewHideItem.visible = e.visible;
        
        break;
        case VisibilityEvent.PATTERN_EDIT_MENUS:
        // toggle pattern-edit-menus
        this.patternEditMenuViewItem.visible = e.visible;
        break;
      }
      this.cd.markForCheck();
    });
    this.pianoViewHideItem.visible = this.pianoVisible;
    this.patternEditMenuViewItem.visible = this.gss.patternEditMenuVisible;
  }
  initPiano():void {
    if( this.pianoInitiated ){ 
      //this.piano.setProgression( this.progression );
      this.piano.updateKeys( this.progression.parts[this.currPartIndex] )
      return;
    }
    this.piano.root = "C";
    this.piano.startOctave = 2;
    this.piano.numOctaves = 4;
    this.piano.keyHeight = 250;
    this.piano.keyWidth = 80;
    //this.piano.setProgression( this.progression );
    this.piano.createKeys( this.progression.parts[0] );
    this.piano.keyClicked.subscribe( n=> this.ts.playNote(n,n.octave) );

    this.ts.sequenceEmitter.subscribe( event=> {
      //this.ngZone.run( ()=> {
        if( event.partIndex > -1 ){ // change part
          
            this.gss.selectedPartIndex = event.partIndex;
          
        }
        this.piano.highlightTickNotes( event.notes );
      //});
    });

    this.pianoInitiated = true;
  }
  playProgression():void{
    if( this.progression ){
      this.playing = true;
      this.ts.playProgression( this.progression );
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
  }
  setDividerBottom():void {
    if( this.pianoVisible ){
      let pianoWidth = this.piano.totalWidth();
      let pianoScaling = window.innerWidth / pianoWidth;
      this.dividerBottom = this.piano.keyHeight * pianoScaling;
    } else {
      this.dividerBottom = 0;
    }
    
  }
  setTonalityLeft():void {
    this.tonalityLeft = window.innerWidth/2 - this.tonality.nativeElement.clientWidth/2;
  }


  // visibility stuff
  onViewHideMenuSelect( itm:VisibilityMenuItem ){
    if( itm.id===VisibilityEvent.PIANO ){
      this.gss.pianoVisible = !itm.visible;
    }
    else if( itm.id===VisibilityEvent.PATTERN_EDIT_MENUS){
      this.gss.patternEditMenuVisible = !itm.visible;
    }
  }
  togglePiano( v:boolean ):void {
    this.pianoVisible = v;
    this.setDividerBottom();
  }
}
