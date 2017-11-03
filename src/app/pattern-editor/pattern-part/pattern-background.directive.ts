import { Directive, ElementRef, Renderer, HostListener, Input } from '@angular/core';
import { GlobalSelectionsService } from '../../services';
import { PatternPartComponent } from './pattern-part.component';
import { Rectangle } from '../../shared/models';

@Directive({
  selector: '[appPatternBackground]'
})
export class PatternBackgroundDirective {

  mouseDown:boolean = false;
  mouseDownPos:number[];

  @HostListener('mousedown', ['$event']) mousedown(e) {
    this.renderer.setElementAttribute( this.el.nativeElement, "draggable", "false" );
    if( this.gss.selectedPartIndex!==this.parent.part.index ) {
      this.parent.selectPart();
    }
    this.mouseDown = true;
    this.mouseDownPos = Array( e.clientX+this.gss.editorScrolLeft, e.clientY+this.gss.editorScrolTop );
    this.renderer.setElementStyle( this.selectionRect, "display", "block" );
    this.renderer.setElementStyle( this.selectionRect, "left", this.mouseDownPos[0]-this.gss.editorScrolLeft+"px" );
    this.renderer.setElementStyle( this.selectionRect, "top", this.mouseDownPos[1]-this.gss.editorScrolTop+"px" );
  }
  @HostListener('window:mousemove', ['$event']) mousemove(e){
    if( this.mouseDown ){
      // update selection rectangle
      this.renderer.setElementStyle( this.selectionRect, "left", this.mouseDownPos[0]-this.gss.editorScrolLeft+"px" );
      this.renderer.setElementStyle( this.selectionRect, "top", this.mouseDownPos[1]-this.gss.editorScrolTop+"px" );
      let nw:number = (e.clientX - this.mouseDownPos[0]+this.gss.editorScrolLeft );
      if( nw<5 ){ nw = 5; }
      let nh:number = (e.clientY - this.mouseDownPos[1]+this.gss.editorScrolTop );
      if( nh<5 ){ nh = 5; }
      this.renderer.setElementStyle( this.selectionRect, "width", nw+"px" );
      this.renderer.setElementStyle( this.selectionRect, "height", nh+"px" );
    }
  }
  @HostListener('window:mouseup', ['$event']) mouseup(e) {
    if( !this.mouseDown ){ return; }
    this.mouseDown = false;
    // do select all notes within selection rectangle
    let r:Rectangle = new Rectangle( 
      this.mouseDownPos[0], 
      this.mouseDownPos[1], 
      this.selectionRect.clientWidth, 
      this.selectionRect.clientHeight );

    this.renderer.setElementStyle( this.selectionRect, "display", "none" );
    this.renderer.setElementStyle( this.selectionRect, "width", "0px" );
    this.renderer.setElementStyle( this.selectionRect, "height", "0px" );

    this.parent.onPatternBackgroundSelection( r );
  }
  @HostListener('window:mouseleave', ['$event']) mouseleave(e){
    this.mouseup(e);
  }  
  
  @Input() parent:PatternPartComponent; // fsdf
  @Input() selectionRect:any;

  constructor( private el: ElementRef, private renderer: Renderer, private gss:GlobalSelectionsService) { }

  ngOnInit(){
  }

}
