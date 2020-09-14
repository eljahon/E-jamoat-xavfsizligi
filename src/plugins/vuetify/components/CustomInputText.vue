<template>
  <validation-provider tag="div" :name="name||label" :vid="vid" v-slot="{errors}" :rules="rules">
    <v-text-field
      :error-messages="errors[0]"
      v-bind="$attrs"
      :label="label"
      :type="cusType"
      :value="value"
      dense
      outlined
      @input="val => $emit('input', val)"
      @keypress="onKeyPress"
      v-on="$listeners">
      <template #prepend-inner><slot name="prepend-inner"></slot></template>
      <template #append>
        <slot name="append">
          <v-btn tabindex="-1" class="mt-n1" icon v-if="type=== 'password'" @click="changeType">
            <v-icon x-small>{{cusType === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash'}}</v-icon>
          </v-btn>
        </slot>
      </template>
    </v-text-field>
  </validation-provider>
</template>

<script>
  import {generateText} from "@/utils/pureFunctions";
  import {numberOnly, alphaOnly} from "@/utils/pureFunctions";


  export default {
    name: "CustomInputText",
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
      only: {
        type: String
      },
      type: {
        type: String,
        default: 'text'
      },

    },
    data() {
      return {
        id: null,
        cusType: this.type
      }
    },
    methods: {
      changeType() {
        this.cusType === 'password' ? this.cusType = 'text' : this.cusType = 'password'
      },
      onKeyPress() {
        switch (this.only) {
          case 'number':
            return numberOnly()
          case 'alpha':
            return alphaOnly()
          default:
            return true
        }
      }
    },

  }
</script>
