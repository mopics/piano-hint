import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mode-dropdown',
  templateUrl: './mode-dropdown.component.html',
  styleUrls: ['./mode-dropdown.component.css']
})
export class ModeDropdownComponent implements OnInit {

  @Input() mode:string;
  @Output('change') change:EventEmitter<string> = new EventEmitter<string>();
  @Input() message:string;

  constructor() { }

  ngOnInit() {
  }
  emitChange():void{
    this.change.emit( this.mode );
  }

}
