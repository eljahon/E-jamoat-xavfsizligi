<template>
  <div>
    <a-card size="small" :title="$t('coupons.list')" style="width: 100%">
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
        :data-source="allCoupons"
        :loading="loadCoupons"
        :pagination="paginationCoupons"
        :rowKey="item => item.id"
        @change="changePagination"
      >
        <template slot="status" slot-scope="status">
          <a-tag v-if="status === 10" color="blue">{{ $t('active') }}</a-tag>
          <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button size="small" style="margin: 0 2px" id="buttonUpdate" type="primary" @click="editItem(item)" icon="edit"></a-button>
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
    <item-create ref="createItem" :editable="false" :params="params"/>
    <item-create ref="editItem" :editable="true" :params="params"/>
  </div>
</template>
<script>
import itemCreate from './CouponCreateWithUpdate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'item-create': itemCreate,
  },
  data() {
    return {
      visible: false,
      loading: false,
      columns: [
        {
          title: this.$t('name_uz'),
          dataIndex: 'name_uz',
        },
        {
          title: this.$t('name_ru'),
          dataIndex: 'name_ru',
        },
        {
          title: this.$t('symbol'),
          dataIndex: 'symbol',
        },
        {
          title: this.$t('status'),
          dataIndex: 'status',
          align: 'center',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: this.$t('action'),
          key: 'action',
          align: 'center',
          width: '12%',
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
    ...mapActions(['getAllCoupons', 'deleteCoupons']),
    editItem(item) {
      this.$refs.editItem.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllCoupons(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllCoupons(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteMeasure(item.id).then(res => {
        this.getAllCoupons(this.params)
      })
    },
    addItem () {
      this.$refs.createItem.show()
    }
  },
  computed: {
    ...mapGetters(['allCoupons', 'loadCoupons', 'paginationCoupons']),
  },
  mounted() {
    this.getAllCoupons(this.params)
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
