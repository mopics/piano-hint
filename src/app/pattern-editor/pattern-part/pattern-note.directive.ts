import { Directive, Input, HostListener, ElementRef, Renderer } from '@angular/core';
import { PatternPartComponent } from './pattern-part.component';
import { GlobalSelectionsService, TickNote, Note } from '../../services';
import { Vector2, Rectangle } from '../../shared/models';

export class TickNoteChange {
    tickNote:TickNote;
    prevCol:number;
    constructor( tn:TickNote, pc:number ){
        this.tickNote = tn; this.prevCol = pc;
    }
}
@Directive({ 
    selector: '[pattern-note]'
  })
  export class PatternNoteDirective {
  
    @Input() parent:PatternPartComponent; // fsdf
    @Input() tickNote:TickNote; //khkh
  
    editorTop:number = 120; // should correspond with $editorTop in scss-file
    menuHeight:number = 26; // sgeg
  
    resizeMode:boolean = false;
    dragging:boolean = false;
    oldPos:Vector2;
    patternRect:Rectangle;
    startLayerPos:Vector2;
    tickNoteChange:TickNoteChange;
  
    constructor(private el: ElementRef, private renderer: Renderer, private gss:GlobalSelectionsService ) {}
    

    ngOnInit(){
        this.patternRect = new Rectangle( this.parent.part.pattern.posX-2, 141, this.parent.part.pattern.width, this.parent.numOctaves*12*PatternPartComponent.CELL_HEIGHT );
    }
  
    @HostListener('mouseenter', ['$event']) mouseenter(e){
      this.mousemove(e);
    };
    @HostListener('mousemove', ['$event']) mousemove(e, fromOutside:boolean=false ){
      if( this.gss.selectedPartIndex !== this.parent.part.index ){ return; }
      if( this.dragging ) { 
        let scrollX:number = this.gss.editorScrolLeft;
          if( this.resizeMode ){
                let nw:number = e.pageX + scrollX - this.tickNote.posX - this.patternRect.x;
                let cw:number = PatternPartComponent.CELL_WIDTH;
                this.renderer.setElementStyle( this.el.nativeElement, "width", nw+"px");
                this.tickNote.length = (nw)/PatternPartComponent.CELL_WIDTH;
                this.tickNote.width = nw;
                // console.log( `cw:${cw} nw:${nw} => ${this.tickNote.length}` );
          }
          else { // in moveMode
                let scrollY:number = this.gss.editorScrolTop;
                let cw:number = PatternPartComponent.CELL_WIDTH;
                let ch:number = PatternPartComponent.CELL_HEIGHT;
                let snap:number = PatternPartComponent.CELL_SNAP;
                
                let mouse:Vector2 = new Vector2( 
                    e.pageX+scrollX, //-this.patternRect.x-this.startLayerPos.x, 
                    e.pageY+scrollY ); //-this.patternRect.y-this.startLayerPos.y );
                
                let xSnapResolutionRatio:number = cw/snap;
                let newPos:Vector2 = new Vector2( 
                    Math.floor( (mouse.x-8-this.patternRect.x-this.startLayerPos.x )/xSnapResolutionRatio )*xSnapResolutionRatio, 
                    Math.floor( (mouse.y-this.patternRect.y-this.startLayerPos.y)/ch)*ch + 2 );

                if( newPos.x < 2 ){ newPos.x = 2; }
                if( newPos.x + this.tickNote.width/snap > this.patternRect.width ){ newPos.x = this.patternRect.width-this.tickNote.width/snap }
                if( newPos.y < 2 ){ newPos.y = 2; }
                if( newPos.y > this.patternRect.height ){ newPos.y = this.patternRect.height - ch; }
                this.tickNote.posX = newPos.x;
                this.tickNote.posY = newPos.y;
                // todo update actual pattern note data
                // set new col & start(time)
                this.tickNote.posX = newPos.x; this.tickNote.posY = newPos.y;
                this.tickNote.col = Math.floor( newPos.x / cw );
                this.tickNote.start = this.parent.getNoteLengthFromWidth( (newPos.x - this.tickNote.col*cw) );
                // set new note
                let note:Note = this.parent.getNoteByPos( newPos.y );
                this.tickNote.name = note.name;
                this.tickNote.octave = note.octave;
                this.tickNote.fill = note.fill;
                
          }
      }
      else if( !fromOutside ) {
        // if hovering over end of note 8px from right;
        if( e.layerX > e.target.clientWidth-7 ){ // 
            this.renderer.setElementStyle( this.el.nativeElement, "cursor", "ew-resize");
            this.resizeMode = true;
        }
        else {
            this.renderer.setElementStyle( this.el.nativeElement, "cursor", "move");
            this.resizeMode = false;
        }
      }
    };
    @HostListener('mouseleave', ['$event']) mouseleave(e){
      // this.dragging = false;
    };
    @HostListener('mousedown', ['$event']) mousedown(e) {
        if( this.gss.selectedPartIndex !== this.parent.part.index ){ 
            this.parent.selectPart();
        }
        this.renderer.setElementAttribute( this.el.nativeElement, "draggable", "false"  );
        this.oldPos = new Vector2( this.tickNote.posX, this.tickNote.posY );
        this.tickNoteChange = new TickNoteChange( this.tickNote, this.tickNote.col );
        this.startLayerPos = new Vector2( e.layerX, e.layerY );
        this.dragging = true;
        this.gss.draggingNote = this;
        this.gss.selectedNotes = Array( this.tickNote );
        if( this.gss.patternEditMenuVisible ) { 
            this.patternRect.y = 141;
        } else {
            this.patternRect.y = 141 - 19;
        }

      //this.parent.setNoteNotActive( this.tickNote, this.tickNote.col );
    };
    @HostListener('mouseup', ['$event']) mouseup(e) {
      this.dragging = false;
      this.gss.draggingNote = null;
      window.document.body.style.cursor = "default";
      if( this.tickNoteChange ){
          if( this.tickNoteChange.prevCol!==this.tickNote.col ) {
                this.parent.updateActiveNotes( Array( this.tickNoteChange ) );
            }
      }
      
    };
  }