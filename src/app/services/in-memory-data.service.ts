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
                    measures:2 
                },
                { 
                    index:1,
                    root:{
                        index:2,
                        octave:1,
                        name:"D"
                    },
                    scale:{
                        index:1,
                        name:"Dorian"
                    },
                    chord:{
                        index:1,
                        name:"Minor"
                    },
                    measures:2 
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
                    measures:2 
                }
            ]
        }
    ];
    return {progressions};
  }
}