<template>
  <div>
    <a-card :title="$t('users.list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addItem">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allUsers"
        :loading="loadUsers"
        :rowKey="item => item.id"
        :pagination="paginationUsers"
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
    <create ref="createItem" :editable="false" :params="params"/>
    <create ref="editItem" :editable="true" :params="params"/>
  </div>
</template>
<script>
import Create from './StaffCreateWithUpdate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'create': Create,
  },
  data() {
    return {
      visible: false,
      loading: false,
      columns: [
        {
          title: this.$t('name'),
          dataIndex: 'name',
        },
        {
          title: this.$t('phone'),
          dataIndex: 'phone',
        },
        {
          title: this.$t('email'),
          dataIndex: 'email',
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
    ...mapActions(['getAllUsers', 'deleteUsers']),
    editItem(item) {
      this.$refs.editItem.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllUsers(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllUsers(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteMeasure(item.id).then(res => {
        this.getAllUsers(this.params)
      })
    },
    addItem () {
      this.$refs.createItem.show()
    }
  },
  computed: {
    ...mapGetters(['allUsers', 'loadUsers', 'paginationUsers']),
  },
  mounted() {
    this.getAllUsers(this.params)
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
