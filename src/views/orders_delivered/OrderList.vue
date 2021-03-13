<template>
  <div>
    <a-card :title="$t('order_list')" style="width: 100%">
      <a-row>
          
      </a-row>
      <a-table
        size="middle"
        :columns="columns"
        :data-source="allOrder"
        :loading="loadOrder"
        :pagination='paginationOrder'
        :rowKey="item => item.id"
        @change="changePagination"
      >
        <template slot="status" slot-scope="status">
          <a-tag v-if="status === 10" color="blue">{{ $t('active') }}</a-tag>
          <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
        </template>
        <template slot="created_at" slot-scope="created_at">
          {{ moment(created_at).format('YYYY:MM:DD HH:mm') }}
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('view') }}</template>
            <a-button size="small" style="margin: 0 2px" id="buttonUpdate" type="default" @click="viewItem(item)" icon="eye"></a-button>
          </a-tooltip>
        </template>
      </a-table>
    </a-card>

  </div>
</template>
<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      visible: false,
      loading: false,
      columns: [
        {
          title: this.$t('courier'),
          dataIndex: 'courier',
        },
        {
          title: this.$t('name_user'),
          dataIndex: 'user_name',
        },
        {
          title: this.$t('address'),
          dataIndex: 'address'
        },
        {
          title: this.$t('total_price'),
          dataIndex: 'total_price'
        },
        {
          title: this.$t('status'),
          dataIndex: 'status',
          align: 'center',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: this.$t('created_at'),
          dataIndex: 'created_at',
          scopedSlots: { customRender: 'created_at' },
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
        type: this.$route.path.split('/')[2].toString(),
        pagination: {
          current: 1,
          pageSize: 15,
          total: null,
        },
        search: '',
      },
    }
  },
  watch: {
    'params.type': function(val) {
      console.log(val)
    }
  },
  methods: {
    moment,
    ...mapActions(['getAllOrder']),
    viewItem(item) {
      console.log(item)
      this.$router.push({
        name: 'OrdersView',
        params: {
          id: item.id
        }
      })
      // this.$refs.editMeasure.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllOrder(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllOrder(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteMeasure(item.id).then(res => {
        this.getAllOrder(this.params)
      })
    },
    addItem () {
      this.$refs.createMeasure.show()
    }
  },
  computed: {
    ...mapGetters(['allOrder', 'loadOrder', 'paginationOrder']),
  },
  mounted() {
    this.getAllOrder(this.params)
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
