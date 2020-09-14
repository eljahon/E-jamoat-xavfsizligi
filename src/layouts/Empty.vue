<template>
  <div>
    <full-loading :value="loading"></full-loading>
    <router-view></router-view>
  </div>
</template>

<script>
    import FullLoading from "@/components/ui/loading/full-loading"
    export default {
        computed: {
            loading() {
                return this.$store.getters.loading
            }
        },
        components: {FullLoading}
    }
</script>