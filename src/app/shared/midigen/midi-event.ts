import { Util } from './util';

export class MidiEvent {

  static NOTE_OFF = 0x80;
  static NOTE_ON = 0x90;
  static AFTER_TOUCH = 0xA0;
  static CONTROLLER = 0xB0;
  static PROGRAM_CHANGE = 0xC0;
  static CHANNEL_AFTERTOUCH = 0xD0;
  static PITCH_BEND = 0xE0;

  type;
  time;
  channel;
  param1;
  param2;


  constructor(params) {
    if (!this) { return new MidiEvent(params) };
    if (params &&
      (params.type !== null || params.type !== undefined) &&
      (params.channel !== null || params.channel !== undefined) &&
      (params.param1 !== null || params.param1 !== undefined)) {
      this.setTime(params.time);
      this.setType(params.type);
      this.setChannel(params.channel);
      this.setParam1(params.param1);
      this.setParam2(params.param2);
    }
  }

    /**
   * Set the time for the event in ticks since the previous event.
   *
   * @param {number} ticks - The number of ticks since the previous event. May
   * be zero.
   */
  setTime(ticks) {
    this.time = Util.translateTickTime(ticks || 0);
  };

  setType(type) {
    if (type < MidiEvent.NOTE_OFF || type > MidiEvent.PITCH_BEND) {
      throw new Error('Trying to set an unknown event:' + type);
    }

    this.type = type;
  };

  /**
   * Set the channel for the event. Must be between 0 and 15, inclusive.
   *
   * @param {number} channel - The event channel.
   */
  setChannel(channel) {
    if (channel < 0 || channel > 15) {
      throw new Error('Channel is out of bounds.');
    }

    this.channel = channel;
  };

  /**
   * Set the first parameter for the event. Must be between 0 and 255,
   * inclusive.
   *
   * @param {number} p - The first event parameter value.
   */
  setParam1(p) {
    this.param1 = p;
  };

  /**
   * Set the second parameter for the event. Must be between 0 and 255,
   * inclusive.
   *
   * @param {number} p - The second event parameter value.
   */
  setParam2(p) {
    this.param2 = p;
  };

  /**
   * Serialize the event to an array of bytes.
   *
   * @returns {Array} The array of serialized bytes.
   */
  toBytes() {
    const byteArray = [];

    const typeChannelByte = this.type | (this.channel & 0xF);

    byteArray.push.apply(byteArray, this.time);
    byteArray.push(typeChannelByte);
    byteArray.push(this.param1);

    // Some events don't have a second parameter
    if (this.param2 !== undefined && this.param2 !== null) {
      byteArray.push(this.param2);
    }
    return byteArray;
  };
}
