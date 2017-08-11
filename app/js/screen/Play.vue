<template>
    <div class="play screen">
        <h2>Current playing</h2>
        <button @click="addSong()">Add song</button>
        <!--<player></player>-->
    </div>
</template>

<script>
    //    import Player from '../components/Player.vue'
    import Constant from '../core/Constant'

    export default {
        methods: {
            addSong() {
                this.$emit('invokeAction', Constant.ACTION_OPEN_ADD_SONG_DIALOG);
            }
        }
    }
</script>

