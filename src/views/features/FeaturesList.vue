<template>
  <div>
    <a-card :title="$t('features.list')" style='width: 100%'>
      <a-button type='primary' slot='extra' @click="() => { $router.push({ name: 'FeaturesCreate' }) }">{{ $t('add')
        }}
      </a-button>
      <a-divider>{{ $t('filters') }}</a-divider>
      <a-row style='margin: 20px 0'>
        <a-col style='padding-right: 5px' :span='4'>
          <a-input v-debounce='search' :placeholder="$t('search.name')" />
        </a-col>
        <a-col style='padding-right: 5px; padding-left: 5px' :span='4'>
          <a-tree-select
            v-model='params.category'
            show-search
            treeNodeFilterProp="name_ru"
            :filterTreeNode="filterTreeNode"
            :treeData='category'
            style='width: 100%'
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            :placeholder="$t('category')"
            @change='filterCategory'
            allow-clear
          />
          <!--          <a-select allowClear show-search :placeholder="$t('category')" :filter-option="filterOption" style="width: 100%" @change="filterCategory">-->
          <!--            <a-select-option v-for='c in category' :key='c.id' :value='c.id'>{{ c.name_uz }}</a-select-option>-->
          <!--          </a-select>-->
        </a-col>
        <a-col style='padding-right: 5px; padding-left: 5px' :span='4'>
          <a-select allowClear show-search v-model='params.type' :placeholder="$t('type')" :filter-option='filterOption' style='width: 100%'
                    @change='filterType'>
            <a-select-option v-for='type in types' :key='type' :value='type'>{{ type }}</a-select-option>
          </a-select>
        </a-col>
        <a-col style='padding-right: 5px; padding-left: 5px' :span='4'>
          <a-select allowClear show-search v-model='params.filter_type' :placeholder="$t('filter_type')" :filter-option='filterOption'
                    style='width: 100%' @change='filterTypeFilter'>
            <a-select-option v-for='type in types' :key='type' :value='type'>{{ type }}</a-select-option>
          </a-select>
        </a-col>
        <a-col style='padding-left: 5px' :span='4'>
          <a-select allowClear v-model='params.status' :placeholder="$t('status')" style='width: 100%' @change='filterStatus'>
            <a-select-option :value='10'>{{ $t('active') }}</a-select-option>
            <a-select-option :value='0'>{{ $t('inactive') }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <div class="customTable">
        <a-table
          :columns='columns'
          :data-source='allFeatures'
          :loading='loadFeatures'
          :rowKey='item => item.id'
          :pagination='paginationFeatures'
          @change='changePagination'
        >
          <template slot='popular' slot-scope='is_popular'>
            <a-tag v-if='is_popular' color='green'>{{ $t('popular') }}</a-tag>
            <a-tag v-else color='red'>{{ $t('popular.no') }}</a-tag>
          </template>
          <!--        <template slot='status' slot-scope='status'>-->
          <!--          <a-tag v-if='status === 10' color='blue'>{{ $t('active') }}</a-tag>-->
          <!--          <a-tag v-else color='red'>{{ $t('inactive') }}</a-tag>-->
          <!--        </template>-->
          <template slot='is_main' slot-scope='is_main'>
            <a-tag v-if='is_main' color='blue'>{{ $t('is_main') }}</a-tag>
            <a-tag v-else color='red'>{{ $t('no_is_main') }}</a-tag>
          </template>
          <template slot='image' slot-scope='item'>
            <div class='imagePreview'>
              <img :src='item.logo_url'>
            </div>
          </template>
          <template slot='action' slot-scope='item'>
            <a-tooltip>
              <template slot='title'>{{ $t('update') }}</template>
              <a-button style='margin: 0 2px' @click='editItem(item)' icon='edit'></a-button>
            </a-tooltip>
            <a-popconfirm
              placement='topRight'
              slot='extra'
              :title="$t('deleteMsg')"
              @confirm='removeItem(item)'
              :okText="$t('yes')"
              :cancelText="$t('no')"
            >
              <a-tooltip>
                <template slot='title'>{{ $t('delete') }}</template>
                <a-button
                  style='margin: 0 2px'
                  type='danger'
                  icon='delete'
                ></a-button>
              </a-tooltip>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </a-card>

    <!-- MODALS -->
    <!--    <create ref="createBrand" :editable="false" :params="params"/>-->
    <!--    <create ref="editItem" :editable="true" :params="params"/>-->
  </div>
</template>
<script>
import { TreeSelect } from 'ant-design-vue'
import Create from './FeaturesCreateWithUpdate'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'create': Create,
    'a-tree-select': TreeSelect
  },
  data() {
    return {
      visible: false,
      loading: false,
      category: [],
      columns: [
        {
          title: this.$t('name_ru'),
          dataIndex: 'name_ru'
        },
        {
          title: this.$t('name_uz'),
          dataIndex: 'name_uz'
        },
        {
          title: this.$t('category'),
          dataIndex: 'category_name'
        },
        {
          title: this.$t('is_main'),
          dataIndex: 'is_main',
          align: 'center',
          scopedSlots: { customRender: 'is_main' }
        },
        // {
        //   title: this.$t('status'),
        //   dataIndex: 'status',
        //   align: 'center',
        //   scopedSlots: { customRender: 'status' }
        // },
        {
          title: this.$t('action'),
          key: 'action',
          align: 'center',
          width: '15%',
          scopedSlots: { customRender: 'action' }
        }
      ],
      types: [
        'dropdown', 'radio', 'checkbox', 'text', 'number', 'date', 'datetime', 'textarea'
      ],
      params: {
        page: 1,
        search: '',
        status: undefined,
        category: undefined,
        type: undefined,
        filter_type: undefined
      }
    }
  },
  methods: {
    ...mapActions(['getAllFeatures', 'deleteFeatures', 'getTreeCategory']),
    editItem(item) {
      this.$router.push({
        name: 'FeaturesEdit',
        params: {
          id: item.id
        }
      })
      console.log(item)
    },
    routeReplacer () {
      const _filters = { ...this.params }
      // delete _filters.pagination
      this.$router.push({
        name: 'FeaturesList',
        query: _filters
      })
    },
    treeDataMap (category) {
      return category.map((c) => {
        if (!c.children) {
          return {
            title: c.name_ru,
            value: c.id,
            key: c.name_ru + c.id + Math.random()
          }
        } else {
          return {
            title: c.name_ru,
            value: c.id,
            key: c.name_ru + c.id + Math.random(),
            children: this.treeDataMap(c.children)
          }
        }
      })
    },
    changePagination(e) {
      this.params.page = e.current
      this.getAllFeatures(this.params)
      this.routeReplacer()
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.params.page = 1
      this.getAllFeatures(this.params)
      this.routeReplacer()
    },
    filterTreeNode (value, node) {
      const title = node.data.props.title
      console.log(title)
      const result = title.toLowerCase().startsWith(value.trim().toLowerCase())
      return result
    },
    filterStatus(value) {
      console.log(value)
      this.params.status = value
      this.params.page = 1
      this.getAllFeatures(this.params)
      this.routeReplacer()
    },
    filterCategory(e) {
      this.params.category = e
      this.params.page = 1
      this.getAllFeatures(this.params)
      this.routeReplacer()
    },
    filterType(e) {
      this.params.type = e
      this.params.page = 1
      this.getAllFeatures(this.params)
      this.routeReplacer()
    },
    filterTypeFilter(e) {
      this.params.filter_type = e
      this.params.page = 1
      this.getAllFeatures(this.params)
      this.routeReplacer()
    },
    filterOption(input, option) {
      console.log(input, option)
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    removeItem(item) {
      console.log(item)
      this.deleteFeatures(item.id).then(res => {
        this.getAllFeatures(this.params)
      })
    }
  },
  computed: {
    ...mapGetters(['allFeatures', 'loadFeatures', 'paginationFeatures'])
  },
  mounted() {
    const _query = this.$route.query
    this.params = {
      page: _query.page ? parseInt(_query.page) : undefined,
      search: _query?.search,
      type: _query?.type,
      // eslint-disable-next-line camelcase
      filter_type: _query?.filter_type,
      category: _query.category ? parseInt(_query.category) : undefined,
      // ? parseInt(_query.category) : undefined,
      // brand: _query.brand ? parseInt(_query.brand) : undefined,
      // supplier: _query.supplier ? parseInt(_query.supplier) : undefined,
      // measure: _query.measure ? parseInt(_query.measure) : undefined,
      status: _query.status ? parseInt(_query.status) : undefined,
    }
    this.getAllFeatures(this.params).then(res => {
      console.log(res)
      console.log(this.allFeatures)
    })
    this.getTreeCategory().then(res => {
      this.category = this.treeDataMap(res)
    })
  }
}
</script>
<style lang="less">
.imagePreview img {
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  object-fit: cover;
}
.customTable {
  .ant-table-row-level-0 {
    background-color: #ffffff !important;
  }
  .ant-table-row-level-1 {
    background-color: rgba(0, 102, 255, .1) !important;
  }
  .ant-table-row-level-2 {
    background-color: rgba(0, 102, 255, .2) !important;
  }
}
</style>
