<template>
  <div>
    <a-card size="small" :title="$t('supplier.product.list')" style="width: 100%">
      <a-button size='small' type="primary" slot="extra" @click="addItem">{{ $t('add') }}</a-button>
<!--      <a-row style="margin: 10px 0">-->
<!--        <a-col :span="16"></a-col>-->
<!--        <a-col :span="8">-->
<!--          <a-input v-debounce="search" :placeholder="$t('search')" />-->
<!--        </a-col>-->
<!--      </a-row>-->
      <a-table
        size="small"
        :columns="columns"
        :data-source="allSupplierProduct"
        :loading="loadSupplierProduct"
        :rowKey="item => item.id"
        :pagination="paginationSupplierProduct"
        :scroll="{ x: 1500 }"
        @change="changePagination"
      >
        <template slot="avatar" slot-scope="avatar">
          <div class="imagePreview">
            <img :src="avatar">
          </div>
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button style="margin: 0 2px" type="primary" @click="editItem(item)" icon="edit"></a-button>
<!--            <a-button size="small" style="margin: 0 2px" type="default" @click="preview(item)" icon="eye"></a-button>-->
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
import supplierCreate from './SupplierProductCreateWithUpdate'
// import Preview from '@/views/supplier/Preview'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['supplier'],
  components: {
    'supplier-create': supplierCreate,
    // 'preview': Preview
  },
  data() {
    return {
      visible: false,
      loading: false,
      slug: null,
      columns: [
        {
          title: this.$t('image'),
          dataIndex: 'avatar',
          align: 'center',
          scopedSlots: { customRender: 'avatar' }
        },
        {
          title: this.$t('brands'),
          dataIndex: 'brand_name',
        },
        {
          title: this.$t('category'),
          dataIndex: 'category_name',
        },
        {
          title: this.$t('product'),
          dataIndex: 'name',
        },
        {
          title: this.$t('measures'),
          dataIndex: 'measure_name',
        },
        {
          title: this.$t('stock'),
          dataIndex: 'stock',
        },
        {
          title: this.$t('price'),
          dataIndex: 'price',
        },
        {
          title: this.$t('discount'),
          dataIndex: 'discount',
        },
        {
          title: this.$t('old_price'),
          dataIndex: 'old_price',
        },
        {
          title: this.$t('ball'),
          dataIndex: 'ball',
        },
        {
          title: this.$t('unicode'),
          dataIndex: 'unicode',
        },
        {
          title: this.$t('action'),
          key: 'action',
          align: 'center',
          width: '10%',
          scopedSlots: { customRender: 'action' },
        },
      ],
      params: {
        pagination: {
          current: 1,
          pageSize: 15,
          total: null,
        },
        id: this.supplier,
        search: '',
      },
    }
  },
  methods: {
    ...mapActions(['getAllSupplierProduct', 'deleteSupplierProduct', 'getAllSupplierStores']),
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
      this.getAllSupplierProduct(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllSupplierProduct(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteSupplierProduct(item.id).then(res => {
        this.getAllSupplierProduct(this.params)
      })
    },
    addItem () {
      this.$refs.createSupplier.show()
    }
  },
  computed: {
    ...mapGetters(['allSupplierProduct', 'loadSupplierProduct', 'paginationSupplierProduct']),
  },
  mounted() {
    this.getAllSupplierProduct(this.params)
    this.getAllSupplierStores(this.params)
    // this.getByIdSupplierStore(this.$route.params.id)
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
.imagePreview img {
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  object-fit: cover;
}
</style>
