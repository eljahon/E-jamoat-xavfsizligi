<template>
  <v-menu
    v-model="dialog"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px">
    <template v-slot:activator="{ on, attrs }">
      <validation-provider :name="name" :rules="rules" v-slot="{errors}">
        <v-text-field
          :error-messages="errors[0]"
          v-model="value"
          readonly
          v-bind="$attrs"
          v-on="on"
          outlined
          hide-details
          dense
          :id="name"
          :append-icon="icon"
          class="append_icon_date"
        >
          <template #append>
            <v-icon class="mt-1" v-if="!clearable || !value" x-small>fas fa-calendar-alt</v-icon>
            <v-btn v-else @click="$emit('input', null)" style="margin-top: 3px;" x-small icon>
              <v-icon x-small>fas fa-times</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </validation-provider>
    </template>
    <v-date-picker
      @input="input" :value="dateFormatIso"></v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    name: 'CustomDatePicker',
    data: () => ({
      dialog: false,
    }),
    props: {
      rules: {
        type: Object | String | Array
      },
      value: {},
      name: {
        type: String
      },
      icon: {
        type: String
      },
      clearable: {
        type: Boolean,
        default: false
      },
      hideDetails: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      input(val) {
        this.$emit('input', val)
        this.dialog = false
      }
    },
    computed: {
      dateFormatIso() {
        return this.value && !isNaN(new Date(this.value).getTime()) ? new Date(this.value).toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10)
      }
    },

  }
</script>

<style scoped>

</style>
