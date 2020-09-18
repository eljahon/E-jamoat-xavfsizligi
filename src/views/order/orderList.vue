<template>
  <div>
    <a-card :title="$t('order_list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addOrder">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allOrders"
        :loading="loadOrder"
        :rowKey="record => record.id"
        :pagination="paginationOrder"
        @change="changePagination"
        bordered
      >
        <template slot="status" slot-scope="item">
          <a-tag :color="statusColor(item.order_status_id)">{{ statusName(item.order_status_id) }}</a-tag>
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button style="margin: 0 2px" id="buttonUpdate" type="primary" @click="previewOrder(item)" icon="eye" ghost></a-button>
          </a-tooltip>
        </template>
        <template slot="payment" slot-scope="item">
          <div :style="{textAlign: 'center'}">
            <img v-if="item.payment_method === 'cash'" src="./icons/money.svg" style="width: 70%; height: 35px"/>
            <img v-if="item.payment_method === 'click'" src="./icons/click.svg" style="width: 70%; height: 35px"/>
            <img v-if="item.payment_method === 'payme'" src="./icons/payme.svg" style="width: 70%; height: 35px"/>
          </div>
        </template>
<!--          <a-popconfirm-->
<!--            placement="topRight"-->
<!--            slot="extra"-->
<!--            :title="$t('deleteMsg')"-->
<!--            @confirm="removeCategory(item)"-->
<!--            :okText="$t('yes')"-->
<!--            :cancelText="$t('no')"-->
<!--          >-->
<!--            <a-tooltip>-->
<!--              <template slot="title">{{ $t('delete') }}</template>-->
<!--              <a-button-->
<!--                style="margin: 0 2px"-->
<!--                type="danger"-->
<!--                icon="delete"-->
<!--              ></a-button>-->
<!--            </a-tooltip>-->
<!--          </a-popconfirm>-->
<!--          <a-popconfirm-->
<!--            placement="topRight"-->
<!--            slot="extra"-->
<!--            :title="item.active ? $t('blockMsg') : $t('unblockMsg')"-->
<!--            @confirm="lockCategory(item)"-->
<!--            :okText="$t('yes')"-->
<!--            :cancelText="$t('no')"-->
<!--          >-->
<!--            <a-tooltip>-->
<!--              <template slot="title">{{ item.active ? $t('blocked') : $t('unblock') }}</template>-->
<!--              <a-button-->
<!--                style="margin: 0 2px"-->
<!--                :type="item.active ? 'danger': 'primary'"-->
<!--                :icon="item.active? 'lock' : 'unlock'"-->
<!--                ghost-->
<!--              ></a-button>-->
<!--            </a-tooltip>-->
<!--          </a-popconfirm>-->
<!--        </template>-->
        <template slot="price" slot-scope="item">
          {{ itemPrice(item.items) }}
        </template>
      </a-table>
      <img :src="image" />
    </a-card>

    <!-- MODALS -->
    <order-preview ref="preview"></order-preview>
<!--    <product-create ref="ProductCreate" :params="params" :editable="false"></product-create>-->
<!--    <product-create ref="ProductEdit" :params="params" :slug="slug" :editable="true"></product-create>-->
  </div>
</template>
<script>
import OrderPriview from '@/views/order/OrderPriview'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'order-preview': OrderPriview
  },
  data() {
    return {
      visible: false,
      loading: false,
      slug: null,
      image: '',
      columns: [
        {
          title: 'Number',
          dataIndex: 'number',
          scopedSlots: { customRender: 'number' },
        },
        {
          title: 'Name',
          dataIndex: 'customer_name',
        },
        {
          title: 'Phone',
          dataIndex: 'customer_phone',
        },
        {
          title: 'Address',
          dataIndex: 'customer_address',
        },
        {
          title: 'Status',
          key: 'status',
          align: 'center',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: 'Price',
          align: 'center',
          scopedSlots: { customRender: 'price' },
        },
        {
          title: 'Delivery',
          dataIndex: 'delivery_method',
        },
        {
          title: 'Payment',
          scopedSlots: { customRender: 'payment' }
        },
        {
          title: this.$t('action'),
          key: 'action',
          align: 'center',
          width: '10%',
          scopedSlots: { customRender: 'action' },
        },
      ],
      params: {
        pagination: {
          current: 1,
          pageSize: 10,
          total: null,
        },
        search: '',
      },
    }
  },
  watch: {
    slug (e) {
      console.log(e)
    }
  },
  methods: {
    ...mapActions(['getAllOrder', 'getAllStatus']),
    addOrder () {
      console.log('order create')
    },
    itemPrice (array) {
      let price = 0
      for (let i = 0; i < array.length; i++) {
        price = parseInt(array[i].price) + price
      }
      return new Intl.NumberFormat().format(price) + ' ' + 'sum'
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllOrder(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllProduct(this.params)
    },
    statusColor (id) {
      switch (id) {
        case '986a0d09-7b4d-4ca9-8567-aa1c6d770505': return 'cyan'
        case '1b6dc9a3-64aa-4f68-b54f-71ffe8164cd3': return 'blue'
        case 'c4227d1b-c317-46f8-b1e3-a48c2496206f': return 'red'
        case 'b0cb7c69-5e3d-47c7-9813-b0a7cc3d81fd': return 'orange'
        case '8781af8e-f74d-4fb6-ae23-fd997f4a2ee0': return 'purple'
        case '6ba783a3-1c2e-479c-9626-25526b3d9d36': return 'red'
        case '84be5a2f-3a92-4469-8283-220ca34a0de4': return 'yellow'
        case '79413606-a56f-45ed-97c3-f3f18e645972': return 'blue'
        case 'e665273d-5415-4243-a329-aee410e39465': return 'green'
        case 'd39cb255-6cf5-4602-896d-9c559d40cbbe': return 'red'
      }
    },
    statusName (id) {
      switch (id) {
        case '986a0d09-7b4d-4ca9-8567-aa1c6d770505': return 'New'
        case '1b6dc9a3-64aa-4f68-b54f-71ffe8164cd3': return 'Vendor Accepted'
        case 'c4227d1b-c317-46f8-b1e3-a48c2496206f': return 'Vendor Cancelled'
        case 'b0cb7c69-5e3d-47c7-9813-b0a7cc3d81fd': return 'Vendor Ready'
        case '8781af8e-f74d-4fb6-ae23-fd997f4a2ee0': return 'Courier Accepted'
        case '6ba783a3-1c2e-479c-9626-25526b3d9d36': return 'Courier Cancelled'
        case '84be5a2f-3a92-4469-8283-220ca34a0de4': return 'Courier Picked up'
        case '79413606-a56f-45ed-97c3-f3f18e645972': return 'Delivered'
        case 'e665273d-5415-4243-a329-aee410e39465': return 'Finished'
        case 'd39cb255-6cf5-4602-896d-9c559d40cbbe': return 'Server Cancelled'
      }
    },
    previewOrder (item) {
      this.$refs.preview.order = item
      console.log(item)
      this.$refs.preview.show()
    }
  },
  computed: {
    ...mapGetters(['allOrders', 'loadOrder', 'paginationOrder', 'orderStatus'])
  },
  mounted() {
    this.getAllOrder(this.params)
    this.getAllStatus()
  },
}
</script>
