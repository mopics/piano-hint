import { Directive, ElementRef, Renderer, HostListener, Input } from '@angular/core';
import { GlobalSelectionsService } from '../../services';
import { PatternPartComponent } from './pattern-part.component';
import { Vector2, Rectangle } from '../../shared/models';

@Directive({
  selector: '[appPatternBackground]'
})
export class PatternBackgroundDirective {

  mouseDown:boolean = false;
  mouseDownPos:Vector2;

  @HostListener('mousedown', ['$event']) mousedown(e) {
    this.renderer.setElementAttribute( this.el.nativeElement, "draggable", "false" );
    if( this.gss.selectedPartIndex!==this.parent.part.index ) {
      this.parent.selectPart();
    }
    this.mouseDown = true;
    this.mouseDownPos = new Vector2( e.clientX+this.gss.editorScrolLeft, e.clientY+this.gss.editorScrolTop );
    this.renderer.setElementStyle( this.selectionRect, "display", "block" );
    this.renderer.setElementStyle( this.selectionRect, "left", this.mouseDownPos.x-this.gss.editorScrolLeft+"px" );
    this.renderer.setElementStyle( this.selectionRect, "top", this.mouseDownPos.y-this.gss.editorScrolTop+"px" );
  }
  @HostListener('window:mousemove', ['$event']) mousemove(e){
    if( this.mouseDown ){
      let r:Rectangle = this.getSelectionRectangle( e );
      // update selection rectangle
      this.renderer.setElementStyle( this.selectionRect, "left", r.x-this.gss.editorScrolLeft+"px" );
      this.renderer.setElementStyle( this.selectionRect, "top", r.y-this.gss.editorScrolTop+"px" );
      this.renderer.setElementStyle( this.selectionRect, "width", r.width+"px" );
      this.renderer.setElementStyle( this.selectionRect, "height", r.height+"px" );
    }
  }
  @HostListener('window:mouseup', ['$event']) mouseup(e) {
    if( !this.mouseDown ){ return; }
    this.mouseDown = false;
    // do select all notes within selection rectangle
    let r:Rectangle = this.getSelectionRectangle(e);

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

  getSelectionRectangle( e ):Rectangle {
    let x:number = this.mouseDownPos.x;
    let nw:number = e.clientX - x +this.gss.editorScrolLeft;
    if( nw<0 ){ 
      x = this.mouseDownPos.x + nw; 
      nw *= -1; 
    }
    let y:number = this.mouseDownPos.y;
    let nh:number = e.clientY - y +this.gss.editorScrolTop;
    if( nh<0 ){ 
      y = this.mouseDownPos.y + nh; 
      nh *= -1; 
    }
    return new Rectangle( x, y, nw, nh );
  }

}
