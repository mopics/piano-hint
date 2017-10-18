import { Component, OnInit } from '@angular/core';

// models
import { Chords, Notes, Note } from '../services';
import { Progression, ProgressionPart } from '../services';
// service
import { ProgressionsService, GlobalSelectionsService } from '../services';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { ConfirmModal } from '../shared/modals/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-progression-editor',
  templateUrl: './progression-editor.component.html',
  styleUrls: ['./progression-editor.component.scss']
})
export class ProgressionEditorComponent implements OnInit {
  
  progression:Progression;

  constructor(  
    private progService:ProgressionsService,
    private globalSelections:GlobalSelectionsService,
    private modalService:SuiModalService
   ) {  }

  ngOnInit() {
    this.progression = this.globalSelections.selectedProgression;
    this.globalSelections.selectedProgressionEmitter.subscribe( p => {
      this.progression = p;
     } );
  }
  // addin part
  handlePartChange( part:ProgressionPart ):void {
    this.progression.parts[ part.index ] = part;
    // TODO send change to service
  }
  addPart():void {
    this.progression.parts.push( this.progression.duplicatePrevPart() );
    this.progression.reIndexParts();
    // TODO send add to service
  }
  // deleting part
  handleDeleteRequest( part:ProgressionPart ):void {
    // show modal
    this.modalService.open( new ConfirmModal( "Delete Part", 
      "Are you sure you want to delete this part. This action can not be undone.",
      ModalSize.Mini ))
      .onApprove( ()=> {
        this.removePart( part );
      })
      /*.onDeny( ()=>{

      });*/
  }
  removePart( part:ProgressionPart ):void {
    let pi:number = this.progression.parts.findIndex( p =>  part.index==p.index );
    this.progression.parts.splice( pi, 1 );
    // reindex
    pi = 0;
    this.progression.parts.map( p => { p.index = pi; pi++; return p; });
  }
  

} 
