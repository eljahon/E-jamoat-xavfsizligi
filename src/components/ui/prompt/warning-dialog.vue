<template>
  <v-dialog @click:outside="close" :value="value" :max-width="maxWidth">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ description }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="primary" small @click="cancel">Нет</v-btn>
        <v-btn color="error" small @click="apply" :loading="loading">Да удалить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'warning-dialog',
  props: {
    maxWidth: {
      type: Number,
      default: 350
    },
    value: {
      type: Boolean
    },
    title: {
      type: String,
      default: 'Предупреждение!'
    },
    description: {
      type: String,
      default: 'Вы действительно хотите это удалить?'
    }
  },
  data() {
    return {
      loading: false
    }
  },
  watch: {
    value(val) {
      if (val) this.$emit('opened')
      else this.$emit('closed')
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    apply() {
      this.$emit('apply');
      this.close()
    },
    cancel() {
      this.$emit('cancel');
      this.close()
    },
    setLoading(val) {
      this.loading = val
    }
  }
}
</script>
