<template>
  <a-modal width="700px" centered v-model="visible" @cancel="hide">
    <template slot="footer">
      <a-button type="primary" key="submit" @click="hide">
        OK
      </a-button>
    </template>
    <a-descriptions v-if='items' title="User Info" layout="vertical" bordered>
      <a-descriptions-item :label="$t('name')">
        {{ items.name }}
      </a-descriptions-item>
      <a-descriptions-item :label="$t('phone')">
        +{{ items.phone }}
      </a-descriptions-item>
      <a-descriptions-item :label="$t('email')">
        {{ items.email }}
      </a-descriptions-item>
      <a-descriptions-item :label="$t('complaint_type')">
        {{ items.complaint_type }}
      </a-descriptions-item>
      <a-descriptions-item :label="$t('comment')">
        {{ items.comment }}
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      items: null
    }
  },
  methods: {
    show (data) {
      this.items = data
      console.log(data)
      this.visible = true
    },
    hide () {
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
