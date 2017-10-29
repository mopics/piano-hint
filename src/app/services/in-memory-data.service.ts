import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Chords, Scales } from './';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const progressions = [
            {
                id: 0,
                name: "C-minor(I-II-V)",
                bpm: 120,
                parts: [
                    {
                        index: 0,
                        root: {
                            index: 0,
                            octave: 1,
                            name: "C"
                        },
                        scale: {
                            index: Scales.Aeolian,
                            name: "Aeolian"
                        },
                        chord: {
                            index: Chords.Minor,
                            name: "Minor"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [
                                [{ name: "C", octave: 3, length: 2, velocity: 5 }], // tick 1
                                [], // tick 2
                                [{ name: "Eb", octave: 4, length: 2, velocity: 5 }], // tick 3
                                [], // tick 4
                                [{ name: "C", octave: 4, length: 2, velocity: 5 }], // tick 5
                                [], // tick 6
                                [{ name: "G", octave: 3, length: 2, velocity: 5 }], // tick 7
                                [], // tick 8
                            ],
                            time: { parts: 2, ofLength: 4 }
                        }
                    },
                    {
                        index: 1,
                        root: {
                            index: 2,
                            octave: 1,
                            name: "D"
                        },
                        scale: {
                            index: Scales.Symmetrical_Diminished,
                            name: "Symmetrical Diminished"
                        },
                        chord: {
                            index: Chords.FullDim,
                            name: "FullDim"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [
                                [{ name: "D", octave: 3, length: 2, velocity: 5 }], // tick 1
                                [], // tick 2
                                [{ name: "F", octave: 4, length: 2, velocity: 5 }], // tick 3
                                [], // tick 4
                                [{ name: "D", octave: 3, length: 2, velocity: 5 }], // tick 5
                                [], // tick 6
                                [{ name: "Ab", octave: 4, length: 2, velocity: 5 }], // tick 7
                                [], // tick 8
                            ],
                            time: { parts: 2, ofLength: 4 }
                        }
                    },
                    {
                        index: 2,
                        root: {
                            index: 7,
                            octave: 1,
                            name: "G"
                        },
                        scale: {
                            index: 4,
                            name: "Myxolydian"
                        },
                        chord: {
                            index: 2,
                            name: "Dom7"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [
                                [{ name: "G", octave: 4, length: 2, velocity: 5 }], // tick 1
                                [], // tick 2
                                [{ name: "B", octave: 3, length: 2, velocity: 5 }], // tick 3
                                [], // tick 4
                                [{ name: "G", octave: 4, length: 2, velocity: 5 }], // tick 5
                                [], // tick 6
                                [{ name: "D", octave: 3, length: 2, velocity: 5 }], // tick 7
                                [], // tick 8
                            ],
                            time: { parts: 2, ofLength: 4 }
                        }
                    },
                    {
                        index: 3,
                        root: {
                            index: 0,
                            octave: 1,
                            name: "C"
                        },
                        scale: {
                            index: Scales.Aeolian,
                            name: "Aeolian"
                        },
                        chord: {
                            index: Chords.Minor,
                            name: "Minor"
                        },
                        measures: 1,
                        chordPattern: 1,
                        pattern: {
                            ticks: [
                                [{ name: "C", octave: 3, length: 2, velocity: 5 }], // tick 1
                                [], // tick 2
                                [{ name: "Eb", octave: 4, length: 2, velocity: 5 }], // tick 3
                                [], // tick 4
                                [{ name: "C", octave: 3, length: 2, velocity: 5 }], // tick 5
                                [], // tick 6
                                [{ name: "G", octave: 4, length: 2, velocity: 5 }], // tick 7
                                [], // tick 8
                            ]
                            ,
                            time: { parts: 2, ofLength: 4 }
                        }
                    }
                ]
            },
            {
                id: 0,
                name: "Moonlight Sonata",
                bpm: 41,
                parts: [
                    {
                        index: 0,
                        root: {
                            index: 1,
                            octave: 1,
                            name: "Db"
                        },
                        scale: {
                            index: 5,
                            name: "Aeolian"
                        },
                        chord: {
                            index: 1,
                            name: "Minor"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "Db", octave: 3, length: "11.375", velocity: 8 }, { name: "Ab", octave: 4, length: "2", velocity: 8 }, { name: "Db", octave: 2, length: "11.5625", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 1,
                        root: {
                            index: 1,
                            octave: 1,
                            name: "Db"
                        },
                        scale: {
                            index: 5,
                            name: "Aeolian"
                        },
                        chord: {
                            index: 1,
                            name: "Minor"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "Ab", octave: 4, length: "2", velocity: 8 }, { name: "B", octave: 3, length: "12", velocity: 8 }, { name: "B", octave: 2, length: "12", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 2,
                        root: {
                            index: 9,
                            octave: 1,
                            name: "A"
                        },
                        scale: {
                            index: 0,
                            name: "Ionian"
                        },
                        chord: {
                            index: 0,
                            name: "Major"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "A", octave: 2, length: "5", velocity: 8 }, { name: "A", octave: 3, length: "5", velocity: 8 }, { name: "A", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },], [{ name: "A", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 3,
                        root: {
                            index: 6,
                            octave: 1,
                            name: "Gb"
                        },
                        scale: {
                            index: 11,
                            name: "Symmetrical_Diminished"
                        },
                        chord: {
                            index: 3,
                            name: "HalfDim"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "Gb", octave: 2, length: "5", velocity: 8 }, { name: "Gb", octave: 3, length: "5", velocity: 8 }, { name: "A", octave: 4, length: "2", velocity: 8 },], [{ name: "D", octave: 5, length: "2", velocity: 8 },], [{ name: "Gb", octave: 5, length: "2", velocity: 8 },], [{ name: "A", octave: 4, length: "2", velocity: 8 },], [{ name: "D", octave: 5, length: "2", velocity: 8 },], [{ name: "Gb", octave: 5, length: "2", velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 4,
                        root: {
                            index: 8,
                            octave: 1,
                            name: "Ab"
                        },
                        scale: {
                            index: 10,
                            name: "Atltered"
                        },
                        chord: {
                            index: 2,
                            name: "Dom7"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "Ab", octave: 3, length: "5", velocity: 8 }, { name: "Ab", octave: 2, length: "5", velocity: 8 }, { name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "C", octave: 5, length: "2", velocity: 8 },], [{ name: "Gb", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 2, length: "5", velocity: 8 }, { name: "Ab", octave: 3, length: "5", velocity: 8 }, { name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "Eb", octave: 5, length: "2", velocity: 8 },], [{ name: "Gb", octave: 4, length: "2", velocity: 8 },], [{ name: "C", octave: 5, length: "2", velocity: 8 },], [{ name: "Eb", octave: 5, length: "2", velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 5,
                        root: {
                            index: 1,
                            octave: 1,
                            name: "Db"
                        },
                        scale: {
                            index: 5,
                            name: "Aeolian"
                        },
                        chord: {
                            index: 1,
                            name: "Minor"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "Db", octave: 3, length: "12", velocity: 8 }, { name: "Ab", octave: 3, length: "12", velocity: 8 }, { name: "Db", octave: 4, length: "12", velocity: 8 }, { name: "E", octave: 4, length: "2", velocity: 8 }, { name: "Db", octave: 2, length: "12", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 }, { name: "Ab", octave: 5, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 }, { name: "Ab", octave: 5, length: "2", velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 6,
                        root: {
                            index: 8,
                            octave: 1,
                            name: "Ab"
                        },
                        scale: {
                            index: 4,
                            name: "Mixolydian"
                        },
                        chord: {
                            index: 2,
                            name: "Dom7"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "C", octave: 3, length: "12", velocity: 8 }, { name: "C", octave: 4, length: "12", velocity: 8 }, { name: "Ab", octave: 3, length: "12", velocity: 8 }, { name: "Ab", octave: 5, length: "2", velocity: 8 }, { name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Eb", octave: 5, length: "2", velocity: 8 },], [{ name: "Gb", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Eb", octave: 5, length: "2", velocity: 8 },], [{ name: "Gb", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Eb", octave: 5, length: "2", velocity: 8 },], [{ name: "Gb", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 }, { name: "Ab", octave: 5, length: "2", velocity: 8 },], [{ name: "Eb", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 5, length: "2", velocity: 8 }, { name: "Gb", octave: 5, length: "2", velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 7,
                        root: {
                            index: 1,
                            octave: 1,
                            name: "Db"
                        },
                        scale: {
                            index: 5,
                            name: "Aeolian"
                        },
                        chord: {
                            index: 1,
                            name: "Minor"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "Db", octave: 3, length: "12", velocity: 8 }, { name: "Db", octave: 4, length: "12", velocity: 8 }, { name: "Ab", octave: 4, length: "2", velocity: 8 }, { name: "Ab", octave: 5, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },], [{ name: "Ab", octave: 4, length: "2", velocity: 8 },], [{ name: "Db", octave: 5, length: "2", velocity: 8 },], [{ name: "E", octave: 5, length: "2", velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    },
                ]
            }
        ];
        return { progressions };
    }
}