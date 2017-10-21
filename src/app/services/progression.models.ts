import { Notes, Scales, Chords, Note, Key, Chord, Scale } from './note.models';

export class ProgressionPart {
     index:number = 0;
     root:Note;
     scale:Scale;
     chord:Chord;
     measures:number;

     constructor( index:number, root:Note, chord:Chord, scale:Scale, measures:number ){
         this.index = index;
         this.root = root;
         this.chord = chord;
         this.scale = scale;
         this.measures = measures;
     }
     get measuresStr():string{ return `${this.measures}`; }
     set measuresStr( s:string ){ this.measures = parseInt( s ); 
    }
     clone():ProgressionPart {
         let pp =  new ProgressionPart( 
             this.index,
             this.root.clone(), 
             this.chord.clone(), 
             this.scale.clone(),
             this.measures );
        pp.chord.midiNotes = Note.createMidiNotes( pp.root, pp.chord.steps );
        pp.scale.midiNotes = Note.createMidiNotes( pp.root, pp.scale.steps );
        return pp;
        
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
        const c = new Chord( Chords.Major );
        const p = new ProgressionPart( 0, t, c, s, 1 ); 
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