import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

import { MenuState, MenuItem } from '../models';

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
  @Input() items:Array<MenuItem>;
  @Output() select:EventEmitter<MenuItem>=new EventEmitter();
  @HostListener('document:click', ['$event']) clickedOutside($event){ this.handleOutsideClick($event); }
  @ViewChild ('myIcon') myIcon:ElementRef;

  state:MenuState = new MenuState( false );
  iconClicked:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggle($event):void{
    if( !this.iconClicked ){
      // do toggle
      this.state.toggle();
    }
    if( $event.target===this.myIcon.nativeElement){
      // set to true so event propagated for button-element will not toggle again.
      this.iconClicked = true;
    }
  }
  toggleAnimateDone():void{
    if( !this.state.show )
       this.state.display = false;
  };

  handleOutsideClick($event):void {
    if( $event.target===this.myIcon.nativeElement ) {
      if( this.iconClicked ){ this.iconClicked=false; }
      return;
    }
    if( this.state.show ){
      this.state.show = false;
    }
  }

  selectItem( event:MenuItem ) {
    this.select.emit( event );
  }

}
