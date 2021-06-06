<template>
  <div>
    <a-card :title="$t('home.widget.list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addItem">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input allow-clear @change="search" v-model="params.search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allHomeWigets"
        :loading="loadHomeWigets"
        :rowKey="item => item.id"
        :pagination="paginationHomeWigets"
        @change="changePagination"
        bordered
      >
        <template slot="status" slot-scope="status">
          <a-tag v-if="status === 10" color="blue">{{ $t('active') }}</a-tag>
          <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button style="margin: 0 2px" id="buttonUpdate" type="primary" @click="editItem(item)" icon="edit"></a-button>
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
export default {
  data() {
    this.search = debounce(this.search, 600)
    return {
      visible: false,
      loading: false,
      columns: [
        {
          title: this.$t('name_uz'),
          dataIndex: 'title_uz',
        },
        {
          title: this.$t('name_ru'),
          dataIndex: 'title_ru',
        },
        {
          title: this.$t('order_no'),
          dataIndex: 'order',
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
    ...mapActions(['getAllHomeWidgets', 'deleteHomeWidgets', 'getListCategory', 'getAllBrands']),
    editItem(item) {
      console.log(item)
      this.$router.push({
        name: 'HomeWidgetEdit',
        params: {
          id: item.id
        }
      })
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllHomeWidgets(this.params)
    },
    search(value) {
      console.log(value)
      // this.params.search = value
      this.getAllHomeWidgets(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteHomeWidgets(item.id).then(res => {
        this.getAllHomeWidgets(this.params)
      })
    },
    addItem () {
      this.$router.push({
        name: 'HomeWidgetCreate'
      })
      // this.$refs.createItem.show()
    },
    getCatgory (id) {
      for (var i = 0; i < this.listCategory.length; i++) {
        if (id === this.listCategory[i].category_id) return this.listCategory[i].name_ru
      }
    },
    getBrand(id) {
      for (var i = 0; i < this.allBrands.length; i++) {
        if (id === this.allBrands[i].brand_id) return this.allBrands[i].name
      }
    }
  },
  computed: {
    ...mapGetters(['allHomeWigets', 'loadHomeWigets', 'paginationHomeWigets', 'allBrands', 'listCategory'])
  },
  mounted() {
    this.getAllBrands()
    this.getListCategory()
    this.getAllHomeWidgets(this.params)
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
