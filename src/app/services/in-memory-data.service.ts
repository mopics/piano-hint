import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Chords, Scales } from './';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const progressions = [
            {
                id: 0,
                name: "Uncle Remus ( by George Duke )",
                bpm: 78,
                startOctave: 2,
                numOctaves: 3,
                parts: [
                    {
                        index: 0,
                        root: {
                            index: 2,
                            octave: 1,
                            name: "D"
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
                            ticks: [[{ name: "D", octave: 3, length: 3.5625, velocity: 8 }, { name: "A", octave: 3, length: 3.625, velocity: 8 }, { name: "D", octave: 4, length: 3.625, velocity: 8 }, { name: "F", octave: 4, length: 3.625, velocity: 8 }, { name: "A", octave: 4, length: 3.625, velocity: 8 },], [], [], [], [{ name: "D", octave: 4, length: 3.6875, velocity: 8 }, { name: "F", octave: 4, length: 3.625, velocity: 8 }, { name: "A", octave: 3, length: 3.625, velocity: 8 },], [], [], [], [{ name: "C", octave: 3, length: 3.75, velocity: 8 }, { name: "A", octave: 3, length: 3.75, velocity: 8 }, { name: "D", octave: 4, length: 3.875, velocity: 8 }, { name: "F", octave: 4, length: 3.625, velocity: 8 },], [], [], [], [{ name: "F", octave: 4, length: 1, velocity: 8 }, { name: "G", octave: 4, length: 1, velocity: 8 }, { name: "A", octave: 4, length: 1, velocity: 8 },], [], [{ name: "F", octave: 4, length: 1, velocity: 8 },], [{ name: "G", octave: 4, length: 1, velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 1,
                        root: {
                            index: 7,
                            octave: 1,
                            name: "G"
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
                            ticks: [[{ name: "G", octave: 3, length: 3.5625, velocity: 8 }, { name: "D", octave: 4, length: 3.625, velocity: 8 }, { name: "B", octave: 2, length: 3.5, velocity: 8 },], [], [], [], [{ name: "G", octave: 3, length: 1.875, velocity: 8 }, { name: "D", octave: 4, length: 1.8125, velocity: 8 }, { name: "B", octave: 2, length: 1.9375, velocity: 8 }, { name: "F", octave: 4, length: 1.8125, velocity: 8 },], [], [{ name: "G", octave: 3, length: 0.8125, velocity: 8 },], [{ name: "B", octave: 2, length: 0.875, velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 2,
                        root: {
                            index: 7,
                            octave: 1,
                            name: "G"
                        },
                        scale: {
                            index: 1,
                            name: "Dorian"
                        },
                        chord: {
                            index: 1,
                            name: "Minor"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "G", octave: 3, length: 2.6875, velocity: 8 }, { name: "D", octave: 4, length: 2.625, velocity: 8 }, { name: "Bb", octave: 2, length: 2.625, velocity: 8 }, { name: "F", octave: 4, length: 2.625, velocity: 8 },], [], [], [{ name: "Bb", octave: 2, length: 1, velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 3,
                        root: {
                            index: 9,
                            octave: 1,
                            name: "A"
                        },
                        scale: {
                            index: 2,
                            name: "Phrygian"
                        },
                        chord: {
                            index: 1,
                            name: "Minor"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "A", octave: 2, length: 1.75, velocity: 8 }, { name: "G", octave: 3, length: 1.5625, velocity: 8 }, { name: "C", octave: 4, length: 1.625, velocity: 8 }, { name: "E", octave: 4, length: 1.625, velocity: 8 },], [], [{ name: "A", octave: 2, length: 1.8125, velocity: 8 }, { name: "G", octave: 3, length: 1.8125, velocity: 8 }, { name: "E", octave: 4, length: 1.6875, velocity: 8 }, { name: "C", octave: 4, length: 1.625, velocity: 8 }, { name: "A", octave: 4, length: 1.75, velocity: 8 },], [],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 4,
                        root: {
                            index: 7,
                            octave: 1,
                            name: "G"
                        },
                        scale: {
                            index: 1,
                            name: "Dorian"
                        },
                        chord: {
                            index: 1,
                            name: "Minor"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "G", octave: 3, length: 1.75, velocity: 8 }, { name: "D", octave: 4, length: 1.6875, velocity: 8 }, { name: "G", octave: 2, length: 1.8125, velocity: 8 }, { name: "Bb", octave: 3, length: 1.6875, velocity: 8 },], [], [{ name: "G", octave: 3, length: 0.9375, velocity: 8 },], [{ name: "G", octave: 2, length: 1, velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 5,
                        root: {
                            index: 2,
                            octave: 1,
                            name: "D"
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
                            ticks: [[{ name: "G", octave: 3, length: 1.8125, velocity: 8 }, { name: "Bb", octave: 3, length: 1.6875, velocity: 8 }, { name: "D", octave: 4, length: 1.75, velocity: 8 },], [], [{ name: "E", octave: 3, length: 3.875, velocity: 8 }, { name: "A", octave: 3, length: 3.875, velocity: 8 }, { name: "D", octave: 4, length: 3.75, velocity: 8 }, { name: "A", octave: 2, length: 3.75, velocity: 8 },], [], [], [], [{ name: "A", octave: 3, length: 0.9375, velocity: 8 }, { name: "D", octave: 4, length: 0.875, velocity: 8 },], [{ name: "C", octave: 4, length: 1, velocity: 8 },], [{ name: "A", octave: 2, length: 0.875, velocity: 8 }, { name: "E", octave: 3, length: 1.8125, velocity: 8 }, { name: "G", octave: 3, length: 1.9375, velocity: 8 }, { name: "D", octave: 4, length: 1.6875, velocity: 8 },], [], [{ name: "D", octave: 4, length: 1.8125, velocity: 8 }, { name: "E", octave: 4, length: 1.8125, velocity: 8 }, { name: "A", octave: 4, length: 1.8125, velocity: 8 }, { name: "G", octave: 3, length: 1.9375, velocity: 8 },], [],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 6,
                        root: {
                            index: 7,
                            octave: 1,
                            name: "G"
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
                            ticks: [[{ name: "G", octave: 3, length: 2.5625, velocity: 8 }, { name: "C", octave: 4, length: 2.6875, velocity: 8 }, { name: "G", octave: 2, length: 2.75, velocity: 8 }, { name: "F", octave: 4, length: 2.6875, velocity: 8 },], [], [], [{ name: "G", octave: 2, length: 1, velocity: 8 },], [{ name: "G", octave: 3, length: 0.9375, velocity: 8 }, { name: "C", octave: 4, length: 1, velocity: 8 },], [{ name: "F", octave: 2, length: 0.6875, velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 7,
                        root: {
                            index: 10,
                            octave: 1,
                            name: "Bb"
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
                            ticks: [[{ name: "Bb", octave: 2, length: 2.625, velocity: 8 }, { name: "F", octave: 3, length: 2.75, velocity: 8 }, { name: "Bb", octave: 3, length: 2.5, velocity: 8 }, { name: "D", octave: 4, length: 2.625, velocity: 8 },], [], [], [{ name: "Bb", octave: 2, length: 1, velocity: 8 },], [{ name: "D", octave: 4, length: 1, velocity: 8 }, { name: "Bb", octave: 3, length: 1, velocity: 8 },], [{ name: "F", octave: 3, length: 0.9375, velocity: 8 },], [{ name: "Bb", octave: 3, length: 1, velocity: 8 }, { name: "D", octave: 4, length: 1, velocity: 8 },], [{ name: "F", octave: 3, length: 1, velocity: 8 }, { name: "Bb", octave: 3, length: 1, velocity: 8 },], [{ name: "G", octave: 3, length: 1, velocity: 8 },], [{ name: "G", octave: 3, length: 1, velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 8,
                        root: {
                            index: 5,
                            octave: 1,
                            name: "F"
                        },
                        scale: {
                            index: 4,
                            name: "Mixolydian"
                        },
                        chord: {
                            index: 0,
                            name: "Major"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "F", octave: 2, length: 1.75, velocity: 8 }, { name: "F", octave: 3, length: 1.625, velocity: 8 }, { name: "A", octave: 3, length: 1.6875, velocity: 8 }, { name: "C", octave: 4, length: 1.625, velocity: 8 },], [], [{ name: "F", octave: 3, length: 1, velocity: 8 }, { name: "A", octave: 3, length: 1, velocity: 8 }, { name: "C", octave: 4, length: 1, velocity: 8 }, { name: "F", octave: 2, length: 1, velocity: 8 },], [{ name: "F", octave: 2, length: 1, velocity: 8 },], [{ name: "D", octave: 3, length: 1.875, velocity: 8 }, { name: "F", octave: 3, length: 1.875, velocity: 8 }, { name: "Bb", octave: 3, length: 1.8125, velocity: 8 }, { name: "D", octave: 4, length: 1.75, velocity: 8 },], [], [{ name: "F", octave: 3, length: 3.875, velocity: 8 }, { name: "A", octave: 3, length: 3.75, velocity: 8 }, { name: "C", octave: 4, length: 3.75, velocity: 8 },], [], [], [], [{ name: "A", octave: 2, length: 1.9375, velocity: 8 },], [], [{ name: "Bb", octave: 2, length: 1, velocity: 8 }, { name: "F", octave: 3, length: 1.375, velocity: 8 }, { name: "Bb", octave: 3, length: 1.4375, velocity: 8 },], [], [{ name: "B", octave: 2, length: 1, velocity: 8 },], [{ name: "F", octave: 3, length: 1, velocity: 8 }, { name: "G", octave: 3, length: 1, velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 9,
                        root: {
                            index: 10,
                            octave: 1,
                            name: "Bb"
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
                            ticks: [[{ name: "C", octave: 3, length: 1.8125, velocity: 8 }, { name: "F", octave: 3, length: 1.875, velocity: 8 }, { name: "Bb", octave: 3, length: 1.6875, velocity: 8 }, { name: "D", octave: 4, length: 1.6875, velocity: 8 },], [], [{ name: "Bb", octave: 3, length: 1.8125, velocity: 8 }, { name: "D", octave: 4, length: 1.875, velocity: 8 },], [], [{ name: "C", octave: 3, length: 1.75, velocity: 8 }, { name: "G", octave: 3, length: 1.75, velocity: 8 },], [], [{ name: "C", octave: 3, length: 1, velocity: 8 }, { name: "Bb", octave: 3, length: 1, velocity: 8 }, { name: "D", octave: 4, length: 1, velocity: 8 }, { name: "F", octave: 4, length: 1, velocity: 8 }, { name: "Bb", octave: 4, length: 1, velocity: 8 },], [{ name: "Bb", octave: 3, length: 1, velocity: 8 }, { name: "D", octave: 4, length: 1, velocity: 8 }, { name: "F", octave: 4, length: 1, velocity: 8 }, { name: "Bb", octave: 4, length: 1, velocity: 8 },], [{ name: "C", octave: 3, length: 1, velocity: 8 },], [{ name: "C", octave: 3, length: 1, velocity: 8 },], [{ name: "C", octave: 3, length: 1, velocity: 8 }, { name: "Bb", octave: 3, length: 1, velocity: 8 }, { name: "D", octave: 4, length: 1, velocity: 8 }, { name: "F", octave: 4, length: 1, velocity: 8 }, { name: "Bb", octave: 4, length: 1, velocity: 8 },], [{ name: "C", octave: 3, length: 1, velocity: 8 },], [{ name: "Bb", octave: 3, length: 1, velocity: 8 },], [{ name: "C", octave: 3, length: 1, velocity: 8 },], [{ name: "Ab", octave: 3, length: 1, velocity: 8 }, { name: "D", octave: 4, length: 1, velocity: 8 },], [{ name: "Bb", octave: 2, length: 1, velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 10,
                        root: {
                            index: 2,
                            octave: 1,
                            name: "D"
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
                            ticks: [[{ name: "D", octave: 3, length: 1.8125, velocity: 8 }, { name: "A", octave: 3, length: 1.8125, velocity: 8 }, { name: "C", octave: 4, length: 1.6875, velocity: 8 }, { name: "A", octave: 4, length: 1.75, velocity: 8 }, { name: "F", octave: 4, length: 1.6875, velocity: 8 },], [], [{ name: "D", octave: 3, length: 1.8125, velocity: 8 }, { name: "A", octave: 3, length: 1.75, velocity: 8 }, { name: "C", octave: 4, length: 1.9375, velocity: 8 }, { name: "F", octave: 4, length: 1.9375, velocity: 8 }, { name: "A", octave: 4, length: 1.875, velocity: 8 },], [], [{ name: "D", octave: 3, length: 1.75, velocity: 8 }, { name: "A", octave: 3, length: 1.75, velocity: 8 }, { name: "D", octave: 4, length: 1.8125, velocity: 8 }, { name: "F", octave: 4, length: 1.75, velocity: 8 },], [],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 11,
                        root: {
                            index: 7,
                            octave: 1,
                            name: "G"
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
                            ticks: [[{ name: "G", octave: 2, length: 3.75, velocity: 8 }, { name: "G", octave: 3, length: 3.6875, velocity: 8 }, { name: "B", octave: 3, length: 3.6875, velocity: 8 }, { name: "F", octave: 4, length: 3.875, velocity: 8 },], [], [], [], [{ name: "G", octave: 3, length: 1.6875, velocity: 8 }, { name: "B", octave: 3, length: 1.8125, velocity: 8 },], [], [{ name: "F", octave: 4, length: 1.8125, velocity: 8 }, { name: "A", octave: 4, length: 1.875, velocity: 8 }, { name: "G", octave: 4, length: 1, velocity: 8 }, { name: "B", octave: 2, length: 2, velocity: 8 },], [], [{ name: "F", octave: 4, length: 1, velocity: 8 },], [{ name: "G", octave: 4, length: 1, velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 12,
                        root: {
                            index: 10,
                            octave: 1,
                            name: "Bb"
                        },
                        scale: {
                            index: 1,
                            name: "Dorian"
                        },
                        chord: {
                            index: 1,
                            name: "Minor"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "Bb", octave: 2, length: 1.8125, velocity: 8 }, { name: "Bb", octave: 3, length: 1.75, velocity: 8 }, { name: "Db", octave: 4, length: 1.75, velocity: 8 }, { name: "F", octave: 4, length: 1.75, velocity: 8 }, { name: "Bb", octave: 4, length: 1.8125, velocity: 8 },], [], [{ name: "Bb", octave: 2, length: 1, velocity: 8 },], [{ name: "Bb", octave: 2, length: 1, velocity: 8 },], [{ name: "Bb", octave: 3, length: 1, velocity: 8 }, { name: "Db", octave: 4, length: 1, velocity: 8 }, { name: "F", octave: 4, length: 1, velocity: 8 }, { name: "Bb", octave: 4, length: 1, velocity: 8 },], [{ name: "Bb", octave: 3, length: 1, velocity: 8 }, { name: "Db", octave: 4, length: 1, velocity: 8 }, { name: "F", octave: 4, length: 1, velocity: 8 }, { name: "Bb", octave: 4, length: 1, velocity: 8 },], [{ name: "Bb", octave: 3, length: 1.8125, velocity: 8 }, { name: "Db", octave: 4, length: 1.75, velocity: 8 }, { name: "F", octave: 4, length: 1.75, velocity: 8 }, { name: "Bb", octave: 4, length: 1.6875, velocity: 8 },], [], [{ name: "Bb", octave: 2, length: 1.8125, velocity: 8 }, { name: "Bb", octave: 3, length: 1.875, velocity: 8 }, { name: "Db", octave: 4, length: 1.8125, velocity: 8 }, { name: "F", octave: 4, length: 1.75, velocity: 8 }, { name: "Bb", octave: 4, length: 1.6875, velocity: 8 },], [],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    }, {
                        index: 13,
                        root: {
                            index: 9,
                            octave: 1,
                            name: "A"
                        },
                        scale: {
                            index: 10,
                            name: "Altered"
                        },
                        chord: {
                            index: 2,
                            name: "Dom7"
                        },
                        measures: 1,
                        chordPattern: 0,
                        pattern: {
                            ticks: [[{ name: "A", octave: 2, length: 5.5, velocity: 8 }, { name: "G", octave: 3, length: 5.3125, velocity: 8 }, { name: "Db", octave: 4, length: 5.5, velocity: 8 }, { name: "F", octave: 4, length: 5.5, velocity: 8 },], [], [], [], [], [],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    },
                ]
            },
            {
                id: 0,
                name: "Moonlight Sonata",
                bpm: 41,
                startOctave: 1,
                numOctaves: 5,
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
                            ticks: [[{ name: "Db", octave: 3, length: 12, velocity: 8 }, { name: "Ab", octave: 4, length: 2, velocity: 8 }, { name: "Db", octave: 2, length: 12, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },],],
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
                            ticks: [[{ name: "Ab", octave: 4, length: 2, velocity: 8 }, { name: "B", octave: 2, length: 11.75, velocity: 8 }, { name: "B", octave: 3, length: 11.75, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },],],
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
                            ticks: [[{ name: "A", octave: 2, length: 5, velocity: 8 }, { name: "A", octave: 3, length: 5, velocity: 8 }, { name: "A", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },], [{ name: "A", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },],],
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
                            ticks: [[{ name: "Gb", octave: 2, length: 5, velocity: 8 }, { name: "Gb", octave: 3, length: 5, velocity: 8 }, { name: "A", octave: 4, length: 2, velocity: 8 },], [{ name: "D", octave: 5, length: 2, velocity: 8 },], [{ name: "Gb", octave: 5, length: 2, velocity: 8 },], [{ name: "A", octave: 4, length: 2, velocity: 8 },], [{ name: "D", octave: 5, length: 2, velocity: 8 },], [{ name: "Gb", octave: 5, length: 2, velocity: 8 },],],
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
                            ticks: [[{ name: "Ab", octave: 3, length: 5, velocity: 8 }, { name: "Ab", octave: 2, length: 5, velocity: 8 }, { name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "C", octave: 5, length: 2, velocity: 8 },], [{ name: "Gb", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 2, length: 5, velocity: 8 }, { name: "Ab", octave: 3, length: 5, velocity: 8 }, { name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "Eb", octave: 5, length: 2, velocity: 8 },], [{ name: "Gb", octave: 4, length: 2, velocity: 8 },], [{ name: "C", octave: 5, length: 2, velocity: 8 },], [{ name: "Eb", octave: 5, length: 2, velocity: 8 },],],
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
                            ticks: [[{ name: "Db", octave: 3, length: 12, velocity: 8 }, { name: "Ab", octave: 3, length: 12, velocity: 8 }, { name: "Db", octave: 4, length: 12, velocity: 8 }, { name: "E", octave: 4, length: 2, velocity: 8 }, { name: "Db", octave: 2, length: 12, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 }, { name: "Ab", octave: 5, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 }, { name: "Ab", octave: 5, length: 2, velocity: 8 },],],
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
                            ticks: [[{ name: "C", octave: 3, length: 12, velocity: 8 }, { name: "C", octave: 4, length: 12, velocity: 8 }, { name: "Ab", octave: 3, length: 12, velocity: 8 }, { name: "Ab", octave: 5, length: 2, velocity: 8 }, { name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Eb", octave: 5, length: 2, velocity: 8 },], [{ name: "Gb", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Eb", octave: 5, length: 2, velocity: 8 },], [{ name: "Gb", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Eb", octave: 5, length: 2, velocity: 8 },], [{ name: "Gb", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 }, { name: "Ab", octave: 5, length: 2, velocity: 8 },], [{ name: "Eb", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 5, length: 2, velocity: 8 }, { name: "Gb", octave: 5, length: 2, velocity: 8 },],],
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
                            ticks: [[{ name: "Db", octave: 3, length: 12, velocity: 8 }, { name: "Db", octave: 4, length: 12, velocity: 8 }, { name: "Ab", octave: 4, length: 2, velocity: 8 }, { name: "Ab", octave: 5, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },], [{ name: "Ab", octave: 4, length: 2, velocity: 8 },], [{ name: "Db", octave: 5, length: 2, velocity: 8 },], [{ name: "E", octave: 5, length: 2, velocity: 8 },],],
                            time: { parts: 2, ofLength: 4 }
                        }
                    },
                ]
            }
        ];
        return { progressions };
    }
}