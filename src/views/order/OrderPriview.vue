<template>
  <a-modal centered width="80vw" v-model="previewModal" @ok="handleOk" title="Info Order">
    <template slot="footer">
      <a-button key="back" @click="handleOk">
        OK
      </a-button>
    </template>
    <div>
      <a-steps progress-dot size="small" :current="status">
        <a-step title="New" />
        <a-step title="Vendor Accepted" />
<!--        <a-step title="Vendor Cancelled" />-->
        <a-step title="Vendor Ready" />
        <a-step title="Courier Accepted" />
<!--        <a-step title="Courier Cancelled" />-->
        <a-step title="Courier Picked up" />
        <a-step title="Delivered" />
        <a-step title="Finished" />
<!--        <a-step title="Server Cancelled" />-->
      </a-steps>
    </div>
    <a-divider />
    <h3 style="margin: 20px 0">Order Priview</h3>
    <a-descriptions bordered>
      <a-descriptions-item :span="2" style="font-size:16px" :label="$t('customerName')">
        {{ order ? order.customer_name : '' }}
      </a-descriptions-item>
      <a-descriptions-item :span="2" :label="$t('customerPhone')">
        {{ order ? order.customer_phone : '' }}
      </a-descriptions-item>
    </a-descriptions>
    <h3 style="margin: 20px 0">{{ $t('preview_order') }}</h3>
    <a-descriptions bordered>
      <a-descriptions-item :span="2" :label="$t('description')">
        {{ order ? order.note : '' }}
      </a-descriptions-item>
      <a-descriptions-item :span="2" :label="$t('status')" >
        <a-tag :color="order ? statusColor(order.order_status_id) : ''">
          {{ order ? statusName(order.order_status_id) : '' }}
        </a-tag>
      </a-descriptions-item>
      <a-descriptions-item :span="2" :label="$t('address')">
        {{ order ? order.customer_address : '' }}
      </a-descriptions-item>
<!--      <a-descriptions-item :span="2" v-if="order && order.steps[0] ? order.steps[0].branch_name : ''" :label="$t('branchName')">-->
<!--        {{ order ? order.steps[0] ? order.steps[0].branch_name : '' : '' }}-->
<!--      </a-descriptions-item>-->
    </a-descriptions>
    <h3 style="margin: 20px 0">{{ $t('infoProduct') + ' ' + $t('and') + ' ' + $t('price') }}</h3>
    <a-descriptions bordered layout="vertical">
      <a-descriptions-item v-if="order && order.items" label="Product" :span="3">
        <a-table :columns="columns" :data-source="order.items" :rowKey="item => item.product_id" bordered :pagination="false">
          <template slot="total" slot-scope="item">
            {{ totalPrice(item) }}
          </template>
          <template slot="attrs_total" slot-scope="item">
            {{ totalAttrPrice(item) }}
          </template>
          <template slot="attrs" slot-scope="item">
            <div v-for="(attr,i) in item.properties" :key="i">
              <strong style="color: #2f54eb">{{ attr.property_name }}</strong>:
              <br>
              <div v-for="(option,j) in attr.values" :key="j">
                <strong>{{ option.value }}</strong> +{{ option.additional_price }}
              </div>
            </div>
          </template>
        </a-table>
      </a-descriptions-item>
      <a-descriptions-item :span="2" :label="$t('deliveryPrice')">
        {{ order ? order.delivery_cost : '' }} {{ $t('sum') }}
      </a-descriptions-item>
<!--      <a-descriptions-item v-if="order && order.steps[0].products" :label="$t('totalPrice')" :span="2">-->
<!--        {{ getTotalPrice(order.steps[0].products, order.delivery_price) ? getTotalPrice(order.steps[0].products, order.delivery_price) : '' }} {{ $t('sum') }}-->
<!--      </a-descriptions-item>-->
    </a-descriptions>
    <yandex-map
      :coords="location"
      :zoom="15"
      style="height:300px; padding-top: 24px"
      :controls="['zoomControl']"
      searchControlProvider="yandex#search"
    >
      <ymap-marker
        :coords="location"
        marker-id="123"
        hint-content="some hint"
      />
    </yandex-map>
  </a-modal>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      previewModal: false,
      order: null,
      vendor: null,
      courier: null,
      totalAttrPrices: 0,
      columns: [
        {
          title: this.$t('name'),
          dataIndex: 'product_name'
        },
        {
          title: this.$t('price'),
          dataIndex: 'price'
        },
        {
          title: 'Attributes',
          key: 'attrs',
          scopedSlots: { customRender: 'attrs' }
        },
        {
          title: 'Attrs Total Price',
          key: 'attrs_total',
          scopedSlots: { customRender: 'attrs_total' }
        },
        {
          title: this.$t('quantity'),
          dataIndex: 'quantity'
        },
        {
          title: this.$t('total'),
          key: 'total',
          scopedSlots: { customRender: 'total' }
        }
      ]
    }
  },
  computed: {
    location () {
      if (this.order) {
        return [this.order.customer_location.lat, this.order.customer_location.long]
      } else return [41.309022097090235, 69.24136827883606]
    },
    // eslint-disable-next-line vue/return-in-computed-property
    status () {
      if (this.order) {
        switch (this.order.order_status_id) {
          case '986a0d09-7b4d-4ca9-8567-aa1c6d770505': return 0
          case '1b6dc9a3-64aa-4f68-b54f-71ffe8164cd3': return 1
          // case 'c4227d1b-c317-46f8-b1e3-a48c2496206f': return 3
          case 'b0cb7c69-5e3d-47c7-9813-b0a7cc3d81fd': return 2
          case '8781af8e-f74d-4fb6-ae23-fd997f4a2ee0': return 3
          // case '6ba783a3-1c2e-479c-9626-25526b3d9d36': return 6
          case '84be5a2f-3a92-4469-8283-220ca34a0de4': return 4
          case '79413606-a56f-45ed-97c3-f3f18e645972': return 5
          case 'e665273d-5415-4243-a329-aee410e39465': return 6
          // case 'd39cb255-6cf5-4602-896d-9c559d40cbbe': return 10
        }
      } else return 0
    }
  },
  methods: {
    handleOk () {
      this.previewModal = false
    },
    show () {
      this.previewModal = true
    },
    hide () {
      this.previewModal = false
    },
    totalPrice (item) {
      return (parseInt(item.price) + this.totalAttrPrice(item)) * parseInt(item.quantity)
    },
    totalAttrPrice (item) {
      const attrs = item.properties
      // eslint-disable-next-line no-unused-vars
      let total = 0
      if (attrs.length > 0) {
        for (var i = 0; i < attrs.length; i++) {
          if (attrs[i].values.length > 0) {
            for (var j = 0; j < attrs[i].values.length; j++) {
              if (attrs[i].values[j].additional_price) {
                total += parseInt(attrs[i].values[j].additional_price)
              }
            }
          }
        }
      }
      return total
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
    getTotalPrice (products, deliveryPrice) {
      let totalPrice = 0
      products.forEach(p => {
        totalPrice += p.price * p.quantity
      })
      return totalPrice + parseInt(deliveryPrice)
    }
  }
}
</script>
<style>
.ant-descriptions-bordered .ant-descriptions-item-label {
  background-color: #f1f1f19a;
  font-size: 16px;
  font-weight: 600;
}
.ant-descriptions-item-content {
  font-size: 16px;
}
</style>
