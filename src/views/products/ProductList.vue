<template>
  <div>
    <a-card :title="$t('product_list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addProduct">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allProduct"
        :loading="loadProduct"
        :rowKey="record => record.id"
        :pagination="paginationProduct"
        @change="changePagination"
        bordered
      >
        <template slot="status" slot-scope="is_active">
          <a-tag v-if="is_active" color="#108ee9">{{ $t('active') }}</a-tag>
          <a-tag v-else color="#f00">{{ $t('inactive') }}</a-tag>
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title"> Preview </template>
            <a-button style="margin: 0 2px" type="primary" @click="previewProduct(item)" icon="eye" ghost></a-button>
          </a-tooltip>
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button style="margin: 0 2px" id="buttonUpdate" type="primary" @click="editProduct(item)" icon="edit"></a-button>
          </a-tooltip>
          <a-popconfirm
            placement="topRight"
            slot="extra"
            :title="$t('deleteMsg')"
            @confirm="removeCategory(item)"
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
        <template slot="image" slot-scope="item">
            <img :src="item" style="width: 160px; height: 120px; object-fit: cover; transform: scale(0.7)"/>
        </template>
      </a-table>
<!--      <img :src="image" />-->
    </a-card>
    <!-- MODALS -->
    <product-create ref="ProductCreate" :params="params" :editable="false"></product-create>
    <product-create ref="ProductEdit" :params="params" :slug="slug" :editable="true"></product-create>
    <product-view ref="ProductView"></product-view>
  </div>
</template>
<script>
import ProductCreate from '@/views/products/ProductCreate'
import { mapActions, mapGetters } from 'vuex'
import ProductPreview from '@/views/products/ProductPreview'
export default {
  components: {
    'product-create': ProductCreate,
    'product-view': ProductPreview
  },
  data() {
    return {
      visible: false,
      loading: false,
      slug: null,
      image: '',
      columns: [
        {
          title: 'Image',
          dataIndex: 'image',
          align: 'center',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: 'Name',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Slug',
          dataIndex: 'slug',
        },
        {
          title: 'Price',
          dataIndex: 'price',
        },
        {
          title: this.$t('status'),
          dataIndex: 'active',
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
          pageSize: 10,
          total: null,
        },
        search: '',
        categoryId: this.$route.params.categoryId
      },
    }
  },
  watch: {
    slug (e) {
      console.log(e)
    }
  },
  methods: {
    ...mapActions(['getAllProduct', 'updateProduct', 'getAttrByLang', 'getProductBySlug', 'deleteProduct']),
    editProduct(item) {
      console.log(item)
      this.slug = item.slug
      this.$nextTick(() => {
        this.$refs.ProductEdit.show()
      })
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllProduct(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllProduct(this.params)
    },
    removeCategory (item) {
      console.log(item)
      this.deleteProduct(item.slug).then(res => {
        this.getAllProduct(this.params)
      })
    },
    previewProduct(item) {
      this.$refs.ProductView.product = item
      this.$refs.ProductView.show()
      console.log(item)
    },
    addProduct () {
      this.$refs.ProductCreate.show()
    }
  },
  computed: {
    ...mapGetters(['allProduct', 'loadProduct', 'paginationProduct']),
  },
  mounted() {
    this.getAttrByLang('ru')
    this.getAttrByLang('uz')
    this.getAttrByLang('en')
    this.getAllProduct(this.params)
    this.$store.dispatch('getAllCategory', {
      pagination: {
        current: 1,
        pageSize: 1000,
        total: null,
      },
      search: '',
    })
  },
}
</script>
