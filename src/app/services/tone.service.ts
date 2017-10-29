import { Injectable, EventEmitter } from '@angular/core';
//import { Tone } from 'tone';
declare var require: any;
var Tone = require("Tone");
import { Map } from 'immutable';

import { Note, Notes, Chord, Chords, Scale, Scales, Progression, ProgressionPart, Pattern } from './';


export class SequenceEvent {
	notes:TickNote[] = new Array<TickNote>();
	partIndex:number = -1;
}
export class TickNote {
	name:string;
	octave:number;
	velocity:number;
	length:number;
	posX:number = 0;
	posY:number = 0;
	fill:string = "#f00";
	col:number = 0;
	width:number = 30;

	get fullName():string { return this.name+this.octave; }
	clone():TickNote { 
		let tn:TickNote = new TickNote();
		tn.name = this.name;
		tn.octave = this.octave;
		tn.velocity = this.velocity;
		tn.length = this.length;
		return tn;
	}
}
export class Ticks {
	ticks:SequenceEvent[] = new Array<SequenceEvent>();
}
const sampleNotes:Object = {
	'A0' : 'A0.[mp3|ogg]',
	'C1' : 'C1.[mp3|ogg]',
	'D#1' : 'Ds1.[mp3|ogg]',
	'F#1' : 'Fs1.[mp3|ogg]',
	'A1' : 'A1.[mp3|ogg]',
	'C2' : 'C2.[mp3|ogg]',
	'D#2' : 'Ds2.[mp3|ogg]',
	'F#2' : 'Fs2.[mp3|ogg]',
	'A2' : 'A2.[mp3|ogg]',
	'C3' : 'C3.[mp3|ogg]',
	'D#3' : 'Ds3.[mp3|ogg]',
	'F#3' : 'Fs3.[mp3|ogg]',
	'A3' : 'A3.[mp3|ogg]',
	'C4' : 'C4.[mp3|ogg]',
	'D#4' : 'Ds4.[mp3|ogg]',
	'F#4' : 'Fs4.[mp3|ogg]',
	'A4' : 'A4.[mp3|ogg]',
	'C5' : 'C5.[mp3|ogg]',
	'D#5' : 'Ds5.[mp3|ogg]',
	'F#5' : 'Fs5.[mp3|ogg]',
	'A5' : 'A5.[mp3|ogg]',
	'C6' : 'C6.[mp3|ogg]',
	'D#6' : 'Ds6.[mp3|ogg]',
	'F#6' : 'Fs6.[mp3|ogg]',
	'A6' : 'A6.[mp3|ogg]',
	'C7' : 'C7.[mp3|ogg]',
	'D#7' : 'Ds7.[mp3|ogg]',
	'F#7' : 'Fs7.[mp3|ogg]',
	'A7' : 'A7.[mp3|ogg]',
	'C8' : 'C8.[mp3|ogg]'
};

@Injectable()
export class ToneService {

	synth:any;
	
	piano:any;
	sequencer:any;
	progression:Progression;
	currPart:number;
	currMeasure:number;
	sequenceEmitter:EventEmitter<SequenceEvent> = new EventEmitter();
	score:Ticks;
	paused:boolean = false;

	samplesLoaded:boolean = false;
	fullyLoaded:EventEmitter<boolean> = new EventEmitter();

  	constructor( ) { 
	}

	public init():void {
		//create a synth and connect it to the master output (your speakers)
		this.synth = new Tone.Synth().toMaster();
		this.initPiano();
	}
	private initPiano():void{
		this.piano = new Tone.Sampler(
			sampleNotes, {
			'release' : 1,
			'onload': ()=> { 
				this.samplesLoaded = true; 
				this.checkFullyLoaded(); 
			},
			'baseUrl' : './assets/audio/salamander/'
		}).toMaster();
	}
	private checkFullyLoaded():void {
		if( this.samplesLoaded ){
			this.fullyLoaded.emit( true );
		}
	}
	
