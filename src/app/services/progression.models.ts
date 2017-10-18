import { Notes, Scales, Chords, Note, Key, Chord, Scale } from './note.models';

export class ProgressionPart {
     index:number = 0;
     key:Key;
     chord:Chord;
     measures:number;

     constructor( key:Key, chord:Chord, measures:number ){
         this.key = key;
         this.chord = chord;
         this.measures = measures;
     }
     get measuresStr():string{ return `${this.measures}`; }
     set measuresStr( s:string ){ this.measures = parseInt( s ); 
    }
     clone():ProgressionPart {
         return new ProgressionPart( 
             this.key.clone(), 
             this.chord.clone(), 
             this.measures );
     }
}
export class Progression {
    public id:number;
    public name:string;
    public parts:ProgressionPart[];

    constructor( id:number, name:string ){
        // create initial 
        this.id = id;
        this.name = name;
        this.parts = new  Array<ProgressionPart>();
    }
    addBlankPart():void{
        const t = new Note(Notes.C,1);
        const s = new Scale( Scales.Ionian );
        const k = new Key( t, s );
        const c = new Chord( Chords.Major );
        const p = new ProgressionPart( k, c, 1 ); 
        this.parts.push( p );
    }
    duplicatePrevPart():ProgressionPart{
        const pp = this.parts[this.parts.length-1];
        const p = pp.clone();
        return p;
    }
    reIndexParts():void {
        let i=0;
        this.parts.forEach( part => { part.index = i; i++; } )
    }
    static blank():Progression {
        return new Progression( 0, 'unititled' );
    }
}