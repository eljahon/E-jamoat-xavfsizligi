<template>
  <v-tooltip top right>
    <template v-slot:activator="{on}">
      <v-btn
          :class="className"
          v-bind="$attrs"
          v-on="{...on, ...$listeners}">
        <slot></slot>
      </v-btn>
    </template>
    <slot name="tooltip"></slot>
  </v-tooltip>
</template>

<script>
export default {
  name: 'btn-with-tooltip',
  props: {
    className: {
      type: String
    }
  }
}
</script>