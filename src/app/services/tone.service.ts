import { Injectable, EventEmitter } from '@angular/core';
//import { Tone } from 'tone';
declare var require: any;
var Tone = require("Tone");

import { Note, Notes, Chord, Chords, Scale, Scales, Progression, ProgressionPart, ChordPattern, ChordPatternsService } from './';


export class SequenceEvent {
	note:string;
	octave:number;
	fullName:string;
}
export class TickNote {
	note:string;
	velocity:number;
	length:string;
}
export class Ticks {
	ticks:TickNote[][] = new Array<TickNote[]>();
}
@Injectable()
export class ToneService {

	synth:any;
	sampleNotes:Object = {
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
	piano:any;
	sequencer:any;
	chordPatterns:ChordPattern[] = new Array<ChordPattern>();
	selectedChordPattern:ChordPattern;
	progression:Progression;
	currPart:number;
	currMeasure:number;
	sequenceEmitter:EventEmitter<SequenceEvent> = new EventEmitter();
	score:Ticks;

  	constructor(private cp:ChordPatternsService ) { 
		//create a synth and connect it to the master output (your speakers)
		this.synth = new Tone.Synth().toMaster();
		this.initPiano();
		this.loadChordPatterns();
	}
	private initPiano():void{
		this.piano = new Tone.Sampler(
			this.sampleNotes, {
			'release' : 1,
			'baseUrl' : './assets/audio/salamander/'
		}).toMaster();
	}
	private loadChordPatterns():void{
		this.cp.getPatterns().then( patterns =>{
			 this.chordPatterns = patterns;
		 } );
	}
	private initRawPartsSequencer():void {
		let numSamples:number = 0;
		for( let itm in this.sampleNotes ){ numSamples++; }
    	this.sequencer = new Tone.Sequence( (time, col) => {
			let rootOctave = this.selectedChordPattern.root[col];
			let chord = this.progression.parts[this.currPart].chord;
			if (rootOctave>0){
				let note:Note = chord.midiNotes[0];
				this.playNote( note, rootOctave );
			}
			let thirdOctave = this.selectedChordPattern.third[col];
			if (thirdOctave>0){
				let note:Note = chord.midiNotes[1];
				this.playNote( note, thirdOctave );
			}
			let fifthOctave = this.selectedChordPattern.fifth[col];
			if (fifthOctave>0){
				let note:Note = chord.midiNotes[2];
				this.playNote( note, fifthOctave );
			}
			let seventhOctave = this.selectedChordPattern.seventh[col];
			if (seventhOctave>0){
				let note:Note = chord.midiNotes[3];
				this.playNote( note, seventhOctave );
			}
			if( col===this.selectedChordPattern.ticks.length-1 ){
				this.currMeasure ++;
				if( this.currMeasure===this.progression.parts[this.currPart].measures ){
					this.currMeasure = 0;
					this.currPart ++;
					if( this.currPart===this.progression.parts.length){
						this.currPart = 0;
					}
					this.selectedChordPattern = this.chordPatterns[ this.progression.parts[this.currPart].chordPattern ];
				}
			}

		}, this.selectedChordPattern.ticks, "8n");
	}
	private initBuildScoreSequencer():void {
		this.sequencer = new Tone.Sequence( (time, col) => {
			this.score.ticks[col].forEach( t => {
				this.piano.triggerAttackRelease( t.note, "4n"); // t.length );
			})

		}, this.score.ticks.map( (v,i)=> i ), "4n");
	}
	playNote( note:Note, octave:number, length:string='4n',  ):void {
		//play a middle 'C' for the duration of an 8th note
			// this.synth.triggerAttackRelease( note, "8n");
			let pn:Note = note.clone();
			pn.octave = octave;
			this.piano.triggerAttackRelease(pn.getFullName(),length );
	}
	playChord( chord:Chord, octave:number, length:string = "8n" ):void {
		for( let i=0; i<3; i++ ){
			let pn:Note = chord.midiNotes[i].clone();
			pn.octave = octave;
			this.piano.triggerAttackRelease( pn.getFullName(), length );
		}
	}
	playScale( scale:Scale, length:string = '4n' ):void {
			var n:Note = scale.midiNotes[0];
			var numNotes:number = scale.noteCount;
			var c:number = 0;
			var id = setInterval( ()=>{
				n.octave += 2;
				this.piano.triggerAttackRelease( n.getFullName(), length );
				n = scale.midiNotes[++c];
				if( c===numNotes*2+1 ){
					clearInterval(id);
				}
			}, 200 );
	}

	buildProgression( p:Progression ):void {
		this.score = new Ticks();
		p.parts.forEach( part=>{
			let pattern:ChordPattern = this.chordPatterns[part.chordPattern];
			for( let m:number=0; m<part.measures; m++ ){
				pattern.ticks.forEach( i=>{
					let tickNotes:TickNote[] = new Array<TickNote>();
					if( pattern.root[i]>0){
						let t:TickNote = new TickNote();
						t.note = part.chord.midiNotes[0].name+pattern.root[i];
						t.length = '8n';
						t.velocity = pattern.rootVel[i];
						tickNotes.push( t );
					}
					if( pattern.third[i]>0){
						let t:TickNote = new TickNote();
						t.note = part.chord.midiNotes[1].name+pattern.third[i];
						t.length = '8n';
						t.velocity = pattern.thirdVel[i];
						tickNotes.push( t );
					}
					if( pattern.fifth[i]>0){
						let t:TickNote = new TickNote();
						t.note = part.chord.midiNotes[2].name+pattern.fifth[i];
						t.length = '8n';
						t.velocity = pattern.fifthVel[i];
						tickNotes.push( t );
					}
					if( pattern.seventh[i]>0){
						let t:TickNote = new TickNote();
						t.note = part.chord.midiNotes[3].name+pattern.seventh[i];
						t.length = '8n';
						t.velocity = pattern.seventhVel[i];
						tickNotes.push( t );
					}
					this.score.ticks.push( tickNotes );
				});
			}
		});
	}
  	playProgression( p:Progression ):void{
		// var tick:number = setInterval( playTick, 100 );
		this.progression = p;
		this.currPart = 0;
		this.selectedChordPattern = this.chordPatterns[ this.progression.parts[this.currPart].chordPattern ];
		this.currMeasure = 0;
		this.buildProgression(p);
		this.initBuildScoreSequencer();
		Tone.Transport.start();
		this.sequencer.start();
	}
	pauseProgression():void {
		this.sequencer.stop();
	}
	stopProgression():void {
		this.sequencer.stop();
	}

}


