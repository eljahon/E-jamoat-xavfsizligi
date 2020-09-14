<template>
  <div>
    <v-table/>
    <v-card>
      <v-card-text>
        <custom-select
          :items="[1,2,3,4]"
        ></custom-select>
      </v-card-text>
    </v-card>

  </div>

</template>

<script>
  import VTable from "@/components/ui/Vtable";
  export default {
      components: {VTable}
  }
</script>