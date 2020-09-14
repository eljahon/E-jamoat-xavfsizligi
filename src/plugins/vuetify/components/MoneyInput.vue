<template>
  <validation-provider tag="div" :name="name||label" :vid="vid" v-slot="{errors}" :rules="rules">
    <v-text-field
      :label="label"
      outlined
      dense
      v-on="$listeners"
      :value="value"
      v-bind="$attrs"
      @input="val => $emit('input', val)"
      :error-messages="errors[0]"
      v-currency-directive="options">
    </v-text-field>
  </validation-provider>
</template>

<script>
  import {CurrencyDirective} from 'vue-currency-input'

  export default {
    name: "money-input",
    inheritAttrs: false,
    props: {
      label: {
        type: String
      },
      name: {
        type: String,
      },
      vid: {
        type: String,
      },
      value: {},
      rules: {
        type: Object | String | Boolean
      },
      min: {
        type: Number,
        default: 0
      },
      precision: {
        type: Number,
        default: 0
      },
      max: {
      }
    },
    data() {
      return {
        options: {
          currency: null,
          valueRange: {min: this.min, max: this.max },
          precision: this.precision
        }
      }
    },
    directives: {
      CurrencyDirective
    },
    computed: {}
  }
</script>
