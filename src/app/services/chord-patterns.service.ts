import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Notes, Scales, Chords, Note, Key, Chord, Scale } from './note.models';
import { Progression, ProgressionPart, ChordPattern } from './progression.models';

@Injectable()
export class ChordPatternsService {

  private apiUrl:string = 'api/chordpatterns';
  private headers:Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  getPatterns():Promise<ChordPattern[]> {
    return this.http.get(this.apiUrl)
    .toPromise()
    .then( res =>{
      let ps = res.json();
      let psC = new Array<ChordPattern>();
      ps.forEach( p => {
        let np:ChordPattern = new ChordPattern();
        np.index = p.index;
        np.name = p.name;
        np.ticks = p.ticks;
        np.root = p.root;
        np.rootVel = p.rootVel;
        np.rootLength = p.rootLength;
        np.third = p.third;
        np.thirdVel = p.third;
        np.thirdLength = p.thirdLength;
        np.fifth = p.fifth;
        np.fifthVel = p.fifthVel;
        np.fifthLength = p.fifthLength;
        np.seventh = p.seventh;
        np.seventhVel = p.seventhVel;
        np.seventhLength = p.seventhLength;
        psC.push( np );
      })
      return psC;
    }  )
    .catch( this.handleError ); 
  }

  private handleError( error:any ):Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
