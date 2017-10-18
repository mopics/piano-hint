import { clone } from 'ramda/src/';

export enum Notes { C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B }
export enum Scales { Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian, HarmonicMinor, MelodicMinor };
export const ScaleSteps:number[][] = [
    [1,0,1,0,1,1,0,1,0,1,0,1], // Ionian
    [1,0,1,1,0,1,0,1,0,1,1,0], // Dorian
    [1,1,0,1,0,1,0,1,1,0,1,0], // Phrygian
    [1,0,1,0,1,1,0,1,0,1,1,0], // Myxolydian
    [1,0,1,1,0,1,0,1,1,0,1,0], // Aeolian
    [1,1,0,1,0,1,1,0,1,0,1,0], // Locrian
    [1,0,1,1,0,1,0,1,1,0,0,1], // HarmonicMinor
    [1,0,1,1,0,1,0,1,0,1,0,1]  // MelocicMinor
];
export enum Chords { Major, Minor, Dom7, HalfDim, FullDim };
export const ChordSteps:number[][] = [
    [1,0,0,0,1,0,0,1,0,0,0,0], // Major
    [1,0,0,1,0,0,0,1,0,0,0,0], // Minor
    [1,0,0,0,1,0,0,1,0,0,1,0], // Dom7
    [1,0,0,1,0,0,1,0,0,0,1,0], // HalfDim
    [1,0,0,1,0,0,1,0,0,1,0,0], // FullDim
];
export enum MajorChords { I, ii, iii, IV, V, vi, viiHD };
export enum MinorChords { i, iiHD, III, iv, V, VII, viiFD };
export const MidiRange:number[] = [ 35, 127 ];

export class Note {
    static raised2flat:Object =  { "C#":"Db", "D#":"Eb","F#":"Gb","G#":"Ab","A#":"Bb" };
    octave:number;
    midiIndex:number;
    private _name:string;
    degree:number;
    whiteKey:boolean = true;
    xPos:number = 0;

    constructor( private _index:number,octave:number = 1,midiIndex:number = -1 ){
        this._name = Notes[this._index];
        this.octave = octave;
        if( this.midiIndex < 0 )
            this.midiIndex = this.octave*12+this._index;
        if( _index<4 && _index%2 ){  this.whiteKey = false; }
        if( _index>5 && _index%2===0 ) { this.whiteKey = false; }
    };

    set index( i:number ){
        this._index = i;
        this._name = Notes[this._index];
    }
    get index():number{ return this._index; }
    get name():string { return this._name; }
    set name( nm:string ){ 
        this._index = Notes[nm];
        this._name = nm;
    }
    

    getFullName():string {
        return `${this._name}${this.octave}`;
    }

    clone():Note{
        return new Note( this._index, this.octave, this.midiIndex );
    }
    static getNotesFromRoot( root:string, octaves:number, addRootKeyAtEnd:boolean ):Note[] {
        let r = new Note(Notes[root],1);
        let notes = new Array<Note>();
        notes.push(r);
        let i:number = r.index+1;
        while( notes.length<12 ){
            notes.push( new Note( i, 1 ) );
            i++;
            if( i===12 ){ i=0; }
        }
        let o:number = 1;
        let nnotes = notes;
        while( o<octaves ){
            o++;
            nnotes = nnotes.concat( notes.map(n=>new Note(n.index,o) ) );
        }
        if( addRootKeyAtEnd ){
            if( !r.whiteKey )
                nnotes.push( new Note( r.index-1, o ) );
            nnotes.push( new Note( r.index, o+1) );
        }

        return nnotes;
    }
    static toFlat( n:string ):string {
        if( n[1]==="#" ){
            return Note.raised2flat[n];
        }
        return n;
    }
    static createMidiNotes( root:Note, steps:number[] ):Note[] {
        // 1. Set first root in midi-range
        let mIdx:number = MidiRange[0]+root.index;
        // 2. loop thru midi-range and push midi-notes using _steps , TODO: use functional programming ?? yep already done sort off
        let stepIdx:number = 0;
        let noteIdx:number = root.index;
        let octave:number = 0;
        let note:Note = new Note(0);
        let i:number = MidiRange[0];
        return Array( MidiRange[1]-MidiRange[0]).fill(new Note(0)).map(
            note => {
                let midiNote = new Note(noteIdx);
                if( steps[stepIdx]===1 )
                    midiNote.octave = Math.floor(i/12)-2;
                else
                    midiNote.octave = -1; // gets filtered out later on
                
                stepIdx ++;
                if( stepIdx === 12 ){ stepIdx = 0; }
                noteIdx ++;
                if( noteIdx === 12 ) { noteIdx = 0; }
                i++;
                return midiNote;
            }
        ).filter( midiNote => midiNote.octave>-1 );
    }
}
export class Scale {
    private _name:string;
    midiNotes:Note[];
    steps:number[];

    constructor( private _index:number){
        this._name = Scales[this._index];
        this.steps = ScaleSteps[this._index];
     }
    get name():string { return this._name; }
    set name( s:string ){
        this._name = s;
        this._index = Scales[s];
        this.steps = ScaleSteps[this._index];
    }
    get index():number { return this._index; }
    set index( i:number ) {
        this._name = Scales[i];
        this._index = i;
        this.steps = ScaleSteps[this._index];
    }
    clone():Scale{ return new Scale(this._index);}
}

export class Chord{

    private _name:string;
    midiNotes:Note[];
    steps:number[];

    constructor( private _index:number ){
        this._name = Chords[this._index];
        this.steps = ChordSteps[this._index];
    }
    get index():number { return this._index; }
    get name():string { return this._name; }
    set index( i:number ) {
        this._name = Chords[i];
        this._index = i;
        this.steps = ChordSteps[this._index];
    }
    set name( nm:string ) {
        this._index = Chords[nm];
        this._name = nm;
        this.steps = ChordSteps[this._index];
    }

    clone():Chord {
        return new Chord(this._index);
    }
}

export class Key {
    tonic:Note;
    scale:Scale;

    constructor( tonic:Note, scale:Scale ){
        this.tonic = tonic;
        this.scale = scale;
    }

    clone():Key{
        return new Key( this.tonic.clone(), this.scale.clone() );
    }

}