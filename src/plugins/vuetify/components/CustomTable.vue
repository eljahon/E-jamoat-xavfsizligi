<template>
  <v-data-table
    v-bind="$attrs"
    :headers="headers"
    hide-default-footer>
    <slot
      v-for="header in headers"
      :name="`item.${header.value}`"
    ></slot>
  </v-data-table>
</template>

<script>
  export default {
    name: 'custom-table',
    props: {
      headers: {
        type: Array,
        default: () => []
      },
      items: {
        type: Array,
        default: () => []
      }
    }
  }
</script>