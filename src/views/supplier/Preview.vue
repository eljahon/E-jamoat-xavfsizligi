<template>
  <a-modal title="Preview" width="800px" centered v-model="visible" @cancel="hide">
    <a-tabs type="card" size="small" @change="callback">
      <a-tab-pane key="1" tab="Information">
        Content of Tab Pane 1
      </a-tab-pane>
      <a-tab-pane key="2" tab="Store">
        <store/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Store Products">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
import SupplierStore from '@/views/supplierStore/SupplierStoreList'
export default {
  components: {
    'store': SupplierStore
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    callback (e) {
      console.log(e)
    },
    hide () {
      this.$router.push({
        name: 'supplierList',
        query: {

        }
      })
      this.visible = false
    },
    show () {
      this.visible = true
    }
  }

}
</script>

<style scoped>

</style>
