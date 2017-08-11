<template>
    <div class="sidebar">
        <router-link :to="item.path" :key="item.path" v-for="item in menuItems">
            <div class="rect-button">
                <i class="material-icons">{{item.icon}}</i>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'Sidebar',
        data: () => {
            return {
                menuItems: [
                    {path: '/', icon: 'queue_music'},
                    {path: '/library', icon: 'queue_music'}
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar {
        position: absolute;
        left: 0;
        top: 0;
        bottom: $quickControlHeight;
        width: $sidebarWidth;
        box-shadow: 2px 0 3px rgba(0, 0, 0, 0.3);
        background: -webkit-linear-gradient(top, #161416 0%,#000000 100%); /* Chrome10-25,Safari5.1-6 */
    }

    .rect-button {
        color: $secondary;

        &:hover {
            color: $highlight;
        }
    }
</style>