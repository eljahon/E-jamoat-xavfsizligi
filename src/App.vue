<template>
  <v-app>
    <router-view/>
    <notifications/>
  </v-app>
</template>

<script>
    import VTable from "@/components/ui/Vtable";
    export default {
        components: {VTable}
    }
</script>