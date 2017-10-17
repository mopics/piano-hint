import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

// sui
import {SuiDropdownModule} from 'ng2-semantic-ui';
// models
import { Chords, Notes, Note } from '../services';
import { Progression, ProgressionPart } from '../services';
// service
import { ProgressionsService } from '../services';

@Component({
  selector: 'app-progression-editor',
  templateUrl: './progression-editor.component.html',
  styleUrls: ['./progression-editor.component.scss']
})
export class ProgressionEditorComponent implements OnInit {
  
  progression:Progression = Progression.blank();
  notes:Note[] = [];// new Note(Notes[0]), new Note(Notes[1]), Notes[2], Notes[3], Notes[4], Notes[5],
                     // Notes[6], Notes[7], Notes[8], Notes[9], Notes[10], Notes[11] ];

  constructor( 
    private router:Router, 
    private progService:ProgressionsService,
    private route: ActivatedRoute,
    private location:Location,
    private dropdown:SuiDropdownModule
   ) { 
      for( let i:number=0; i<12; i++ ){
        this.notes.push( new Note( i ) );
      };
   }

  ngOnInit() {
    // init key dropdown
    // get id-param
    this.route.paramMap
    .switchMap( (params:ParamMap) => this.progService.getProgression(+params.get('id')))
    .subscribe( progression => {
      this.progression = progression;
      this.progression.reIndexParts();
      console.log('foo');
     } );
  }
  handlePartChange( part:ProgressionPart ):void {
    this.progression.parts[ part.index ] = part;
  }
  addPart():void {
    this.progression.parts.push( this.progression.duplicatePrevPart() );
    this.progression.reIndexParts();
  }

} 
