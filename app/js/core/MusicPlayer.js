const AV = require('av');
require('mp3');
const EventEmitter = require('events');
import Song from "../models/Song";

// this class is a wrapper of actual music player
// currently, I am using implementation from aurora.js
// find out more at: https://github.com/audiocogs/aurora.js
// This class extends EventEmitter of NodeJS. Which make my
// life easier by bring on() and emit() to the MusicPlayer.
// It will be very useful later on.
class MusicPlayer extends EventEmitter {
    constructor() {
        super();
        this.playlist = [];
        this.current = {
            song: null,
            control: null
        };
        this.Event = {
            STATE_CHANGE: 'state_change',
            SET_CURRENT: 'set_current',
            PLAYLIST_CHANGE: 'playlist_change'
        };
        this.$keygen = 0;
    }
    getUniqueKey() {
        // :) simple function to get unique key for song
        // this always increase so there is no way it going
        // conflict. However, better implementation is necessary
        // due to limitation about max value of integer variable
        // For now, hoping that our user are not going to add song
        // until it hit the max value
        return this.$keygen++;
    }
    addSong(name, filepath) {
        let song = new Song(name, filepath);
        song.$key = this.getUniqueKey();
        this.playlist.push(song);
        this.emit(this.Event.PLAYLIST_CHANGE);
        return song.$key;
    }
    getPlaylist() {
        return this.playlist;
    }
    setSongByIndex(index) {
        console.log(this.playlist);
        console.log(index);
        if (this.playlist && this.playlist[index]) {
            this.setSong(this.playlist[index]);
            return;
        }
        throw "Index not found";
    }
    setSong(song) {
        if (song === null) {
            this.current = {
                song: null,
                control: null
            };
            return;
        }
        if (typeof song === 'undefined') {
            throw "parameter 'song' is missing, which is required.";
        }
        const filepath = song.getFilepath();
        console.log('file://' + filepath);
        const control = AV.Player.fromURL('file://' + filepath);
        this.current = {
            song,
            control
        };
    }
    play() {
        if (this.isCurrentSet()) {
            this.emit(this.Event.STATE_CHANGE, 'play');
            return this.getCurrent().control.play();
        }
        // no current song is set
        throw "No song is set";
    }
    pause() {
        if (this.isCurrentSet()) {
            this.emit(this.Event.STATE_CHANGE, 'pause');
            return this.getCurrent().control.pause();
        }
        // no current song is set
        throw "No song is set";
    }
    stop() {
        if (this.isCurrentSet()) {
            this.getCurrent().control.stop();
            this.setSong(null);
            this.emit(this.Event.STATE_CHANGE, 'stop');
            this.emit(this.Event.SET_CURRENT);
        }
    }
    getCurrent() {
        return this.current;
    }
    isCurrentSet() {
        const current = this.getCurrent();
        return (current && current.control);
    }
}

export default MusicPlayer;