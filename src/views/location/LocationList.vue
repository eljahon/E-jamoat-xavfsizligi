<template>
  <div>
    <a-card size="small" :title="$t('location.list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addItem">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input allow-clear @change="search" v-model="params.search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        size="middle"
        :columns="columns"
        :data-source="allLocations"
        :loading="loadLocation"
        :rowKey="item => item.id"
        :pagination="paginationLocation"
        @change="changePagination"
      >
        <template slot="status" slot-scope="status">
          <a-tag v-if="status === 10" color="blue">{{ $t('active') }}</a-tag>
          <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
        </template>
        <template slot="has_delivery" slot-scope="has_delivery">
          <a-tag v-if="has_delivery" color="green">{{ $t('active') }}</a-tag>
          <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button style="margin: 0 2px" size="small" type="primary" @click="editItem(item)" icon="edit"></a-button>
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
                size="small"
                type="danger"
                icon="delete"
              ></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>

    <!-- MODALS -->
    <location-create ref="createLocation" :editable="false" :params="params"/>
    <location-create ref="editLocation" :editable="true" :params="params"/>
  </div>
</template>
<script>
import locationCreate from './LocationCreateWithUpdate'
import { mapActions, mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
export default {
  components: {
    'location-create': locationCreate
  },
  data() {
    this.search = debounce(this.search, 1000)
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
          title: this.$t('slug'),
          dataIndex: 'slug',
        },
        {
          title: this.$t('has_delivery'),
          dataIndex: 'has_delivery',
          scopedSlots: { customRender: 'has_delivery' }
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
    ...mapActions(['getAllLocations', 'deleteLocation', 'getParentLocationsList']),
    editItem(item) {
      this.$refs.editLocation.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.$router.push({
        name: 'locationList',
        query: {
          page: e.current
        }
      })
      this.getAllLocations(this.params)
    },
    search(value) {
      console.log(value)
      // this.params.search = value
      this.getAllLocations(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteLocation(item.id).then(res => {
        this.getAllLocations(this.params)
      })
    },
    addItem () {
      this.$refs.createLocation.show()
    }
  },
  computed: {
    ...mapGetters(['allLocations', 'loadLocation', 'paginationLocation']),
  },
  mounted() {
    if (this.$route.query.page) {
      this.params.pagination.current = parseInt(this.$route.query.page)
      this.$router.push({
        name: 'locationList',
        query: {
          page: this.params.pagination.current
        }
      })
      this.getAllLocations(this.params)
    } else {
      this.$router.replace({
        name: 'locationList',
        query: {
          page: 1
        }
      })
      this.getAllLocations(this.params)
    }
    this.getParentLocationsList()
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
