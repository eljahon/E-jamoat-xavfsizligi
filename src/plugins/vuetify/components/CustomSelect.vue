<template>
  <validation-provider tag="div" :name="name || label" v-slot="{errors}" :rules="rules" :vid="vid">
    <v-select
        outlined
        :error-messages="errors[0]"
        v-bind="$attrs"
        :label="label"
        :item-text="itemText"
        :item-value="itemValue"
        @change="val => $emit('input', val)"
        :value="value"
        dense
        :id="id">
      <template v-if="customSelection" v-slot:selection="{ item, index }">
        <slot name="selection" :item="item" :index="index"></slot>
      </template>
    </v-select>
  </validation-provider>
</template>

<script>
import {generateText} from "@/utils/pureFunctions";

export default {
  name: 'CustomSelect',
  inheritAttrs: false,
  props: {
    customSelection: {
      type: Boolean
    },
    itemText: {
      default: 'name'
    },
    itemValue: {
      default: "id"
    },
    rules: {
      type: String, Object,
      default: null
    },
    name: {
      type: String,
    },
    label: {
      type: String
    },
    value: {},
    vid: {
      type: String,
    }
  },
  data() {
    return {
      id: null
    }
  },
  mounted() {
    this.id = generateText(10)
  }
}
</script>
