<template>
  <div>
    <a-card :title="$t('product_list')" style="width: 100%">
      <a-divider>{{ $t('filters') }}</a-divider>
      <a-row style="margin: 20px 0">
        <a-col style="padding-right: 5px" :span="4">
          <a-input @change="search" allow-clear v-model="params.search" :placeholder="$t('search.name')" />
        </a-col>
        <a-col style="padding-right: 5px; padding-left: 5px" :span="4">
          <a-tree-select
            show-search
            treeNodeFilterProp="name_ru"
            :filterTreeNode="filterTreeNode"
            v-model="params.category"
            :treeData="category"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            :placeholder="$t('category')"
            @change='filterCategory'
            allow-clear
          />
          <!--          <a-select allowClear show-search :placeholder="$t('category')" :filter-option="filterOption" style="width: 100%" @change="filterCategory">-->
          <!--            <a-select-option v-for='c in category' :key='c.id' :value='c.id'>{{ c.name_uz }}</a-select-option>-->
          <!--          </a-select>-->
        </a-col>
        <a-col style='padding-right: 5px; padding-left: 5px' :span="4">
          <a-select allowClear v-model="params.brand" show-search :placeholder="$t('brand')" :filter-option="filterOption" style="width: 100%" @change="filterBrand">
            <a-select-option v-for='b in allBrands' :key='b.id' :value='b.id'>{{ b.name }}</a-select-option>
          </a-select>
        </a-col>
        <a-col style='padding-right: 5px; padding-left: 5px' :span="4">
          <a-input allowClear v-debounce="search" :placeholder="$t('supplier')" />
        </a-col>
        <a-col style='padding-right: 5px; padding-left: 5px' :span="4">
          <a-select allowClear show-search v-model="params.measure" :placeholder="$t('measure')" :filter-option="filterOption" style="width: 100%" @change="filterMeasure">
            <a-select-option v-for='m in measure' :key='m.id' :value='m.id'>{{ m.name_uz }}</a-select-option>
          </a-select>
        </a-col>
        <a-col style='padding-left: 5px' :span="4">
          <a-select v-model="params.status" allowClear :placeholder="$t('status')" style="width: 100%" @change="filterStatus">
            <a-select-option :value='10'>{{ $t('active') }}</a-select-option>
            <a-select-option :value='0'>{{ $t('inactive') }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allProductList"
        :loading="loadProductList"
        :rowKey="item => item.id"
        :row-selection="{
          selectedRowKeys: rowSelection,
          onChange: onSelectChange
        }"
        :pagination="paginationProductList"
        @change="changePagination"
      >
        <template slot="popular" slot-scope="is_popular">
          <a-tag v-if="is_popular" color="green">{{ $t('popular') }}</a-tag>
          <a-tag v-else color="red">{{ $t('popular.no') }}</a-tag>
        </template>
        <template slot="image" slot-scope="image">
          <div class="imagePreview">
            <img v-if="image" :src="image">
            <img v-else src="../../assets/upload.jpg" :alt="image">
          </div>
        </template>
        <template slot="status" slot-scope="status">
          <a-tag v-if="status === 10" color="blue">{{ $t('active') }}</a-tag>
          <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { TreeSelect } from 'ant-design-vue'
import debounce from 'lodash/debounce'
export default {
  components: {
    // 'create': Create,
    'a-tree-select': TreeSelect
  },
  data() {
    this.search = debounce(this.search, 600)
    return {
      visible: false,
      loading: false,
      rowSelection: [],
      columns: [
        {
          title: this.$t('image'),
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
      ],
      category: [],
      measure: [],
      params: {
        page: null,
        search: '',
        category: undefined,
        brand: undefined,
        supplier: undefined,
        measure: undefined,
        status: undefined
      },
    }
  },
  methods: {
    // ...mapActions(['getAllProductList', 'deleteProduct', 'getListCategory', 'getAllBrandsList', 'getAllSuppliersList', 'getAllMeasureList']),
    ...mapActions(['getAllProductList', 'deleteProduct', 'getListCategory', 'getAllBrandsList', 'getAllSuppliersList', 'getAllMeasureList']),
    editItem(item) {
      this.$router.push({
        name: 'ProductGroupsEdit',
        params: {
          step: '1'
        },
        query: {
          group_id: item.group_id
        }
      })
    },
    onSelectChange (e) {
      this.rowSelection = e
      this.$emit('input', e)
    },
    treeDataMap (category) {
      return category.map((c) => {
        if (!c.children) {
          return {
            title: c.name_ru,
            value: c.id
          }
        } else {
          return {
            title: c.name_ru,
            value: c.id,
            children: this.treeDataMap(c.children)
          }
        }
      })
    },
    removeProduct(i) {
      this.deleteProduct(i).then(res => {
        this.getAllProductList(this.params)
      })
    },
    changePagination(e) {
      // this.params.pagination = e
      this.params.page = e.current
      this.routeReplacer()
      this.getAllProductList(this.params)
    },
    search(value) {
      console.log(value)
      // this.params.search = value
      this.params.page = 1
      this.routeReplacer()
      this.getAllProductList(this.params)
    },
    removeItem (item) {
      this.deleteProduct(item.id).then(res => {
        this.getAllProductList(this.params)
      })
    },
    filterTreeNode (value, node) {
      const title = node.data.props.title
      console.log(title)
      const result = title.toLowerCase().startsWith(value.trim().toLowerCase())
      return result
    },
    routeReplacer () {
      const _filters = { ...this.params }
      // delete _filters.pagination
      if (!((this.$route.name === 'HomeWidgetCreate') || (this.$route.name === 'HomeWidgetEdit'))) {
        this.$router.push({
          name: 'ProductList',
          query: _filters
        })
      }
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
      this.params.page = 1
      this.routeReplacer()
      this.getAllProductList(this.params)
    },
    filterBrand (e) {
      console.log(e)
      this.params.brand = e
      this.params.page = 1
      this.routeReplacer()
      this.getAllProductList(this.params)
    },
    filterMeasure (e) {
      this.params.measure = e
      this.params.page = 1
      this.routeReplacer()
      this.getAllProductList(this.params)
    },
    filterStatus (e) {
      this.params.status = e
      this.params.page = 1
      this.routeReplacer()
      this.getAllProductList(this.params)
    }
  },
  computed: {
    ...mapGetters(['allProductList', 'loadProductList', 'paginationProductList', 'allBrands', 'allSuppliersList']),
  },
  mounted() {
    const _query = this.$route.query
    this.params = {
      page: _query.page ? parseInt(_query.page) : undefined,
      search: _query?.search,
      category: _query.category ? parseInt(_query.category) : undefined,
      // ? parseInt(_query.category) : undefined,
      brand: _query.brand ? parseInt(_query.brand) : undefined,
      supplier: _query.supplier ? parseInt(_query.supplier) : undefined,
      measure: _query.measure ? parseInt(_query.measure) : undefined,
      status: _query.status ? parseInt(_query.status) : undefined,
    }
    this.getAllProductList(this.params)
    this.getListCategory().then(res => {
      this.category = this.treeDataMap(res)
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
