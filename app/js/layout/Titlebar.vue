<template>
    <div class="title">
        <div class="right-buttons">
            <div class="close button" v-on:click="minimize()">
                <i class="material-icons">expand_more</i>
            </div>
            <div class="button" v-on:click="maximize()">
                <i class="material-icons">fullscreen</i>
            </div>
            <div class="button" v-on:click="close()">
                <i class="material-icons">close</i>
            </div>
        </div>
    </div>
</template>

<script>
    // Retrieve remote BrowserWindow
    const {BrowserWindow} = require('electron').remote;
    export default {
        name: 'Titlebar',
        methods: {
            minimize() {
                let window = BrowserWindow.getFocusedWindow();
                window.minimize();
            },
            close() {
                let window = BrowserWindow.getFocusedWindow();
                window.close();
            },
            maximize() {
                let window = BrowserWindow.getFocusedWindow();
                if(window.isMaximized()){
                    window.unmaximize();
                }else{
                    window.maximize();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .title {
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        -webkit-user-select: none;
        -webkit-app-region: drag;
        height: $titlebarHeight;
    }

    $buttonSize: 24px;
    .right-buttons {
        -webkit-app-region: no-drag;
        width: $buttonSize * 5;
        padding: 10px;
        float: right;
        text-align: right;
        margin-right: $screenContentRightMargin;

        .button {
            width: 34px;
            height: 34px;
            display: inline-block;
            color: darken($secondary, 30%);
            box-sizing: border-box;
            @include transition();
            @include border-radius();
            text-align: center;
            cursor: pointer;
            padding: 5px;

            &:hover {
                color: $secondary;
                background: lighten($primary, 5%);

            }
        }
    }


</style>