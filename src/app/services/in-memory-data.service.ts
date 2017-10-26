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
                    chordPattern:0,
                    pattern: { 
                        ticks: [
                            [ {name:"C", octave:3, length:"8n", velocity:5 } ], // tick 1
                            [ ], // tick 2
                            [ {name:"Eb", octave:4, length:"8n", velocity:5 } ], // tick 3
                            [ ], // tick 4
                            [ {name:"C", octave:4, length:"8n", velocity:5 } ], // tick 5
                            [ ], // tick 6
                            [ {name:"G", octave:3, length:"8n", velocity:5 } ], // tick 7
                            [ ], // tick 8
                        ],
                        time:{ parts:2, ofLength:4 }
                    }
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
                    chordPattern:0,
                    pattern: { 
                        ticks: [
                            [ {name:"D", octave:3, length:"8n", velocity:5 } ], // tick 1
                            [ ], // tick 2
                            [ {name:"F", octave:4, length:"8n", velocity:5 } ], // tick 3
                            [ ], // tick 4
                            [ {name:"D", octave:3, length:"8n", velocity:5 } ], // tick 5
                            [ ], // tick 6
                            [ {name:"Ab", octave:4, length:"8n", velocity:5 } ], // tick 7
                            [ ], // tick 8
                        ],
                        time:{ parts:2, ofLength:4 }
                    }
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
                    chordPattern:0,
                    pattern: { 
                        ticks: [
                            [ {name:"G", octave:4, length:"8n", velocity:5 } ], // tick 1
                            [ ], // tick 2
                            [ {name:"B", octave:3, length:"8n", velocity:5 } ], // tick 3
                            [ ], // tick 4
                            [ {name:"G", octave:4, length:"8n", velocity:5 } ], // tick 5
                            [ ], // tick 6
                            [ {name:"D", octave:3, length:"8n", velocity:5 } ], // tick 7
                            [ ], // tick 8
                        ],
                        time:{ parts:2, ofLength:4 }
                    }
                },
                { 
                    index:3,
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
                    chordPattern:1,
                    pattern: { 
                        ticks: [
                            [ {name:"C", octave:3, length:"8n", velocity:5 } ], // tick 1
                            [ ], // tick 2
                            [ {name:"Eb", octave:4, length:"8n", velocity:5 } ], // tick 3
                            [ ], // tick 4
                            [ {name:"C", octave:3, length:"8n", velocity:5 } ], // tick 5
                            [ ], // tick 6
                            [ {name:"G", octave:4, length:"8n", velocity:5 } ], // tick 7
                            [ ], // tick 8
                        ]
                        ,
                        time:{ parts:2, ofLength:4 }
                    }
                }
            ]
        },
        {
            id:0,
            name:"Wanna be closer",
            parts:[
                {
                index:0,
                root:{
            index:4,
            octave:1,
            name:"E"
        },
                scale:{
            index:1,
            name:"Dorian"
        },
                chord:{
            index:1,
            name:"Minor"
        },
                measures:1,
                chordPattern:0,
                pattern:{
            ticks:[[{name:"E", octave:2, length:"8n", velocity:10},{name:"G", octave:3, length:"8n", velocity:10},{name:"B", octave:3, length:"8n", velocity:10},{name:"E", octave:4, length:"8n", velocity:10},],[{name:"G", octave:2, length:"8n", velocity:10},],[{name:"E", octave:2, length:"8n", velocity:10},],[{name:"A", octave:2, length:"8n", velocity:10},],[{name:"E", octave:2, length:"8n", velocity:10},],[{name:"B", octave:2, length:"8n", velocity:10},],[{name:"E", octave:2, length:"8n", velocity:10},],[{name:"A", octave:2, length:"8n", velocity:10},],],
            time:{parts:2, ofLength:4}
        }
            },{
                index:1,
                root:{
            index:0,
            octave:1,
            name:"C"
        },
                scale:{
            index:0,
            name:"Ionian"
        },
                chord:{
            index:0,
            name:"Major"
        },
                measures:1,
                chordPattern:0,
                pattern:{
            ticks:[[{name:"G", octave:3, length:"8n", velocity:10},{name:"C", octave:4, length:"8n", velocity:10},{name:"E", octave:4, length:"8n", velocity:10},{name:"E", octave:2, length:"8n", velocity:10},],[{name:"A", octave:2, length:"8n", velocity:10},],[{name:"E", octave:2, length:"8n", velocity:10},],[{name:"B", octave:2, length:"8n", velocity:10},],[{name:"E", octave:2, length:"8n", velocity:10},],[{name:"C", octave:3, length:"8n", velocity:10},],[{name:"E", octave:2, length:"8n", velocity:10},],[{name:"B", octave:2, length:"8n", velocity:10},],],
            time:{parts:2, ofLength:4}
        }
            },{
                index:2,
                root:{
            index:9,
            octave:1,
            name:"A"
        },
                scale:{
            index:5,
            name:"Aeolian"
        },
                chord:{
            index:1,
            name:"Minor"
        },
                measures:1,
                chordPattern:0,
                pattern:{
            ticks:[[{name:"G", octave:3, length:"8n", velocity:10},{name:"A", octave:3, length:"8n", velocity:10},{name:"C", octave:4, length:"8n", velocity:10},{name:"E", octave:4, length:"8n", velocity:10},{name:"E", octave:2, length:"8n", velocity:10},],[{name:"C", octave:3, length:"8n", velocity:10},],[{name:"E", octave:2, length:"8n", velocity:10},],[{name:"D", octave:3, length:"8n", velocity:10},],[{name:"E", octave:2, length:"8n", velocity:10},],[{name:"E", octave:3, length:"8n", velocity:10},],[{name:"E", octave:2, length:"8n", velocity:10},],[{name:"D", octave:3, length:"8n", velocity:10},],],
            time:{parts:2, ofLength:4}
        }
            },{
                index:3,
                root:{
            index:9,
            octave:1,
            name:"A"
        },
                scale:{
            index:11,
            name:"Symmetrical_Diminished"
        },
                chord:{
            index:4,
            name:"FullDim"
        },
                measures:1,
                chordPattern:0,
                pattern:{
            ticks:[[{name:"E", octave:2, length:"8n", velocity:10},{name:"C", octave:4, length:"8n", velocity:10},{name:"Eb", octave:4, length:"8n", velocity:10},{name:"A", octave:3, length:"8n", velocity:10},],[{name:"Eb", octave:3, length:"8n", velocity:10},],[{name:"E", octave:2, length:"8n", velocity:10},],[{name:"C", octave:3, length:"8n", velocity:10},],[{name:"E", octave:2, length:"8n", velocity:10},],[{name:"A", octave:2, length:"8n", velocity:10},],[{name:"E", octave:2, length:"8n", velocity:10},],[{name:"Gb", octave:3, length:"8n", velocity:10},{name:"Eb", octave:2, length:"8n", velocity:10},{name:"Eb", octave:3, length:"8n", velocity:10},{name:"Eb", octave:4, length:"8n", velocity:10},{name:"Eb", octave:5, length:"8n", velocity:10},],],
            time:{parts:2, ofLength:4}
        }
            },
            ]
        }
    ];
    const chordpatterns = [
        {
            index:0,
            name : "pattern #1",
            ticks :  	    [0,1,2,3,4,5,6,7],
            root : 	        [4,0,0,0,0,0,0,0],
            rootLength:     [4,8,8,8,8,8,8,8], 
            rootVel:        [1,0,0,0,0,0,0,0],
            third:		    [3,0,0,0,2,0,0,0],
            thirdVel:       [1,0,0,0,1,0,0,0],
            thirdLength:    [4,8,8,8,4,8,8,8],
            fifth:	        [4,0,0,0,0,0,0,0],
            fifthVel:       [1,0,1,0,0,0,0,0],
            fifthLength:    [8,8,8,8,8,8,8,8],
            seventh:	    [4,0,0,0,0,0,0,0],
            seventhVel:     [0,1,0,0,0,0,0,0],
            seventhLength:  [8,8,8,8,8,8,8,8],
        },
        {
            index:1,
            name : "pattern #2",
            ticks :  	    [0,1,2,3,4,5,6,7],
            root : 	        [3,0,0,0,2,0,0,0],
            rootVel:        [1,0,0,0,4,0,0,0],
            rootLength:     [8,8,8,8,2,8,8,8], 
            third:		    [3,0,0,0,0,0,0,0],
            thirdVel:       [1,0,0,0,1,0,0,0],
            thirdLength:    [4,8,8,8,4,8,8,8],
            fifth:	        [4,0,0,0,0,0,0,0],
            fifthVel:       [1,0,1,0,0,0,0,0],
            fifthLength:    [8,8,8,8,8,8,8,8],
            seventh:	    [4,0,0,0,0,0,0,0],
            seventhVel:     [0,1,0,0,0,0,0,0],
            seventhLength:  [8,8,8,8,8,8,8,8],
        },
        {
            index:2,
            name : "pattern #3",
            ticks :  	    [0,1,2,3,4,5,6,7],
            root : 	        [0,4,3,0,0,4,3,0],
            rootVel:        [0,1,1,0,0,1,1,0],
            rootLength:     [8,8,8,8,8,8,8,8],
            third:		    [3,0,0,0,0,3,0,0],
            thirdVel:       [1,0,0,0,0,1,0,0],
            thirdLength:    [8,8,8,8,8,8,8,8],
            fifth:	        [3,0,3,0,3,0,0,0],
            fifthVel:       [1,0,1,0,1,0,0,0],
            fifthLength:    [8,8,8,8,8,8,8,8],
            seventh:	    [0,5,0,5,3,0,5,3],
            seventhVel:     [0,1,0,1,1,0,1,1],
            seventhLength:  [8,8,8,8,8,8,8,8],
        },
    ];
    return {progressions,chordpatterns};
  }
}