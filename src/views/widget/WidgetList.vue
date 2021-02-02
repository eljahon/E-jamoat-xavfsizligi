<template>
  <div>
    <a-card :title="$t('widget.list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addItem">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allWigets"
        :loading="loadWigets"
        :rowKey="item => item.id"
        :pagination="paginationWigets"
        @change="changePagination"
        bordered
      >
<!--        <template slot="status" slot-scope="status">-->
<!--          <a-tag v-if="status === 10" color="blue">{{ $t('active') }}</a-tag>-->
<!--          <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>-->
<!--        </template>-->
        <template slot="category" slot-scope="item">
          {{ getCatgory(item.category_id) }}
        </template>
        <template slot="brand" slot-scope="item">
          {{ getBrand(item.brand_id) }}
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
    <create ref="createItem" :editable="false" :params="params"/>
    <create ref="editItem" :editable="true" :params="params"/>
  </div>
</template>
<script>
import Create from './WidgetCreate'
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
          title: this.$t('categories'),
          dataIndex: 'category_id',
          scopedSlots: { customRender: 'category' }
        },
        {
          title: this.$t('brands'),
          dataIndex: 'brand_id',
          scopedSlots: { customRender: 'brand' }
        },
        {
          title: this.$t('key'),
          dataIndex: 'key',
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
    ...mapActions(['getAllWidgets', 'deleteWidgets', 'getListCategory', 'getAllBrands']),
    editItem(item) {
      console.log(item)
      this.$router.push({
        name: 'WidgetUpdate',
        params: {
          id: item.id
        }
      })
      // this.$refs.editItem.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllWidgets(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllWidgets(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteWidgets(item.id).then(res => {
        this.getAllWidgets(this.params)
      })
    },
    addItem () {
      this.$router.push({
        name: 'WidgetCreate'
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
    ...mapGetters(['allWigets', 'loadWigets', 'paginationWigets', 'allBrands', 'listCategory'])
  },
  mounted() {
    this.getAllBrands()
    this.getListCategory()
    this.getAllWidgets(this.params)
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
