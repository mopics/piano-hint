import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Chords, Scales } from './';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const progressions = [
        { 
            id: 0, 
            name: "C-minor(I-II-V)",
            parts: [
                { 
                    index:0,
                    root:{
                        index:0,
                        octave:1,
                        name:"C"
                    },
                    scale:{
                        index:Scales.Aeolian,
                        name:"Aeolian"
                    },
                    chord:{
                        index:Chords.Minor,
                        name:"Minor"
                    },
                    measures:1,
                    chordPattern:1
                },
                { 
                    index:1,
                    root:{
                        index:2,
                        octave:1,
                        name:"D"
                    },
                    scale:{
                        index:Scales.Symmetrical_Diminished,
                        name:"Symmetrical Diminished"
                    },
                    chord:{
                        index:Chords.FullDim,
                        name:"FullDim"
                    },
                    measures:1 ,
                    chordPattern:1
                },
                { 
                    index:2,
                    root:{
                        index:7,
                        octave:1,
                        name:"G"
                    },
                    scale:{
                        index:4,
                        name:"Myxolydian"
                    },
                    chord:{
                        index:2,
                        name:"Dom7"
                    },
                    measures:1 ,
                    chordPattern:1
                }
            ]
        }
    ];
    const chordpatterns = [
        {
            index:0,
            name : "pattern #1",
            ticks :  	[0,1,2,3,4,5,6,7],
            root : 	    [0,4,3,0,0,4,3,0],
            rootVel:    [0,1,1,0,0,1,1,0],
            third:		[3,0,0,0,0,3,0,0],
            thirdVel:   [1,0,0,0,0,1,0,0],
            fifth:	    [3,0,3,0,3,0,0,0],
            fifthVel:   [1,0,1,0,1,0,0,0],
            seventh:	[0,5,0,5,3,0,5,3],
            seventhVel: [0,1,0,1,1,0,1,1]
        },
        {
            index:1,
            name : "pattern #2",
            ticks :  	[0,1,2,3,4,5,6,7],
            root : 	    [2,0,0,2,0,0,3,0],
            rootVel:    [0,1,1,0,0,1,1,0],
            third:		[3,0,0,0,0,3,0,0],
            thirdVel:   [1,0,0,0,0,1,0,0],
            fifth:	    [3,0,3,0,3,0,0,0],
            fifthVel:   [1,0,1,0,1,0,0,0],
            seventh:	[0,5,0,5,3,0,5,3],
            seventhVel: [0,1,0,1,1,0,1,1]
        }
    ];
    return {progressions,chordpatterns};
  }
}