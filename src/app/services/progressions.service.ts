"use strict";

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Notes, Scales, Chords, Note, Key, Chord, Scale } from './note.models';
import { Progression, ProgressionPart } from './progression.models';

@Injectable()
export class ProgressionsService {

  private progressionsUrl:string = 'api/progressions';
  private headers:Headers = new Headers({'Content-Type': 'application/json'});

  constructor( private http:Http ) { }

  getProgressions():Promise<Progression[]>{
    return this.http.get(this.progressionsUrl)
    .toPromise()
    .then( res =>{
      let ps = res.json();
      let psC = new Array<Progression>();
      ps.forEach( prog => {
        let parts = prog.parts;
        let partsC = new Array<ProgressionPart>();
        parts.forEach( part => {  
          let root = new Note( part.root.index );
          let scale = new Scale(part.scale.index);
          let chord = new Chord( part.chord.index );
          partsC.push( new ProgressionPart( part.index, root, chord, scale, part.measures ) )
        } );
        let progC = new Progression( prog.id, prog.name );
        progC.parts = partsC;
        psC.push( progC );
      })
      return psC;
    }  )
    .catch( this.handleError );
  }
  getProgression(id):Promise<Progression> {
    const url = `${this.progressionsUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then( res => {
          let prog = res.json();
          let parts = prog.parts;
          let partsC = new Array<ProgressionPart>();
          parts.forEach( part => {  
            let root = new Note( part.root.index );
            let scale = new Scale(part.scale.index);
            let chord = new Chord( part.chord.index );
            partsC.push( new ProgressionPart( part.index, root, chord, scale, part.measures ) )
          } );
          let progC = new Progression( prog.id, prog.name );
          progC.parts = partsC;
          return progC;
         } )
        .catch( this.handleError );
  }
  update(prog: any): Promise<Progression> {
    const url = `${this.progressionsUrl}/${prog.id}`;
    return this.http
      .put(url, JSON.stringify(prog), {headers: this.headers})
      .toPromise()
      .then(() => prog)
      .catch(this.handleError);
  }
  create(name: string): Promise<Progression> {
    return this.http
      .post(this.progressionsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Progression)
      .catch(this.handleError);
  }
  delete(id: number): Promise<void> {
      const url = `${this.progressionsUrl}/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  private handleError( error:any ):Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }

}
