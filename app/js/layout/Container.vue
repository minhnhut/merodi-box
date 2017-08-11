<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'Container'
  }
</script>

<style>
    .container {
        width: 100%;
    }
</style>