<template>
    <v-list>
        <template v-for="(song, $index) in songs">
            <v-list-tile v-bind:key="song" v-on:click="playTrack($index)">
                <v-list-tile-content>
                    <v-list-tile-title v-html="song"></v-list-tile-title>
                    <v-list-tile-sub-title>test</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list>
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
