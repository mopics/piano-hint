import { Component, OnInit, Output } from '@angular/core';

// routing 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

// models 
import { Progression } from '../services';
// service
import { ProgressionsService, GlobalSelectionsService } from '../services';

@Component({
  selector: 'app-progression-select',
  templateUrl: './progression-select.component.html',
  styleUrls: ['./progression-select.component.css']
})
export class ProgressionSelectComponent implements OnInit {

  progressions:Progression[];
  selectedProgression:Progression;

  constructor(private router:Router, 
    private progService:ProgressionsService,
    private globalSelections:GlobalSelectionsService,
    private route: ActivatedRoute,
    private location:Location,
  ) { }

  ngOnInit() {
    this.progService.getProgressions().then( progressions => {
      this.progressions = progressions;
      //auto select first one
      this.globalSelections.selectProgression( this.progressions[0] );
    }  );
    this.globalSelections.selectedProgressionEmitter.subscribe( p => this.selectedProgression = p.name );
  }
  onSelect( name:string ){
    this.globalSelections.selectProgression( this.progressions.find( p=>p.name===name ) );
  }
  showNewProgressionDialog():void{
    alert("TODO: show new progresssion name input modal");
  }

}
