import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ViewChildren, ElementRef, Renderer, QueryList, Directive } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

import { MenuState, MenuItem } from '../../models';
@Directive({ 
  selector: '[subitems]'
})
export class SubItemsDirective{
  @Input() alignRight:boolean = false
  @ViewChild('pointer') pointer:ElementRef;

  observer:MutationObserver;

  constructor(private el: ElementRef, private renderer: Renderer ) {
  }
  ngAfterViewInit() {
    this.observer = new MutationObserver(mutations => {
      if( this.el.nativeElement.clientWidth>0 ){
        if( this.alignRight ) {
          this.renderer.setElementStyle( this.el.nativeElement, "right", -this.el.nativeElement.clientWidth+'px' );
          //this.renderer.setElementStyle( this.pointer, "right", -this.el.nativeElement.clientWidth+'px' );
        } else {
          this.renderer.setElementStyle( this.el.nativeElement, "left", -this.el.nativeElement.clientWidth+'px' );
        }
        this.observer.disconnect();
      }  
    });
    var config = { attributes: true, childList: true, characterData: true };
    this.observer.observe(this.el.nativeElement, config);
  }
}
@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  animations:[
    trigger('toggleMenu',[
      state('show', style({
        transform:'scale(1,1)',
        transformOrigin:'50% 0%'
      })),
      state('hide', style({
        transform:'scale(1,0)',
        transformOrigin:'50% 00%'
      })),
      transition('hide => show', animate( '100ms ease-in')),
      transition('show => hide', animate( '100ms ease-in')),
    ]),
  ]
})
export class SubMenuComponent implements OnInit {
  @Input() title:string = "";
  @Input() alignRight:boolean = false;
  @Input() useActiveState:boolean = false;
  @Input() xAdjust:number=0;
  @Input() items:Array<MenuItem>;
  @Input() parentItem:MenuItem;
  @Input() iconClasses:Array<string> = new Array("caret", "left", "icon");
  @Output() select:EventEmitter<MenuItem>=new EventEmitter();
  @HostListener('document:click', ['$event']) clickedOutside($event){ this.handleOutsideClick($event); }
  @ViewChild ('myIcon') myIcon:ElementRef;

  state:MenuState = new MenuState( false );
  itemsDivClasses:string[];

  constructor(private renderer: Renderer) { }

  ngOnInit(){
    this.items.forEach( itm=>{
      itm.component = this;
      itm.parent = this.parentItem; 
    });
    this.defineItemsDivClassed();
  }
  ngOnChanges( changes ){
    this.items.forEach( itm=>{
      itm.component = this;
      itm.parent = this.parentItem; 
    });
  }
  show( event ):void {
    event.stopPropagation();
    if(!this.state.show){
      this.state.show = true;
      this.state.display = true;
      this.defineItemsDivClassed();
    }
  }
  hide( event ) {
    event.stopPropagation();
    if( this.state.show ){
      this.state.show = false;
      this.state.display = false;
      this.defineItemsDivClassed();
    }
  }
  toggle( event ):void{
    event.stopPropagation();
    // do toggle
    this.state.toggle();
    this.defineItemsDivClassed();
  }
  toggleAnimateDone():void{
    if( !this.state.show ){
       this.state.display = false;
       this.defineItemsDivClassed();
    }
  };

  defineItemsDivClassed():void{
    this.itemsDivClasses = new Array<string>( );
    if( this.alignRight ) {
      this.iconClasses = Array( "caret", "right", "icon" );
      this.itemsDivClasses.push( "items-right" );
    }
    else {
      this.iconClasses = Array( "caret", "left", "icon" )
    }
    if( this.state.display ){
      this.itemsDivClasses.push( "display-block");
    }
    else {
      this.itemsDivClasses.push( "display-none");
    }
  }
  handleOutsideClick($event):void {
    if( this.state.show ){
      this.state.show = false;
    }
  }

  selectItem( event:MenuItem ) {
    
    if( this.useActiveState ){
      this.items.forEach( i=>{ i.active=false;});
      event.active = true;
    }
    this.select.emit( event );
  }

}
