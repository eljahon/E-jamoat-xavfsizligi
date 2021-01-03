<template>
  <div>
    <a-card :title="$t('features.list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="() => { $router.push({ name: 'FeaturesCreate' }) }">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allFeatures"
        :loading="loadFeatures"
        :rowKey="item => item.id"
        :pagination="paginationFeatures"
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
            <a-button style="margin: 0 2px" type="primary" @click="editItem(item)" icon="edit"></a-button>
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
<!--    <create ref="createBrand" :editable="false" :params="params"/>-->
<!--    <create ref="editItem" :editable="true" :params="params"/>-->
  </div>
</template>
<script>
import Create from './FeaturesCreateWithUpdate'
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
          title: this.$t('name_ru'),
          dataIndex: 'name_ru',
        },
        {
          title: this.$t('name_uz'),
          dataIndex: 'name_uz',
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
          width: '15%',
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
    ...mapActions(['getAllFeatures', 'deleteFeatures']),
    editItem(item) {
      this.$router.push({
        name: 'FeaturesEdit',
        params: {
          id: item.id
        }
      })
      console.log(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllFeatures(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllCategory(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteFeatures(item.id).then(res => {
        this.getAllFeatures(this.params)
      })
    },
    addItem () {
      this.$refs.createBrand.show()
    }
  },
  computed: {
    ...mapGetters(['allFeatures', 'loadFeatures', 'paginationFeatures']),
  },
  mounted() {
    this.getAllFeatures(this.params)
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
