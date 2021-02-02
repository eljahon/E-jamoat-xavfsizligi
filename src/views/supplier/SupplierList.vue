<template>
  <div>
    <a-card size="small" :title="$t('supplier.list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addItem">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        size="small"
        :columns="columns"
        :data-source="allSuppliers"
        :loading="loadSupplier"
        :rowKey="item => item.id"
        :pagination="paginationSupplier"
        @change="changePagination"
      >
        <template slot="phone" slot-scope="phone">
          +998{{ phone }}
        </template>
        <template slot="store_count" slot-scope="store_count">
          <a-button type='default' size='small'>{{ store_count }}</a-button>
        </template>
        <template slot="product_count" slot-scope="product_count">
          <a-button type='default' size='small'>{{ product_count }}</a-button>
        </template>
        <template slot="status" slot-scope="status">
          <a-tag v-if="status === 10" color="blue">{{ $t('active') }}</a-tag>
          <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button size="small" style="margin: 0 2px" type="primary" @click="editItem(item)" icon="edit"></a-button>
            <a-button size="small" style="margin: 0 2px" type="default" @click="preview(item)" icon="eye"></a-button>
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
                size="small"
                style="margin: 0 2px"
                type="danger"
                icon="delete"
              ></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>

    <!-- MODALS -->
    <supplier-create ref="createSupplier" :editable="false" :params="params"/>
    <supplier-create ref="editSupplier" :editable="true" :params="params"/>
<!--    <preview ref="preview"/>-->
  </div>
</template>
<script>
import supplierCreate from './SupplierCreateWithUpdate'
import Preview from '@/views/supplier/Preview'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'supplier-create': supplierCreate,
    'preview': Preview
  },
  data() {
    return {
      visible: false,
      loading: false,
      slug: null,
      columns: [
        {
          title: this.$t('name'),
          dataIndex: 'name',
        },
        {
          title: this.$t('phone'),
          dataIndex: 'phone',
          scopedSlots: { customRender: 'phone' },
        },
        {
          title: this.$t('email'),
          dataIndex: 'email',
        },
        {
          title: this.$t('address'),
          dataIndex: 'address_uz',
        },
        {
          title: this.$t('store_count'),
          dataIndex: 'store_count',
          align: 'center',
          scopedSlots: { customRender: 'store_count' }
        },
        {
          title: this.$t('product_count'),
          dataIndex: 'product_count',
          align: 'center',
          scopedSlots: { customRender: 'product_count' }
        },
        {
          title: this.$t('status'),
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
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
    ...mapActions(['getAllSuppliers', 'deleteSupplier']),
    editItem(item) {
      this.$refs.editSupplier.show(item)
    },
    preview (item) {
      this.$router.push({
        name: 'supplierPreview',
        params: {
          id: item.id
        }
      })
      // this.$refs.preview.show()
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllSuppliers(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllSuppliers(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteSupplier(item.id).then(res => {
        this.getAllSuppliers(this.params)
      })
    },
    addItem () {
      this.$refs.createSupplier.show()
    }
  },
  computed: {
    ...mapGetters(['allSuppliers', 'loadSupplier', 'paginationSupplier']),
  },
  mounted() {
    this.getAllSuppliers(this.params)
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
