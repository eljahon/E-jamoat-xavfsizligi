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
          <a-select allowClear show-search :placeholder="$t('type')" :filter-option='filterOption' style='width: 100%'
                    @change='filterType'>
            <a-select-option v-for='type in types' :key='type' :value='type'>{{ type }}</a-select-option>
          </a-select>
        </a-col>
        <a-col style='padding-right: 5px; padding-left: 5px' :span='4'>
          <a-select allowClear show-search :placeholder="$t('filter_type')" :filter-option='filterOption'
                    style='width: 100%' @change='filterTypeFilter'>
            <a-select-option v-for='type in types' :key='type' :value='type'>{{ type }}</a-select-option>
          </a-select>
        </a-col>
        <a-col style='padding-left: 5px' :span='4'>
          <a-select allowClear :placeholder="$t('status')" style='width: 100%' @change='filterStatus'>
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
        pagination: {
          current: 1,
          pageSize: 15,
          total: null
        },
        search: '',
        status: 10,
        category: null,
        type: null,
        filter_type: null
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
    treeDataMap (category) {
      return category.map((c) => {
        if (!c.children) {
          return {
            title: c.name_uz + ' - ' + c.name_ru,
            value: c.id
          }
        } else {
          return {
            title: c.name_uz + ' - ' + c.name_ru,
            value: c.id,
            children: this.treeDataMap(c.children)
          }
        }
      })
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllFeatures(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllFeatures(this.params)
    },
    filterStatus(value) {
      console.log(value)
      this.params.status = value
      this.getAllFeatures(this.params)
    },
    filterCategory(e) {
      this.params.category = e
      this.getAllFeatures(this.params)
    },
    filterType(e) {
      this.params.type = e
      this.getAllFeatures(this.params)
    },
    filterTypeFilter(e) {
      this.params.filter_type = e
      this.getAllFeatures(this.params)
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
