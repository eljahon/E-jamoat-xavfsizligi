<template>
  <div>
    <a-card :title="$t('product_list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="() => { $router.push({ name: 'ProductsCreate', params: { step: 1 } }) }">{{ $t('add') }}</a-button>
      <a-divider>{{ $t('filters') }}</a-divider>
      <a-row style="margin: 20px 0">
        <a-col style='padding-right: 5px' :span="4">
          <a-input v-debounce="search" :placeholder="$t('search.name')" />
        </a-col>
        <a-col style='padding-right: 5px; padding-left: 5px' :span="4">
          <a-select allowClear show-search :placeholder="$t('category')" :filter-option="filterOption" style="width: 100%" @change="filterCategory">
            <a-select-option v-for='c in category' :key='c.id' :value='c.id'>{{ c.name_uz }}</a-select-option>
          </a-select>
        </a-col>
        <a-col style='padding-right: 5px; padding-left: 5px' :span="4">
          <a-select allowClear show-search :placeholder="$t('brand')" :filter-option="filterOption" style="width: 100%" @change="filterBrand">
            <a-select-option v-for='b in allBrands' :key='b.id' :value='b.id'>{{ b.name }}</a-select-option>
          </a-select>
        </a-col>
        <a-col style='padding-right: 5px; padding-left: 5px' :span="4">
          <a-input v-debounce="search" :placeholder="$t('supplier')" />
        </a-col>
        <a-col style='padding-right: 5px; padding-left: 5px' :span="4">
          <a-select allowClear show-search :placeholder="$t('measure')" :filter-option="filterOption" style="width: 100%" @change="filterMeasure">
            <a-select-option v-for='m in measure' :key='m.id' :value='m.id'>{{ m.name_uz }}</a-select-option>
          </a-select>
        </a-col>
        <a-col style='padding-left: 5px' :span="4">
          <a-select allowClear :placeholder="$t('status')" style="width: 100%" @change="filterStatus">
            <a-select-option :value='10'>{{ $t('active') }}</a-select-option>
            <a-select-option :value='0'>{{ $t('inactive') }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allProduct"
        :loading="loadProduct"
        :rowKey="item => item.id"
        :pagination="paginationProduct"
        @change="changePagination"
      >
        <template slot="popular" slot-scope="is_popular">
          <a-tag v-if="is_popular" color="green">{{ $t('popular') }}</a-tag>
          <a-tag v-else color="red">{{ $t('popular.no') }}</a-tag>
        </template>
        <template slot="image" slot-scope="image">
          <div class="imagePreview">
            <img v-if="image" :src="image" :alt="image">
            <img v-else src="../../assets/upload.jpg" :alt="image">
          </div>
        </template>
        <template slot="status" slot-scope="status">
          <a-tag v-if="status === 10" color="blue">{{ $t('active') }}</a-tag>
          <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
        </template>
<!--        <template slot="image" slot-scope="item">-->
<!--          <div class="imagePreview">-->
<!--            <img :src="item.logo_url">-->
<!--          </div>-->
<!--        </template>-->
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button style="margin: 0 2px" type="primary" @click="editItem(item)" icon="edit"></a-button>
          </a-tooltip>
          <a-popconfirm
            placement="topRight"
            slot="extra"
            :title="$t('deleteMsg')"
            @confirm="removeProduct(item.id)"
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
<!--    <create ref="createBrand" :editable="false" :params="params"/>-->
<!--    <create ref="editItem" :editable="true" :params="params"/>-->
  </div>
</template>
<script>
import Create from './ProductsCreateWithUpdate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'create': Create,
  },
  data() {
    return {
      visible: false,
      loading: false,
      columns: [
        {
          title: 'Image',
          dataIndex: 'avatar',
          align: 'center',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: this.$t('name'),
          dataIndex: 'name',
        },
        {
          title: this.$t('category'),
          dataIndex: 'category_name',
        },
        {
          title: this.$t('brand'),
          dataIndex: 'brand_name',
        },
        {
          title: this.$t('measures'),
          dataIndex: 'measure_name',
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
          width: '15%',
          scopedSlots: { customRender: 'action' },
        },
      ],
      category: [],
      measure: [],
      params: {
        pagination: {
          current: 1,
          pageSize: 15,
          total: null,
        },
        search: '',
        category: null,
        brand: null,
        supplier: null,
        measure: null,
        status: null
      },
    }
  },
  methods: {
    ...mapActions(['getAllProduct', 'deleteProduct', 'getListCategory', 'getAllBrandsList', 'getAllSuppliersList', 'getAllMeasureList']),
    editItem(item) {
      this.$router.push({
        name: 'ProductsEdit',
        params: {
          step: 1
        },
        query: {
          group_id: item.group_id
        }
      })
    },
    removeProduct(i) {
      this.deleteProduct(i).then(res => {
        this.getAllProduct(this.params)
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
    removeItem (item) {
      this.deleteProduct(item.id).then(res => {
        this.getAllProduct(this.params)
      })
    },
    addItem () {
      this.$refs.createBrand.show()
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    filterCategory (e) {
      this.params.category = e
      this.getAllProduct(this.params)
    },
    filterBrand (e) {
      this.params.brand = e
      this.getAllProduct(this.params)
    },
    filterMeasure (e) {
      this.params.measure = e
      this.getAllProduct(this.params)
    },
    filterStatus (e) {
      this.params.status = e
      this.getAllProduct(this.params)
    }
  },
  computed: {
    ...mapGetters(['allProduct', 'loadProduct', 'paginationProduct', 'allBrands', 'allSuppliersList']),
  },
  mounted() {
    this.getAllProduct(this.params)
    this.getListCategory().then(res => {
      this.category = res
    })
    this.getAllBrandsList()
    this.getAllSuppliersList()
    this.getAllMeasureList().then(res => {
      this.measure = res
    })
  },
}
</script>
<style>
.imagePreview img {
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  object-fit: cover;
}
</style>
