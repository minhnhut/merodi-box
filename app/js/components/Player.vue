<template>
    <ul>
        <template v-for="(song, $index) in songs">
            <li v-bind:key="song" v-on:click="playTrack($index)">{{song}}</li>
        </template>
    </ul>
</template>

<script>
  import {Howl} from 'howler';
  export default {
    data() {
      return {
          testProp: 'abc',
          musicSelected: false,
          songs: [],
          isPlaying: false,
          currentTrack: null,
          player: null,
          basePath: '',
          listVisible: true
      }
    },
    mounted() {
        console.log('WORK!!');
        const ipc = require('electron').ipcRenderer;
        var _this = this;
        ipc.on('modal-file-content', function(event, arg) {
            _this.basePath = arg.basePath;
            _this.songs = arg.songs;
            console.log(arg);
        });
    },
    methods: {
        playTrack($index) {
            var _this = this;
            this.player = new Howl({
                src: [this.basePath + '/' + this.songs[$index]]
            });
            this.player.on('end', function() {
                _this.playNextSong();
            });
            this.currentTrack = $index;
            this.player.play();
            this.isPlaying = true;
        },
        pause() {
            this.player.pause();
            this.isPlaying = false;
        },
        resume() {
            this.player.play();
            this.isPlaying = true;
        },
        playNextSong() {
            this.playTrack((this.currentTrack+1) % this.songs.length);
        }
    }
  }
</script>
