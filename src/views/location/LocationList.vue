<template>
  <div>
    <a-card title="Location List" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addItem">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allLocations"
        :loading="loadLocation"
        :rowKey="item => item.id"
        :pagination="paginationLocation"
        @change="changePagination"
        bordered
      >
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
    <location-create ref="createLocation" :editable="false" :params="params"/>
    <location-create ref="editLocation" :editable="true" :params="params"/>
  </div>
</template>
<script>
import locationCreate from './LocationCreateWithUpdate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'location-create': locationCreate,
    // 'category-edit': editItem
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
          title: 'Slug',
          dataIndex: 'slug',
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
    ...mapActions(['getAllLocations', 'deleteCourier', 'deleteLocation']),
    editItem(item) {
      this.$refs.editLocation.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllLocations(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllCategory(this.params)
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
    this.getAllLocations(this.params)
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
