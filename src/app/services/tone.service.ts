import { Injectable } from '@angular/core';
//import { Tone } from 'tone';
declare var require: any;
var Tone = require("Tone");

import { Note, Notes, Chord, Chords, Scale, Scales, Progression, ProgressionPart } from './';

@Injectable()
export class ToneService {

  synth:any;
  piano:any;

  constructor() { 
    //create a synth and connect it to the master output (your speakers)
    this.synth = new Tone.Synth().toMaster();
    this.piano = new Tone.Sampler({
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
		}, {
			'release' : 1,
			'baseUrl' : './assets/audio/salamander/'
		}).toMaster();
    
  }
  playNote(note:string, length:string='4n' ):void {
    //play a middle 'C' for the duration of an 8th note
	// this.synth.triggerAttackRelease( note, "8n");
	this.piano.triggerAttackRelease(note,length);
  }
  playChord( chord:Chord, length:string = "8n" ):void {
	if( chord.index===Chords.Dom7 || chord.index===Chords.FullDim || chord.index===Chords.HalfDim ){
		for( let i=0; i<4; i++ ){
			chord.midiNotes[i].octave += 2;
			this.piano.triggerAttackRelease( chord.midiNotes[i].getFullName(), length );
		}
	} else {
		for( let i=0; i<3; i++ ){
			chord.midiNotes[i].octave += 2;
			this.piano.triggerAttackRelease( chord.midiNotes[i].getFullName(), length );
		}
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

  playProgression( p:Progression ):void{
	// var tick:number = setInterval( playTick, 100 );
  }

}

