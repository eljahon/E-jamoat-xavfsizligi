<template>
  <a-list
    itemLayout="horizontal"
    :dataSource="data"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
      <a-list-item-meta>
        <a slot="title">{{ item.title }}</a>
        <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value"> : </span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
      </a-list-item-meta>
      <template v-if="item.actions">
        <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
      </template>

    </a-list-item>
  </a-list>
</template>

<script>
export default {
  data () {
    return {
      data: [
        { title: 'Lorem', description: 'Lorem', value: 'Lorem', actions: { title: 'Lorem', callback: () => { this.$message.info('This is a normal message') } } },
        { title: 'Lorem', description: 'Lorem', value: '138****8293', actions: { title: 'Lorem', callback: () => { this.$message.success('This is a message of success') } } },
        { title: 'Lorem', description: 'Lorem，Lorem', value: '', actions: { title: 'Lorem', callback: () => { this.$message.error('This is a message of error') } } },
        { title: 'Lorem', description: 'Lorem', value: 'ant***sign.com', actions: { title: 'Lorem', callback: () => { this.$message.warning('This is message of warning') } } },
        { title: 'MFA Lorem', description: 'Lorem MFA Lorem，Lorem，Lorem', value: '', actions: { title: 'Lorem', callback: () => { this.$message.info('This is a normal message') } } }
      ]
    }
  }
}
</script>

<style scoped>

</style>
