<template>
    <div class="screen-content">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'ScreenContent'
  }
</script>

<style lang="scss">
    .screen-content {
        position: relative;
        margin-left: $sidebarWidth;
    }
</style>