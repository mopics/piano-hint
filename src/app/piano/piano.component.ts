import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.css']
})
export class PianoComponent implements OnInit {

  selectedTonic:string = "C";
  @ViewChild('pianoOctave') pianoOctave;

  constructor( ) { }

  ngOnInit() {
    
  }
  handleNoteChange(event){
    console.log( event );
    this.selectedTonic = event;
    this.pianoOctave.redraw(event);
  }

}
