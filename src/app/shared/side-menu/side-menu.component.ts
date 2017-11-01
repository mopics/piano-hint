import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ViewChildren, ElementRef, Renderer, QueryList } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

import { MenuState, MenuItem } from '../models';
import { SubMenuComponent } from './sub-menu/sub-menu.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
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
export class SideMenuComponent implements OnInit {
  @Input() title:string = "";
  @Input() alignRight:boolean = false;
  @Input() useActiveState:boolean = false;
  @Input() xAdjust:number=0;
  @Input() items:Array<MenuItem>;
  @Input() iconClasses:Array<string> = new Array("sidebar", "icon");
  @Output() select:EventEmitter<MenuItem>=new EventEmitter();
  @Output() click:EventEmitter<SideMenuComponent> = new EventEmitter();
  @HostListener('document:click', ['$event']) clickedOutside($event){ this.handleOutsideClick($event); }
  @ViewChild ('myIcon') myIcon:ElementRef;

  state:MenuState = new MenuState( false );
  itemsDivClasses:string[];
  self:SideMenuComponent = this;

  constructor( private renderer: Renderer ) { }
  ngOnInit(){
    this.items.forEach( itm=>{
      itm.component = this;
    });
    this.defineItemsDivClassed();
  }
  toggle( event ):void{
    this.componentClicked();
    event.stopPropagation();
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
    if( this.alignRight )
      this.itemsDivClasses.push( "items-right" );
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
  showSubItems( item:MenuItem ) {
    this.items.forEach( i=>{
      if( item===i && i.items.length>0 ){
        i.items[0].component.show( { stopPropagation:()=>{} } );
      }
      else if( i.items.length > 0 ){
        i.items[0].component.hide( { stopPropagation:()=>{} } );
      }
    });
  }
  selectItem( item:MenuItem ) {
    if( item.items.length>0 ){
      this.showSubItems( item );
    }
    else {
      if( this.useActiveState ){
        this.items.forEach( i=>{ i.active=false;});
        item.active = true;
      }
      this.select.emit( item );
    }
  }
  onSubItemSelect( item:MenuItem ) {
    this.select.emit( item );
  }
  componentClicked():void {
    window.document.body.click(); // will hide other opened side-menu's and what not. We need to do this because all click-event propagations are stopped by this component
    this.click.emit( this );
  }

}
