<template>
  <div>
    <a-card :title="$t('brands.list')" style="width: 100%">
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
        <template slot="popular" slot-scope="is_popular">
          <a-tag v-if="is_popular" color="green">{{ $t('popular') }}</a-tag>
          <a-tag v-else color="red">{{ $t('popular.no') }}</a-tag>
        </template>
        <template slot="status" slot-scope="status">
          <a-tag v-if="status === 10" color="blue">{{ $t('active') }}</a-tag>
          <a-tag v-else color="red">{{ $t('inactive') }}</a-tag>
        </template>
        <template slot="image" slot-scope="item">
          <div class="imagePreview">
            <img :src="item.logo_url">
          </div>
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
          title: this.$t('name_ru'),
          dataIndex: 'name_ru',
        },
        {
          title: this.$t('name_uz'),
          dataIndex: 'name_uz',
        },
        {
          title: this.$t('slug'),
          dataIndex: 'slug',
        },
        {
          title: this.$t('popular'),
          dataIndex: 'is_popular',
          scopedSlots: { customRender: 'popular' },
        },
        {
          title: this.$t('status'),
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: this.$t('image'),
          align: 'center',
          scopedSlots: { customRender: 'image' },
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
    ...mapActions(['getAllBrands', 'deleteBrand']),
    editBrand(item) {
      this.$refs.editBrand.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllBrands(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllCategory(this.params)
    },
    removeBrand (item) {
      console.log(item)
      this.deleteBrand(item.id).then(res => {
        this.getAllBrands(this.params)
      })
    },
    addBrand () {
      this.$refs.createBrand.show()
    }
  },
  computed: {
    ...mapGetters(['allBrands', 'loadBrand', 'paginationBrand']),
  },
  mounted() {
    this.getAllBrands(this.params)
  },
}
</script>
<style>
.imagePreview img {
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  object-fit: cover;
}
</style>
