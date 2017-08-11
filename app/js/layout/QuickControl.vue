<template>
    <div class="quick-control">
        <div class="left">
            <div class="menu-toggle rect-button">
                <i class="material-icons">dehaze</i>
            </div>
            <div class="menu-toggle rect-button" v-on:click="refresh()">
                <i class="material-icons">cached</i>
            </div>
        </div>
        <div class="right">
            <div class="menu-toggle rect-button" v-on:click="refresh()">
                <i class="material-icons">cached</i>
            </div>
            <div class="menu-toggle rect-button" v-on:click="refresh()">
                <i class="material-icons">cached</i>
            </div>
            <div class="menu-toggle rect-button" v-on:click="refresh()">
                <i class="material-icons">pause</i>
            </div>
            <div class="menu-toggle rect-button" v-on:click="refresh()">
                <i class="material-icons">volume up</i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'QuickControl',
        props: {
            volume: [
                Number
            ]
        },
        methods: {
            refresh() {
                window.location.reload();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .quick-control {
        bottom: 0;
        left: 0;
        right: 0;
        height: $quickControlHeight;
        position: absolute;
        background: opacify($primary, 0.9);
    }

    .manu-toggle {
        border-right: $primary;
    }

    .rect-button {
        float: left;
        background: $highlight;
        color: $highlightText;

        &:hover {
            background: darken($highlight, 5%);
        }
    }
</style>