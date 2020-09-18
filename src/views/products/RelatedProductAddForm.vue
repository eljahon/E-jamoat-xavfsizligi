<template>

  <a-select
    mode="multiple"
    style="width: 100%"
    placeholder="Please select"
    @change="handleChange"
  >
    <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
      {{ (i + 9).toString(36) + i }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
name: "RelatedProductAddForm"
}
</script>

<style scoped>

</style>