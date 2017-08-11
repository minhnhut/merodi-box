<template>
    <div id="app">
        <container>
            <sidebar></sidebar>
            <screen-content>
                <titlebar></titlebar>
                <router-view
                    @invokeAction="processInvokeAction"
                ></router-view>
            </screen-content>
        </container>
        <quick-control></quick-control>
    </div>
</template>

<script>
    import Sidebar from "../layout/Sidebar.vue";
    import Container from "../layout/Container.vue";
    import Titlebar from "../layout/Titlebar.vue";
    import QuickControl from "../layout/QuickControl.vue";
    import ScreenContent from "../layout/ScreenContent.vue";
    import MusicPlayer from "../core/MusicPlayer";
    import Constant from "../core/Constant";
    import Song from "../models/Song";

    import {ipcRenderer} from "electron";

    export default {
        components: {
            ScreenContent,
            QuickControl,
            Titlebar,
            Container,
            Sidebar
        },
        mounted() {
            var _this = this;
            ipcRenderer.on('modal-file-content', function(event, arg) {
                _this.basePath = arg.basePath;
                _this.songs = arg.songs;
                console.log(arg.songs);
                arg.songs.forEach(song => {
                    _this.player.addSong(new Song(song, arg.basePath + '/' + song))
                });
            });
        },
        data () {
            return {
                drawer: true,
                items: [
                    { path: '/', icon: 'dashboard' },
                    { path: 'About', icon: 'question_answer' }
                ],
                mini: false,
                right: null,
                player: new MusicPlayer()
            }
        },
        methods: {
            processInvokeAction(actionName) {
                switch (actionName) {
                    case Constant.ACTION_OPEN_ADD_SONG_DIALOG:
                        ipcRenderer.send(Constant.INVOKE_MAIN_PROCESS_FILE_DIALOG);
                        break;
                }
            }
        }
    }
</script>

<style lang="scss">
    #app {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: $appBackground;
        overflow: hidden;
        color: $secondary;
        font-family: Roboto;
    }

    .rect-button {
        width: $barSize;
        height: $barSize;
        box-sizing: border-box;
        display: inline-block;
        padding: $barSize/4 0;
        text-align: center;
        cursor: pointer;
        @include transition();
        user-select: none;
    }

    .screen {
        padding: 0 $screenContentRightMargin;
    }
</style>