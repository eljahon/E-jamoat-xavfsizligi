<template>
  <a-spin size='large' :spinning='loadOrder'>
<!--    <a-card title='Order Details'>-->
      <a-row v-if='order'>
        <a-col :span='8' style='padding-right: 10px'>
          <a-card size='small' :title="$t('info_user')">
            <div class='title'><p>{{ $t('name') }}:</p> <span>{{ order.user.name }}</span></div>
            <div class='title'><p>{{ $t('name_user') }}:</p> <span>{{ order.user.first_name }}</span></div>
            <div class='title'><p>{{ $t('last_name') }}:</p> <span>{{ order.user.last_name }}</span></div>
            <div class='title'><p>{{ $t('phone') }}:</p> <span>{{ order.user.phone }}</span></div>
            <div class='title'><p>{{ $t('email') }}:</p> <span>{{ order.user.email }}</span></div>
            <div class='title'><p>{{ $t('birth_date') }}:</p> <span>{{ order.user.birth_date }}</span></div>
          </a-card>
        </a-col>
        <a-col :span='8' style='padding-left: 10px; padding-right: 10px'>
          <a-card size='small' :title="$t('info_courier')">
            <div class='title'><p>{{ $t('name_user') }}:</p> <span>{{ order.courier.name }}</span></div>
            <div class='title'><p>{{ $t('car_model') }}:</p> <span>{{ order.courier.car_model }}</span></div>
            <div class='title'><p>{{ $t('car_number') }}:</p> <span>{{ order.courier.car_number }}</span></div>
            <div class='title'><p>{{ $t('car_type') }}:</p> <span>{{ order.courier.car_type }}</span></div>
            <div class='title'><p>{{ $t('phone') }}:</p> <span>{{ order.courier.phone }}</span></div>
            <div class='title'><p>{{ $t('status') }}:</p> <span>
              <a-tag v-if='order.courier.status === 10' color='blue'>{{ $t('active') }}</a-tag>
                            <a-tag v-else color='red'>{{ $t('inactive') }}</a-tag>
            </span></div>
          </a-card>
        </a-col>
        <a-col :span='8' style='padding-left: 10px'>
          <a-card size='small' :title="$t('info_order')">
            <div class='title'><p>{{ $t('id') }}:</p> <span> #{{ order.id }} ( {{ order.uuid }} )</span></div>
            <div class='title'><p>{{ $t('delivery_type') }}:</p> <span>{{ order.delivery_type }}</span></div>
            <div class='title'><p>{{ $t('total_price') }}:</p> <span>{{ new Intl.NumberFormat().format(order.total_price) }} {{ $t('sum') }}</span></div>
            <div class='title'><p>{{ $t('comment') }}:</p> <span>{{ order.comment }}</span></div>
            <div class='title'><p>{{ $t('created_at') }}:</p> <span>{{ moment(order.created_at).format('YYYY-MM-DD HH:mm') }}</span></div>
            <div class='title'><p>{{ $t('status') }}:</p><span>
              <a-tag v-if='order.courier.status === 10' color='blue'>{{ $t('active') }}</a-tag>
                            <a-tag v-else color='red'>{{ $t('inactive') }}</a-tag>
            </span></div>
          </a-card>
        </a-col>
      </a-row>
      <a-row v-if='order' style='margin-top: 20px'>
        <a-card size='small' :title="$t('info_delivery')">
<!--          <div class='title'><p>name:</p> <span>{{ order.user.name }}</span></div>-->
          <div class='title'><p>{{ $t('name') }}:</p> <span>{{ order.address.first_name }}</span></div>
<!--          <div class='title'><p>{{ $t('last_name') }}:</p> <span>{{ order.address.last_name }}</span></div>-->
          <div class='title'><p>{{ $t('address') }}:</p> <span>{{ order.address.address }}</span></div>
          <div class='title'><p>{{ $t('location_name') }}:</p> <span>{{ order.address.location_name }}</span></div>
<!--          <div class='title'><p>email:</p> <span>{{ // order.address.email }}</span></div>-->
        </a-card>
      </a-row>
    <a-card size='small' :title="$t('products')" style='margin-top: 20px'>
      <a-table
        v-if='order'
        size="small"
        :columns="columns"
        :data-source="order.products"
        :pagination='false'
        :rowKey="item => item.id"
      >
        <template slot="image" slot-scope="image">
          <div class="imagePreview">
            <img v-if="image" :src="image" :alt="image">
            <img v-else src="../../assets/upload.jpg" :alt="image">
          </div>
        </template>
        <template slot="status" slot-scope="status">
          <a-tag v-if="status === 10" color="blue">{{ $t('active') }}</a-tag>
          <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
        </template>
      </a-table>
    </a-card>
<!--    </a-card>-->
  </a-spin>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      order: null,
      columns: [
        {
          title: 'Image',
          dataIndex: 'avatar',
          align: 'center',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: this.$t('name'),
          dataIndex: 'name',
        },
        {
          title: this.$t('brands'),
          dataIndex: 'brand_name',
        },
        {
          title: this.$t('category'),
          dataIndex: 'category_name',
        },
        {
          title: this.$t('supplier'),
          dataIndex: 'supplier.name',
        },
        {
          title: this.$t('price'),
          dataIndex: 'price',
        },
        {
          title: this.$t('quantity'),
          dataIndex: 'qty',
          align: 'center'
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
          width: '15%',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  methods: {
    moment,
    ...mapActions(['getOrderById']),
    getOrder() {
      this.getOrderById(this.$route.params.id).then(res => {
        console.log(res)
        this.order = res
      })
    }
  },
  computed: {
    ...mapGetters(['loadOrder'])
  },
  mounted() {
    this.getOrder()
  }
}
</script>

<style scoped>
.title {
  /*margin-left: 15px;*/
  display: flex;
}

.title p {
  font-size: 14px;
  font-weight: 600;
}

.title span {
  font-size: 14px;
  margin-left: 15px;
}
.imagePreview img {
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  object-fit: cover;
}
</style>
