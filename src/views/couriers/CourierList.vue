<template>
  <div>
    <a-card :title="$t('couriers.list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addCourier">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allCouriers"
        :loading="loadCourier"
        :rowKey="item => item.id"
        @change="changePagination"
        bordered
      >
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button style="margin: 0 2px" id="buttonUpdate" type="primary" @click="editCourier(item)" icon="edit"></a-button>
          </a-tooltip>
          <a-popconfirm
            placement="topRight"
            slot="extra"
            :title="$t('deleteMsg')"
            @confirm="removeCourier(item)"
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
    <courier-create ref="createCourier" :editable="false" :params="params"/>
    <courier-create ref="editCourier" :editable="true" :params="params"/>
  </div>
</template>
<script>
import CourierCreate from './CourierCreate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'courier-create': CourierCreate,
    // 'category-edit': editCourier
  },
  data() {
    return {
      visible: false,
      loading: false,
      slug: null,
      columns: [
        {
          title: this.$t('name'),
          dataIndex: 'name'
        },
        {
          title: this.$t('phone'),
          dataIndex: 'phone'
        },
        {
          title: this.$t('car_type'),
          dataIndex: 'car_type'
        },
        {
          title: this.$t('car_number'),
          dataIndex: 'car_number'
        },
        {
          title: this.$t('car_model'),
          dataIndex: 'car_model',
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
          pageSize: 100,
          total: null,
        },
        search: '',
      },
    }
  },
  methods: {
    ...mapActions(['getAllCouriers', 'deleteCourier']),
    editCourier(item) {
      this.$refs.editCourier.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllCategory(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllCategory(this.params)
    },
    removeCourier (item) {
      console.log(item)
      this.deleteCourier(item.id).then(res => {
        this.getAllCouriers()
      })
    },
    addCourier () {
      this.$refs.createCourier.editable = false
      this.$refs.createCourier.show()
    },
    enterProduct (id) {
      this.$router.push({
        name: 'CategoryProduct',
        params: {
          categoryId: id
        }
      })
    },
    rowEvent (record, index) {
      return {
        on: {
          click: (event) => {
            console.log(event, record)
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['allCouriers', 'loadCourier', 'paginationCategory']),
  },
  mounted() {
    this.getAllCouriers()
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
