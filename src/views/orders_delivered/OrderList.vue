<template>
  <div>
    <a-card :title="$t('order_list')" style="width: 100%">
      <a-divider>{{ $t('filters') }}</a-divider>
      <a-row style='margin: 20px 0'>
         <a-col :span='6' style='padding-right: 10px'>
           <a-input v-debounce="searchUsername" :placeholder="$t('username')"></a-input>
         </a-col>
         <a-col :span='6' style='padding: 0 10px'>
           <a-input v-debounce="searchUuid" placeholder='Uuid'></a-input>
         </a-col>
         <a-col :span='6' style='padding: 0 10px'>
           <a-select allowClear show-search :placeholder="$t('delivery_type')" :filter-option="filterOption" style="width: 100%" @change="filterDeliveryTypes">
             <a-select-option v-for='dt in delivery_types' :key='dt.id' :value='dt.id'>{{ dt.name_uz }}</a-select-option>
           </a-select>
         </a-col>
         <a-col :span='6' style='padding-left: 10px'>
           <a-select allowClear :placeholder="$t('status')" style="width: 100%" @change="filterStatus">
             <a-select-option :value='10'>{{ $t('active') }}</a-select-option>
             <a-select-option :value='0'>{{ $t('inactive') }}</a-select-option>
           </a-select>
         </a-col>
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
        username: '',
        uuid: '',
        status: 10,
        delivery_type: null
      },
      delivery_types: []
    }
  },
  watch: {
    'params.type': function(val) {
      console.log(val)
    }
  },
  methods: {
    moment,
    ...mapActions(['getAllOrder', 'getDeliveryTypesList']),
    viewItem(item) {
      console.log(item)
      this.$router.push({
        name: 'OrdersView',
        params: {
          id: item.id
        }
      })
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllOrder(this.params)
    },
    searchUsername (value) {
      this.params.username = value
      this.getAllOrder(this.params)
    },
    searchUuid (value) {
      this.params.uuid = value
      this.getAllOrder(this.params)
    },
    filterStatus (value) {
      this.params.status = value
      this.getAllOrder(this.params)
    },
    filterDeliveryTypes (value) {
      this.params.delivery_type = value
      this.getAllOrder(this.params)
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
  },
  computed: {
    ...mapGetters(['allOrder', 'loadOrder', 'paginationOrder']),
  },
  mounted() {
    this.getAllOrder(this.params)
    this.getDeliveryTypesList().then(res => {
      this.delivery_types = res.data
    })
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
