const AV = require('av');
require('mp3');
const Song = require('../models/Song');

// this class is a wrapper of actual music player
// currently, I am using implementation from aurora.js
// find out more at: https://github.com/audiocogs/aurora.js
class MusicPlayer {
    constructor() {
        this.playlist = [];
    }
    addSong(song) {
        // if (song.isPrototypeOf(Song)) {
            console.log(song);
            return this.playlist.push(song);
        // }
        // throw "Invalid state: trying to add unsupported object into playlist";
    }
}

export default MusicPlayer;