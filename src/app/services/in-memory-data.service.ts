import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const progressions = [
        { 
            id: 0, 
            name: "C-major(I-II-V)",
            parts: [
                { 
                    index:0,
                    key:{
                        tonic:{
                            index:0, // 0 = C, 1 = C#, etc.
                            octave:1,
                            midiIndex:35, // midi:C1 index
                            name:"C"
                        },
                        scale:{
                            index:0 // 0 = Major, 1 = Minor
                        }
                    },
                    chord:{
                        index:0, // 0 = I, 1 = II, etc.
                        name:"Ionian"
                    },
                    measures:2 
                },
                { 
                    index:1,
                    key:{
                        tonic:{
                            index:0, // 0 = C, 1 = C#, etc.
                            octave:1,
                            midiIndex:35, // midi:C1 index
                            name:"D"
                        },
                        scale:{
                            index:1 // 0 = Major, 1 = Minor
                        } 
                    },
                    chord:{
                        index:1, // 0 = I, 1 = II, etc.
                        name:"Dorian"
                    },
                    measures:1 
                },
                { 
                    index: 2,
                    key:{
                        tonic:{
                            index:0, // 0 = C, 1 = C#, etc.
                            octave:1,
                            midiIndex:35, // midi:C1 index
                            name:"C"
                        },
                        scale:{
                            index:0 // 0 = Major, 1 = Minor
                        }
                    },
                    chord:{
                        index:4, // 0 = I, 1 = II, etc.
                        name:"V"
                    },
                    measures:1 
                }
            ]
        }
    ];
    return {progressions};
  }
}