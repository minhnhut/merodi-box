new Vue({
    el: '#player',
    data: {
        testProp: 'abc',
        musicSelected: false,
        songs: [],
        isPlaying: false,
        currentTrack: null,
        player: null,
        basePath: '',
        listVisible: true
    },
    mounted: function() {
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
        playTrack: function($index) {
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
        pause: function() {
            this.player.pause();
            this.isPlaying = false;
        },
        resume: function() {
            this.player.play();
            this.isPlaying = true;
        },
        playNextSong: function() {
            this.playTrack((this.currentTrack+1) % this.songs.length);
        },
        toggleList: function() {
            this.listVisible = !this.listVisible;
            const ipc = require('electron').ipcRenderer;
            ipc.sendSync('resize-height', this.listVisible ? 600 : 200);
        }
    }
})