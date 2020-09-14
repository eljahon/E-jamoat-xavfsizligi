<template>
  <validation-provider tag="div" :rules="rules" :name="name || label" v-slot="{errors}">
    <v-autocomplete
      :label="label"
      class="search-input"
      @keyup.prevent="search"
      :search-input.sync="searchText"
      :error-messages="errors[0]"
      v-bind="$attrs"
      :item-text="itemText"
      dense
      @input="val => $emit('input', val)"
      :value="value"
      :item-value="itemValue"
      outlined>
      <template #prepend-inner>
        <v-progress-circular
          v-show="loading"
          size="18"
          width="2"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </template>
    </v-autocomplete>
  </validation-provider>
</template>

<script>
  import {debounce} from "@/utils/pureFunctions";

  export default {
    name: 'custom-autocomplete',
    props: {
      value: {},
      name: {},
      label: {},
      rules: {},
      delay: {
        type: Number,
        default: 300
      },
      itemText: {
        type: String,
        default: 'name'
      },
      itemValue: {
        type: String,
        default: 'id'
      }
    },
    data() {
      return {
        loading: false,
        searchText: ''
      }
    },
    methods: {
      clear() {
        this.searchText = ''
      }
    },
    created() {
      this.search = debounce(function (e) {
        this.$emit('search', e.target.value)
      }, this.delay)
    }
  }

</script>