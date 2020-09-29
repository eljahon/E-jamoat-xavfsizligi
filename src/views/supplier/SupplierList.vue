<template>
  <div>
    <a-card title="Supplier List" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addItem">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allSuppliers"
        :loading="loadSupplier"
        :rowKey="item => item.id"
        :pagination="paginationSupplier"
        @change="changePagination"
        bordered
      >
        <template slot="phone" slot-scope="phone">
          +998{{ phone }}
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
    <supplier-create ref="createSupplier" :editable="false" :params="params"/>
    <supplier-create ref="editSupplier" :editable="true" :params="params"/>
  </div>
</template>
<script>
import supplierCreate from './SupplierCreateWithUpdate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'supplier-create': supplierCreate,
  },
  data() {
    return {
      visible: false,
      loading: false,
      slug: null,
      columns: [
        {
          title: 'Name UZ',
          dataIndex: 'name_uz',
        },
        {
          title: 'Name RU',
          dataIndex: 'name_ru',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          scopedSlots: { customRender: 'phone' },
        },
        {
          title: 'Email',
          dataIndex: 'email',
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
    ...mapActions(['getAllSuppliers', 'deleteSupplier']),
    editItem(item) {
      this.$refs.editSupplier.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllSuppliers(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllSuppliers(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteSupplier(item.id).then(res => {
        this.getAllSuppliers(this.params)
      })
    },
    addItem () {
      this.$refs.createSupplier.show()
    }
  },
  computed: {
    ...mapGetters(['allSuppliers', 'loadSupplier', 'paginationSupplier']),
  },
  mounted() {
    this.getAllSuppliers(this.params)
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
