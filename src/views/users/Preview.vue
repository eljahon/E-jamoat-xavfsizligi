<template>
  <a-card>
    <a-tabs type='card'>
      <a-tab-pane key='1' :tab="$t('info')">
        <a-descriptions v-if='info' layout='vertical' bordered>
          <a-descriptions-item :label="$t('first_name')">{{ info.profile.first_name }}</a-descriptions-item>
          <a-descriptions-item :label="$t('last_name')">{{ info.profile.last_name }}</a-descriptions-item>
          <a-descriptions-item :label="$t('name')">{{ info.name }}</a-descriptions-item>
          <a-descriptions-item :label="$t('phone')">{{ info.phone }}</a-descriptions-item>
          <a-descriptions-item :label="$t('email')">{{ info.email }}</a-descriptions-item>
          <a-descriptions-item :label="$t('birth_date')">{{ info.profile.birth_date }}</a-descriptions-item>
          <a-descriptions-item :label="$t('gender')">{{ info.profile.gender === 'm' ? 'Мужской' : 'Женщина' }}
          </a-descriptions-item>
          <a-descriptions-item :label="$t('status')">
            <a-tag v-if='info.status === 10' color='blue'>{{ $t('active') }}</a-tag>
            <a-tag v-else color='red'>{{ $t('inactive') }}</a-tag>
          </a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
      <a-tab-pane key='2' :tab="$t('addresses')">
        <a-table
          v-if='info'
          :columns='columns.addresses'
          :data-source='info.addresses'
          :rowKey='item => item.id'
          :pagination='false'
        />
      </a-tab-pane>
      <a-tab-pane key='3' :tab="$t('wishlists')">
        <a-table
          v-if='info'
          :columns='columns.wishlists'
          :data-source='info.wishlists'
          :rowKey='item => item.id'
          :pagination='false'
        />
      </a-tab-pane>
      <a-tab-pane key='4' :tab="$t('orders')">
        <a-table
          v-if='info'
          :columns='columns.orders'
          :data-source='info.orders'
          :rowKey='item => item.id'
          :pagination='false'
        >
          <template slot="status" slot-scope="status">
            <a-tag v-if="status === 10" color="blue">{{ $t('active') }}</a-tag>
            <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
          </template>
          <template slot="created_at" slot-scope="created_at">
            {{ moment(created_at).format('YYYY-MM-DD HH:mm') }}
          </template>
        </a-table>
      </a-tab-pane>
<!--      <a-tab-pane key='5' tab='Top pages'>-->
<!--        <p>Content of Tab Pane 3</p>-->
<!--      </a-tab-pane>-->
      <a-tab-pane key='5' :tab="$t('complaints')">
        <a-table
          v-if='info'
          :columns='columns.complaints'
          :data-source='info.complaints'
          :rowKey='item => item.id'
          :pagination='false'
        />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>

import { mapActions } from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      loading: false,
      info: null,
      columns: {
        addresses: [
          {
            title: this.$t('first_name'),
            dataIndex: 'first_name',
            key: '1'
          },
          {
            title: this.$t('last_name'),
            dataIndex: 'last_name',
            key: '2'
          },
          {
            title: this.$t('phone'),
            dataIndex: 'phone',
            key: '3'
          },
          {
            title: this.$t('landmark'),
            dataIndex: 'landmark',
            key: '4'
          },
          {
            title: this.$t('address'),
            dataIndex: 'address',
            key: '5'
          }
        ],
        wishlists: [
          {
            title: this.$t('id'),
            dataIndex: 'product_id',
            key: '1'
          },
          {
            title: this.$t('product'),
            dataIndex: 'product_name',
            key: '2'
          }
        ],
        orders: [
          {
            title: this.$t('created_at'),
            dataIndex: 'created_at',
            key: '0',
            scopedSlots: { customRender: 'created_at' }
          },
          {
            title: this.$t('username'),
            dataIndex: 'user_name',
            key: '1'
          },
          {
            title: this.$t('courier'),
            dataIndex: 'courier',
            key: '2'
          },
          {
            title: this.$t('address'),
            dataIndex: 'address',
            key: '3'
          },
          {
            title: this.$t('status'),
            dataIndex: 'status',
            key: '4',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: this.$t('total_price'),
            dataIndex: 'total_price',
            key: '5'
          }
        ],
        complaints: [
          {
            title: this.$t('name'),
            dataIndex: 'name',
            key: '0'
          },
          {
            title: this.$t('phone'),
            dataIndex: 'phone',
            key: '1'
          },
          {
            title: this.$t('email'),
            dataIndex: 'email',
            key: '2'
          },
          {
            title: this.$t('complaint_type'),
            dataIndex: 'complaint_type',
            key: '3'
          },
          {
            title: this.$t('comment'),
            dataIndex: 'comment',
            key: '4'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['getUserById']),
    moment
  },
  mounted() {
    this.loading = true
    this.getUserById(this.$route.params.id).then(res => {
      this.info = res.data
    }).finally(() => {
      this.loading = false
    })
  }
}
</script>

<style scoped>

</style>