	private initBuildScoreSequencer():void {
		this.sequencer = new Tone.Sequence( (time, col) => {
			this.score.ticks[col].notes.forEach( t => {
				this.piano.triggerAttackRelease( t.fullName, this.noteLength2Sec(t.length), time, t.velocity ); // t.length );
				//this.piano.triggerAttack( t.fullName, t.length, t.velocity);
				//this.piano.triggerRelease( t.fullName, time + duration);
			});
			this.sequenceEmitter.emit( this.score.ticks[col] );

		}, this.score.ticks.map( (v,i)=> i ), "16n");
	}
	triggerAttackRelease( note:string, length:string, velocity:number=1, time:number=0 ){
		this.piano.triggerAttackRelease( note, length, time, velocity );
	}
	triggerAttack( note:string, velocity:number = 1 ){
		this.piano.triggerAttack( note, velocity );
	}
	triggerRelease( note:string ):void {
		this.piano.triggerRelease( note );
	}
	playNote( note:Note, octave:number, length:string='4n',  ):void {
		//play a middle 'C' for the duration of an 8th note
			// this.synth.triggerAttackRelease( note, "8n");
			let pn:Note = note.clone();
			pn.octave = octave;
			this.piano.triggerAttackRelease(pn.fullName,length );
	}
	playChord( chord:Chord, octave:number, length:string = "8n" ):void {
		for( let i=0; i<3; i++ ){
			let pn:Note = chord.midiNotes[i].clone();
			pn.octave = octave;
			this.piano.triggerAttackRelease( pn.fullName, length );
		}
	}
	playScale( scale:Scale, length:string = '4n' ):void {
			var n:Note = scale.midiNotes[0];
			var numNotes:number = scale.noteCount;
			var c:number = 0;
			var id = setInterval( ()=>{
				n.octave += 2;
				this.piano.triggerAttackRelease( n.fullName, length );
				n = scale.midiNotes[++c];
				if( c===numNotes*2+1 ){
					clearInterval(id);
				}
			}, 200 );
	}

	buildProgression( p:Progression ):void {
		this.score = new Ticks();
		p.parts.forEach( part=>{
			let pattern:Pattern = part.pattern;
			for( let m:number=0; m<part.measures; m++ ){
				pattern.ticks.forEach( (tickNotes,i)=>{

					let evt:SequenceEvent = new SequenceEvent();
					// set partIndex of every first note of new part
					tickNotes = tickNotes.map( tn=> {
						let tnn:TickNote = new TickNote();
						tnn.name = tn.name;
						tnn.octave = tn.octave;
						tnn.length = tn.length;
						tnn.velocity = tn.velocity;
						return tnn;
					});
					if( i===0 ){
						evt.partIndex = part.index;
					}
					evt.notes = tickNotes;
					this.score.ticks.push( evt );
				});
			}
		});
	}
  	playProgression( p:Progression ):void{
		  if( this.paused ){
			  Tone.Transport.start();
			  this.paused = false;
			  return;
		  }
		// var tick:number = setInterval( playTick, 100 );
		this.progression = p;
		this.setBPM( p.bpm );
		this.currPart = 0;
		this.currMeasure = 0;
		this.buildProgression(p);
		this.initBuildScoreSequencer();
		Tone.Transport.start();
		this.sequencer.start();
		this.paused = false;
	}
	pauseProgression():void {
		Tone.Transport.pause();
		this.paused = true;
	}
	stopProgression():void {
		Tone.Transport.stop();
		if( this.sequencer )
			this.sequencer.stop();
		this.paused = false;
	}
	setBPM( bpm:number ){ 
		Tone.Transport.bpm.value = bpm;
		if( this.progression ){
			this.progression.bpm = bpm;
		}
	}
	getBPM():number { return Tone.Transport.bpm.value; }
	noteLength2Ms( l:number ):number{
		return this.noteLength2Sec(l)*1000;
	}
	noteLength2Sec( l:number ):number {
		// l = num 16n 
		l /= 4; // l = num beats
		let bpm:number = Tone.Transport.bpm.value;
		// bpm = beats per 60 seconds
		let secPerBeat = 60/bpm;

		return l*secPerBeat;
	}
	get context():any { return Tone.context; } // return AudioContext

}


