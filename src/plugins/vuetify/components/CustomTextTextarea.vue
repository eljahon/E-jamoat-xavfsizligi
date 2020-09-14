<template>
  <validation-provider :name="label || name" :vid="vid" v-slot="{errors}" :rules="rules" tag="div">
    <v-textarea
      :error-messages="errors[0]"
      outlined
      :value="value"
      :label="label"
      v-on="$listeners"
      @input="val => $emit('input', val)"
      v-bind="$attrs"
      name="input-7-4"
    ></v-textarea>
  </validation-provider>
</template>

<script>
  export default {
    name: 'CustomTextTextarea',
    props: {
      label: {
        type: String
      },
      name: {
        type: String
      },
      vid: {
        type: String
      },
      value: {},
      rules: {}
    },
  }
</script>

<style scoped>

</style>