import { Notes, Scales, Chords, Note, Key, Chord, Scale } from './note.models';
import { TickNote } from './tone.service';

declare var require: any;
var Midi = require('jsmidgen');


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
                ticksStr += `{name:"${n.name}", octave:${n.octave}, length:${n.length}, velocity:${n.velocity}},`;
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
    public startOctave:number;
    public numOctaves:number;

    constructor( id:number, name:string, bpm:number = 120, startOctave:number=2, numOctaves:number = 3 ){
        // create initial 
        this.id = id;
        this.name = name;
        this.parts = new  Array<ProgressionPart>();
        this.bpm = bpm;
        this.startOctave = startOctave;
        this.numOctaves = numOctaves;
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
            startOctave:${this.startOctave},
            numOctaves:${this.numOctaves},
            parts:[
                ${partsStr}
            ]
        }`
    }
    // TODO: write MusicXML export??
    toMusicXML():string {
        let xml:string = `
        <score-partwise version="3.0">
            <part-list>
                <score-part id="P1">
                    <part-name>Piano</part-name>
                    <score-instrument id="P1-I1">
                        <instrument-name>Acoustic Grand Piano</instrument-name>
                    </score-instrument>
                    <midi-instrument id="P1-I1">
                        <midi-channel>2</midi-channel>
                        <midi-program>1</midi-program>
                        <volume>80</volume>
                        <pan>0</pan>
                    </midi-instrument>
                </score-part>
            </part-list>
        `;

        xml += "</score-partwise>";
        return xml;
    }
    toMidi():void{
        let file = new Midi.File();
        let track = new Midi.Track();
        file.addTrack(track);

        track.setTempo( this.bpm );
        // track.setTimeSignature( 4, 4 );
       
        
        let tickStep:number = 32;
        let notes:string[]= Array();
        let durations:string[] = Array();
        let waits:string[] = Array();
        let tick:number = 0;
        let channel:number = 0;

        this.parts.forEach( p=>{
            p.pattern.ticks.forEach( pa=>{
                let i:number = 0;
                pa.forEach( tn=>{
                    if( i===0 )
                        track.addNote( channel, tn.name+tn.octave, Math.round(tn.length*tickStep), tick*tickStep, tn.velocity*10 );
                    else    
                        track.addNote( channel, tn.name+tn.octave , Math.round(tn.length*tickStep), tick*tickStep, tn.velocity*10 );
                });
                tick ++;
            });
        });
        
        // Generate a data URI
        let data = 'data:audio/midi;base64,' + btoa( file.toBytes() ); // file.toBytes().toString('base64');
        console.log( data );

    }
}