import { Component, NgZone } from '@angular/core';
import { GlobalSelectionsService, ToneService } from './services';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'piano-hint';
  loading: boolean = true;
  loadingMessage:string = 'Loading Samples...';
  progressionsLoaded:boolean = false;
  pianoReady:boolean = false;
  appBusy:boolean = false;

  constructor( private gss:GlobalSelectionsService, private ts:ToneService, private ngZone:NgZone ){}

  ngOnInit() {
    this.gss.selectedProgressionEmitter.subscribe( ()=>{
      this.progressionsLoaded = true;
      this.checkFullyLoaded();
    });
    this.gss.appBusyEmitter.subscribe( (b)=> { this.appBusy = b; this.loadingMessage = this.gss.appBusyMessage; } );
    this.ts.fullyLoaded.subscribe( ()=>{
      this.pianoReady = true;
      this.checkFullyLoaded();
    });
    this.ts.init();
  }
  checkFullyLoaded():void {
    if( this.progressionsLoaded && this.pianoReady ) {
      this.ngZone.run( ()=>{
        this.loading = false;
      });
    }
  }
  logSongData():void {
    console.log(  this.gss.selectedProgression.logData() );
  }
  toMidi():void {
    this.gss.selectedProgression.toMidi();
  }
}
