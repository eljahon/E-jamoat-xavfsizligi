<template>
    <transition name="fade-transition">
        <div class="loading_block" v-if="value">
          <div class="loader"></div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: ['value']
    }
</script>

