import { clone } from 'ramda/src/';

export enum Notes { C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B }
export enum Scales { Major, Minor };
export enum Chords { I, II, III, IV, V, VI, VII };
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
}
export class Scale {
    private _index:number;
    private _name:string;
    midiNotes:Note[];
    harmonicMinorMidiNotes:Note[];
    melodicMinorMidiNotes:Note[];

    steps:number[];
    harmonicMinorSteps:number[];
    melodicMinorSteps:number[];

    constructor( index:number){
        this._index = index;
        this._name = Scales[this._index];
     }
    get name():string { return this._name; }
    set name( s:string ){
        this._name = s;
        this._index = Scales[s];
    }
    get index():number { return this._index; }
    set index( i:number ) {
        this._name = Scales[i];
        this._index = i;
    }
    createSteps():void{
        if( this._index===Scales.Major ) {
            this.steps =                [1,0,1,0,1,1,0,1,0,1,0,1];
        } else if( this._index===Scales.Minor ){
            this.steps =                [1,0,1,1,0,1,0,1,1,0,1,0];
            this.harmonicMinorSteps =   [1,0,1,1,0,1,0,1,1,0,0,1];
            this.melodicMinorSteps  =   [1,0,1,1,0,1,0,1,0,1,0,1];
        }
    }
    createMidiNotes( root:Note ):void {
        // create natural minor/major midi notes
        this.midiNotes = this._createMidiNotes( root, this.steps );
        // create seperate extra minor midi notes
        if( this.harmonicMinorSteps.length>0){
            this.harmonicMinorMidiNotes = this._createMidiNotes( root, this.harmonicMinorSteps );
            this.melodicMinorMidiNotes = this._createMidiNotes( root, this.harmonicMinorSteps );
        }
    }
    private _createMidiNotes( root:Note, steps:number[] ):Note[] {
        let midiNotes = new Array<Note>();
        // 1. Set first root in midi-range
        let mIdx:number = MidiRange[0]+root.index;
        // 2. loop thru midi-range and push midi-notes using _steps
        let stepIdx:number = 0;
        let noteIdx:number = root.index;
        let octave:number = 0;
        for( let i:number=mIdx; i<MidiRange[1]; i++ ){
            if( steps[stepIdx]===1 ){
                octave = Math.floor(i/12)-2;
                midiNotes.push( new Note( noteIdx, octave, i ) );
            }
            stepIdx ++;
            if( stepIdx > 12 ){ stepIdx = 0; }
            noteIdx ++;
            if( noteIdx > 12+root.index ) { noteIdx = root.index; }
        }
        return midiNotes;
    }
    clone():Scale{ return new Scale(this._index);}
}

export class Chord{

    private _name:string;

    constructor( private _index:number ){
        this._name = Chords[this._index];
    }
    get index():number { return this._index; }
    get name():string { return this._name; }
    set index( i:number ) {
        this._name = Chords[i];
        this._index = i;
    }
    set name( nm:string ) {
        this._index = Chords[nm];
        this._name = nm;
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