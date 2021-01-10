<template>
  <div>
    <a-card size="small" :title="$t('supplier_store.list')" style="width: 100%">
      <a-button size="small" type="primary" slot="extra" @click="addItem">{{ $t('add') }}</a-button>
      <a-table
        :columns="columns"
        :data-source="allSupplierStores"
        :loading="loadSupplierStore"
        :rowKey="item => item.id"
        :pagination="paginationSupplierStore"
        @change="changePagination"
        size="small"
      >
        <template slot="phone" slot-scope="phone">
          +{{ phone }}
        </template>
        <template slot="second_phone" slot-scope="second_phone">
          +{{ second_phone }}
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button style="margin: 0 2px" size='small' type="primary" @click="editItem(item)" icon="edit"></a-button>
          </a-tooltip>
          <a-popconfirm
            placement="topRight"
            slot="extra"
            :title="$t('deleteMsg')"
            @confirm="removeItem(item)"
            :okText="$t('yes')"
            :cancelText="$t('no')"
          >
            <a-tooltip>
              <template slot="title">{{ $t('delete') }}</template>
              <a-button
                style="margin: 0 2px"
                size='small'
                type="danger"
                icon="delete"
              ></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>

    <!-- MODALS -->
    <supplier-store-create ref="createSupplierStore" :editable="false" :params="params"/>
    <supplier-store-create ref="editSupplierStore" :editable="true" :params="params"/>
  </div>
</template>
<script>
import supplierStoreCreate from './SupplierStoreCreateWithUpdate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'supplier-store-create': supplierStoreCreate,
  },
  data() {
    return {
      visible: false,
      loading: false,
      slug: null,
      columns: [
        {
          title: this.$t('phone'),
          dataIndex: 'phone',
          scopedSlots: { customRender: 'phone' },
        },
        {
          title: this.$t('second_phone'),
          dataIndex: 'second_phone',
          scopedSlots: { customRender: 'second_phone' },
        },
        {
          title: this.$t('location'),
          dataIndex: 'location'
        },
        {
          title: this.$t('action'),
          key: 'action',
          align: 'center',
          width: '20%',
          scopedSlots: { customRender: 'action' },
        },
      ],
      params: {
        pagination: {
          current: 1,
          pageSize: 15,
          total: null,
        },
        search: '',
      },
    }
  },
  methods: {
    ...mapActions(['getAllSupplierStores', 'deleteSupplierStore', 'getAllLocationsList', 'getAllSuppliersList', 'getAllTreeLocationsList']),
    editItem(item) {
      this.$refs.editSupplierStore.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllSupplierStores(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllSupplierStores(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteSupplierStore(item.id).then(res => {
        this.getAllSupplierStores(this.params)
      })
    },
    addItem () {
      this.$refs.createSupplierStore.show()
    }
  },
  computed: {
    ...mapGetters(['allSupplierStores', 'loadSupplierStore', 'paginationSupplierStore']),
  },
  mounted() {
    this.getAllSupplierStores(this.params)
    this.getAllTreeLocationsList()
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
