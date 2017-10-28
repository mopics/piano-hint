import { Notes, Scales, Chords, Note, Key, Chord, Scale } from './note.models';
import { TickNote } from './tone.service';


export class TimeSignature {
    parts:number;
    ofLength:number;
    constructor( parts:number, ofLength:number ){ this.parts = parts; this.ofLength = ofLength; }
}
export class Pattern {
    time:TimeSignature;
    ticks:TickNote[][];
    _posX:number=0;
    _width:number=0;

    constructor( time:TimeSignature, ticks:TickNote[][] ){ 
        this.time = time; 
        this.ticks = ticks;
    }
    clone():Pattern {
        let t:TimeSignature = new TimeSignature( this.time.parts, this.time.ofLength );
        let ts:any = new Array<Object[]>();
        this.ticks.forEach( a=>{
            ts.push( new Array<TickNote>() );
            a.forEach( t=>{
                ts[ts.length-1].push( { name:t.name, octave:t.octave, length:t.length, velocity:t.velocity });
            });
        });
        return new Pattern( t, ts );
    }
    logData():string {
        let ticksStr:string = '[';
        this.ticks.forEach( t=>{
            ticksStr += '[';
            t.forEach( n=> {
                ticksStr += `{name:"${n.name}", octave:${n.octave}, length:"${n.length}", velocity:${n.velocity}},`;
            });
            ticksStr += '],';
        });
        ticksStr += ']';
        return `{
            ticks:${ticksStr},
            time:{parts:${this.time.parts}, ofLength:${this.time.ofLength}}
        }`;
    }
    get width():number { return this._width; }
    get posX():number { return this._posX; }
    set width( w:number ) { this._width = w; }
    set posX( x:number ){ this._posX = x; }
}
export class ProgressionPart {
     index:number = 0;
     root:Note;
     scale:Scale;
     chord:Chord;
     measures:number;
     chordPattern:number;
     pattern:Pattern;

     constructor( index:number, root:Note, chord:Chord, scale:Scale, measures:number, chordPattern:number, pattern:Pattern ){
         this.index = index;
         this.root = root;
         this.chord = chord;
         this.scale = scale;
         this.measures = measures;
         this.chordPattern = chordPattern;
         this.pattern = pattern;
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
             this.measures,
            this.chordPattern,
            this.pattern.clone() );
        pp.chord.midiNotes = Note.createMidiNotes( pp.root, pp.chord.steps );
        pp.scale.midiNotes = Note.createMidiNotes( pp.root, pp.scale.steps );
        return pp;
        
     }
}
export class Progression {
    public id:number;
    public name:string;
    public parts:ProgressionPart[];
    public bpm:number;

    constructor( id:number, name:string, bpm:number = 120 ){
        // create initial 
        this.id = id;
        this.name = name;
        this.parts = new  Array<ProgressionPart>();
        this.bpm = bpm;
    }
    addBlankPart():void{
        const t = new Note(Notes.C,1);
        const s = new Scale( Scales.Ionian );
        const c = new Chord( Chords.Major );
        const pa = new Pattern( new TimeSignature(4,4), [] );
        const p = new ProgressionPart( 0, t, c, s, 1, 0, pa ); 
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
    logData():string {

        this.reIndexParts();

        let partsStr:string= '';
        this.parts.forEach( part=>{
            partsStr += `{
                index:${part.index},
                root:${part.root.logData()},
                scale:${part.scale.logData()},
                chord:${part.chord.logData()},
                measures:1,
                chordPattern:0,
                pattern:${part.pattern.logData()}
            },`
        });
        return` {
            id:${this.id},
            name:"${this.name}",
            bpm:${this.bpm},
            parts:[
                ${partsStr}
            ]
        }`
    }
}