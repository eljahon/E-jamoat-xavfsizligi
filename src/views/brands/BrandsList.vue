<template>
  <div>
    <a-card title="Brand List" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addBrand">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allBrands"
        :loading="loadBrand"
        :rowKey="item => item.id"
        @change="changePagination"
        bordered
      >
        <template slot="status" slot-scope="item">
          <a-tag v-if="item.is_popular" color="green">Popular</a-tag>
          <a-tag v-else color="red">Not Popular</a-tag>
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button style="margin: 0 2px" id="buttonUpdate" type="primary" @click="editBrand(item)" icon="edit"></a-button>
          </a-tooltip>
          <a-popconfirm
            placement="topRight"
            slot="extra"
            :title="$t('deleteMsg')"
            @confirm="removeBrand(item)"
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
    <brand-create ref="createBrand" :editable="false" :params="params"/>
    <brand-create ref="editBrand" :editable="true" :params="params"/>
  </div>
</template>
<script>
import BrandCreate from './BrandCreate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'brand-create': BrandCreate,
    // 'category-edit': editBrand
  },
  data() {
    return {
      visible: false,
      loading: false,
      slug: null,
      columns: [
        {
          title: 'Name',
          dataIndex: 'name_ru',
        },
        {
          title: 'Name uz',
          dataIndex: 'name_uz',
        },
        {
          title: 'Slug',
          dataIndex: 'slug',
        },
        {
          title: 'Status',
          dataIndex: 'is_popular',
          scopedSlots: { customRender: 'status' },
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
    ...mapActions(['getAllBrands', 'deleteCourier', 'deleteBrand']),
    editBrand(item) {
      this.$refs.editBrand.show(item)
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
    removeBrand (item) {
      console.log(item)
      this.deleteBrand(item.id).then(res => {
        this.getAllBrands()
      })
    },
    addBrand () {
      this.$refs.createBrand.show()
    },
    enterProduct (id) {
      this.$router.push({
        name: 'CategoryProduct',
        params: {
          categoryId: id
        }
      })
    },
  },
  computed: {
    ...mapGetters(['allBrands', 'loadBrand', 'paginationBrand']),
  },
  mounted() {
    this.getAllBrands()
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
