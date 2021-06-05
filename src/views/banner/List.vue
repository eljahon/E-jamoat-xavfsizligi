<template>
  <div>
    <a-card size="small" :title="$t('brands.list')" style="width: 100%">
      <a-button v-if="$route.name !== 'HomeWidgetCreate'" type="primary" slot="extra" @click="addBrand">{{ $t('add') }}</a-button>
      <a-divider>{{ $t('filters') }}</a-divider>
      <a-row style='margin: 20px 0'>
        <a-col :span='6' style='padding-right: 10px'>
          <a-input allow-clear v-model="params.search" @change="search" :placeholder="$t('name')"></a-input>
        </a-col>
        <a-col :span='6' style='padding-left: 10px'>
          <a-select allowClear :placeholder="$t('status')" style="width: 100%" @change="filterStatus">
            <a-select-option :value='10'>{{ $t('active') }}</a-select-option>
            <a-select-option :value='0'>{{ $t('inactive') }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allBrands"
        :loading="loadBrand"
        :row-selection="{
          selectedRowKeys: rowSelection,
          onChange: onSelectChange
        }"
        :rowKey="item => item.id"
        :pagination='paginationBrand'
        @change="changePagination"
      >
        <template slot="popular" slot-scope="is_popular">
          <a-tag v-if="is_popular" color="green">{{ $t('popular') }}</a-tag>
          <a-tag v-else color="red">{{ $t('popular.no') }}</a-tag>
        </template>
        <template slot="status" slot-scope="status">
          <a-tag v-if="status === 10" color="blue">{{ $t('active') }}</a-tag>
          <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
        </template>
        <template slot="image" slot-scope="item">
          <div class="imagePreview">
            <img :src="item.logo">
          </div>
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button style="margin: 0 2px" id="buttonUpdate" type="primary" @click="editBrand(item)" icon="edit"></a-button>
          </a-tooltip>
          <a-popconfirm
            placement="topRight"
            slot="extra"
            :title="$t('deleteMsg')"
            @confirm="removeBrand(item)"
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
    <brand-create ref="createBrand" :editable="false" :params="params"/>
    <brand-create ref="editBrand" :editable="true" :params="params"/>
  </div>
</template>
<script>
import BrandCreate from './BrandCreate'
import { mapActions, mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
export default {
  components: {
    'brand-create': BrandCreate,
    // 'category-edit': editBrand
  },
  data() {
    this.search = debounce(this.search, 600)
    return {
      visible: false,
      loading: false,
      rowSelection: [],
      slug: null,
      columns: [
        {
          title: this.$t('image'),
          align: 'center',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: this.$t('name'),
          dataIndex: 'name',
        },
        {
          title: this.$t('slug'),
          dataIndex: 'slug',
        },
        {
          title: this.$t('popular'),
          dataIndex: 'is_popular',
          scopedSlots: { customRender: 'popular' },
        },
        {
          title: this.$t('status'),
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
        this.$route.name !== 'HomeWidgetCreate'
          ? {
            title: this.$t('action'),
            key: 'action',
            align: 'center',
            width: '12%',
            scopedSlots: { customRender: 'action' },
          } : {}
        // {
        //   title: this.$t('action'),
        //   key: 'action',
        //   align: 'center',
        //   width: '12%',
        //   scopedSlots: { customRender: 'action' },
        // },
      ],
      params: {
        page: 1,
        search: '',
        status: 10
      },
    }
  },
  watch: {
    rowSelection: function(val) {
      console.log(val)
    }
  },
  methods: {
    onSelectChange (e) {
      this.rowSelection = e
      console.log(e)
      this.$emit('input', e)
    },
    ...mapActions(['getAllBrands', 'deleteBrand']),
    editBrand(item) {
      this.$refs.editBrand.show(item)
    },
    routeReplacer () {
      const _filters = { ...this.params }
      // delete _filters.pagination
      if (this.$route.name !== 'HomeWidgetCreate') {
        this.$router.push({
          name: this.$route.name,
          query: _filters
        })
      }
    },
    changePagination(e) {
      this.params.page = e.current
      this.routeReplacer()
      this.getAllBrands(this.params)
    },
    search(value) {
      this.params.page = 1
      this.routeReplacer()
      this.getAllBrands(this.params)
    },
    filterStatus (value) {
      this.params.status = value
      this.params.page = 1
      this.routeReplacer()
      this.getAllBrands(this.params)
    },
    removeBrand (item) {
      console.log(item)
      this.deleteBrand(item.id).then(res => {
        this.getAllBrands(this.params)
      })
    },
    addBrand () {
      this.$refs.createBrand.show()
    }
  },
  computed: {
    ...mapGetters(['allBrands', 'loadBrand', 'paginationBrand']),
  },
  mounted() {
    this.params = {
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      search: this.$route.query?.search,
      status: this.$route.query.status ? parseInt(this.$route.query.status) : 10
    }
    this.getAllBrands(this.params)
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
