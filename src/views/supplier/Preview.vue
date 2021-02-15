<template>
<!--  <a-modal title="Preview" width="800px" centered v-model="visible" @cancel="hide">-->
  <a-card :title="$t('suppliers') + ` ${ supplierInfo ? supplierInfo.name : '' }`">
    <a-tabs type="card" :activeKey="activeKey" size="small" @change="callback">
      <a-tab-pane key="1" :tab="$t('information')">
        <a-spin size="large" :spinning="loading">
          <a-descriptions v-if="supplierInfo" layout="vertical" bordered>
            <a-descriptions-item :label="$t('name')">
              {{ supplierInfo.name }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('phone')">
              {{ supplierInfo.phone }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('email')">
              {{ supplierInfo.email }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('address') + ` UZ`">
              {{ supplierInfo.address_uz }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('address') + ` RU`">
              {{ supplierInfo.address_ru }}
            </a-descriptions-item>
            <a-descriptions-item :label="$t('status')">
              <a-tag v-if="supplierInfo.status === 10" color="blue">{{ $t('active') }}</a-tag>
              <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
            </a-descriptions-item>
          </a-descriptions>
        </a-spin>
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
import { mapActions } from 'vuex'
export default {
  components: {
    'store': SupplierStore,
    'store-product': SupplierProduct
  },
  data () {
    return {
      activeKey: '1',
      supplierInfo: null,
      loading: false
    }
  },
  methods: {
    ...mapActions(['getSupplierId']),
    callback (e) {
      this.activeKey = e
      this.$router.push({
        name: 'supplierPreview',
        params: {
          id: this.$route.params.id
        },
        query: {
          key: e
        }
      })
      console.log(e)
    }
  },
  mounted() {
    // eslint-disable-next-line no-unreachable
    if (this.$route.query.key) {
      this.activeKey = this.$route.query.key
    }
    if (this.$route.query.key === '1') {
      this.loading = true
      this.getSupplierId(this.$route.params.id).then(res => {
        this.supplierInfo = res.data
      }).finally(() => {
        this.loading = false
      })
    }
  }

}
</script>

<style scoped>

</style>
