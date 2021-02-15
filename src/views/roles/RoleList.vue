<template>
  <div>
    <a-card :title="$t('roles.list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addItem">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allRoles"
        :loading="loadRole"
        :rowKey="item => item.id"
        :pagination="paginationRole"
        @change="changePagination"
        bordered
      >
        <template slot="status" slot-scope="status">
          <a-tag v-if="status === 10" color="blue">{{ $t('active') }}</a-tag>
          <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
        </template>
        <template slot="phone" slot-scope="phone">
          +{{ phone }}
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
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
          title: this.$t('guard_name'),
          dataIndex: 'guard_name',
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
    ...mapActions(['getAllRole', 'deleteRole']),
    editItem(item) {
      this.$router.push({
        name: 'UserRoleUpdate',
        params: {
          id: item.id
        }
      })
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllRole(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllRole(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteRole(item.id).then(res => {
        this.getAllRole(this.params)
      })
    },
    addItem () {
      this.$router.push({
        name: 'UserRoleCreate'
      })
    }
  },
  computed: {
    ...mapGetters(['allRoles', 'loadRole', 'paginationRole']),
  },
  mounted() {
    this.getAllRole(this.params)
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
