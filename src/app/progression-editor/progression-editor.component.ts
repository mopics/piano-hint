import { Component, OnInit } from '@angular/core';

// models
import { Chords, Notes, Note } from '../services';
import { Progression, ProgressionPart } from '../services';
// service
import { ProgressionsService, GlobalSelectionsService } from '../services';

@Component({
  selector: 'app-progression-editor',
  templateUrl: './progression-editor.component.html',
  styleUrls: ['./progression-editor.component.scss']
})
export class ProgressionEditorComponent implements OnInit {
  
  progression:Progression = Progression.blank();

  constructor(  
    private progService:ProgressionsService,
    private globalSelections:GlobalSelectionsService,
   ) {  }

  ngOnInit() {
    this.progression = this.globalSelections.selectedProgression;
    this.globalSelections.selectedProgressionEmitter.subscribe( p => {
      this.progression = p;
      console.log('foo');
     } );

    console.log('foo');
  }
  handlePartChange( part:ProgressionPart ):void {
    this.progression.parts[ part.index ] = part;
    // TODO send change to service
  }
  addPart():void {
    this.progression.parts.push( this.progression.duplicatePrevPart() );
    this.progression.reIndexParts();
    // TODO send add to service
  }

} 
