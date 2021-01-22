<template>
<!--  <a-modal title="Preview" width="800px" centered v-model="visible" @cancel="hide">-->
  <a-card>
    <a-tabs type="card" size="small" @change="callback">
      <a-tab-pane key="1" :tab="$t('information')">
        Content of Tab Pane 1
      </a-tab-pane>
      <a-tab-pane key="2" :tab="$t('supplier_store')">
        <store :supplier='$route.params.id'/>
      </a-tab-pane>
      <a-tab-pane key="3" :tab="$t('supplier_store.product')">
        <store-product :supplier='$route.params.id'/>
      </a-tab-pane>
    </a-tabs>
  </a-card>
<!--  </a-modal>-->
</template>

<script>
import SupplierStore from '@/views/supplierStore/SupplierStoreList'
import SupplierProduct from '@/views/supplierProduct/SupplierProductList'
export default {
  components: {
    'store': SupplierStore,
    'store-product': SupplierProduct
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
        name: 'supplierList'
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
