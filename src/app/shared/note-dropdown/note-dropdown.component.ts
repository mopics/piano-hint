import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-note-dropdown',
  templateUrl: './note-dropdown.component.html',
  styleUrls: ['./note-dropdown.component.css']
})
export class NoteDropdownComponent implements OnInit {
  @Input() note:string;
  @Output('change') change:EventEmitter<string> = new EventEmitter<string>();
  @Input() message:string;

  constructor() { }

  ngOnInit() {
  }
  emitChange():void{
    this.change.emit( this.note );
  }

}
