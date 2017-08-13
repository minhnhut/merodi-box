<template>
    <div class="play screen">
        <h2>Current playing</h2>
        <ul>
            <li @click="play(index)" v-for="(song, index) in songs">
                {{song.title}}
            </li>
        </ul>
        <button @click="addSong()">Add song</button>
        <!--<player></player>-->
    </div>
</template>

<script>
    //    import Player from '../components/Player.vue'
    import Constant from '../core/Constant'

    export default {
        props: {
            musicPlayer: null
        },
        data: () => {
            return {
                songs: []
            }
        },
        created() {
            console.log(this.musicPlayer);
            this.musicPlayer.on(this.musicPlayer.Event.PLAYLIST_CHANGE, () => {
                this.songs = this.musicPlayer.getPlaylist();
                console.log(this.songs);
            });
        },
        methods: {
            addSong() {
                this.$emit('invokeAction', Constant.ACTION_OPEN_ADD_SONG_DIALOG);
                console.log(this.musicPlayer);
            },
            play($index) {
                this.musicPlayer.setSongByIndex($index);
                this.musicPlayer.play();
            }
        }
    }
</script>

