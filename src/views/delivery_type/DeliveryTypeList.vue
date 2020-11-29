<template>
  <div>
    <a-card :title="$t('delivery_type.list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addItem">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="alldeliveryTypes"
        :loading="loadDeliveryTypes"
        :rowKey="item => item.id"
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
    <delivery-create ref="createDeliveryType" :editable="false" :params="params"/>
    <delivery-create ref="editDeliveryType" :editable="true" :params="params"/>
  </div>
</template>
<script>
import deliveryTypeCreate from './DeliveryTypeCreateWithUpdate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'delivery-create': deliveryTypeCreate
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
          title: this.$t('price'),
          dataIndex: 'price',
        },
        {
          title: this.$t('status'),
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: this.$t('action'),
          key: 'action',
          align: 'center',
          width: '20%',
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
    ...mapActions(['getAllDeliveryTypes', 'deleteDeliveryTypes']),
    editItem(item) {
      this.$refs.editDeliveryType.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllDeliveryTypes(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllCategory(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteDeliveryTypes(item.id).then(res => {
        this.getAllDeliveryTypes(this.params)
      })
    },
    addItem () {
      this.$refs.createDeliveryType.show()
    }
  },
  computed: {
    ...mapGetters(['alldeliveryTypes', 'loadDeliveryTypes', 'paginationDeliveryTypes']),
  },
  mounted() {
    this.getAllDeliveryTypes(this.params)
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
