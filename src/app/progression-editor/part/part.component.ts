import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// models
import { Chords, Notes, Note } from '../../services';
import { Progression, ProgressionPart } from '../../services';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  @Input() part:ProgressionPart;
  @Output() change:EventEmitter<ProgressionPart> = new EventEmitter<ProgressionPart>();

  constructor() { }

  ngOnInit() {
    console.log( this.part);
  }

  handleTonicChange( note:string ){
    this.part.key.tonic.name = note;
    this.emitPartChange();
  }
  handleChordChange( mode:string ){
    this.part.chord.name = mode;
    this.emitPartChange();
  }
  emitPartChange():void {
    this.change.emit( this.part );
  }
}
