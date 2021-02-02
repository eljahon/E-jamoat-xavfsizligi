<template>
  <div>
    <a-card size="small" :title="$t('category_list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addCategory">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        size="small"
        :data-source="allCategory"
        :loading="loadCategory"
        :rowKey="item => item.id"
        :pagination="paginationCategory"
        @change="changePagination"
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
            <img v-if="item.image_url" :src="item.image_url" :alt="item.image_url.name">
            <img v-else src="../../assets/upload.jpg" :alt="item.name">
          </div>
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button style="margin: 0 2px" id="buttonUpdate" type="primary" @click="editCategory(item)" icon="edit"></a-button>
          </a-tooltip>
          <a-popconfirm
            placement="topRight"
            slot="extra"
            :title="$t('deleteMsg')"
            @confirm="removeCategory(item)"
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
<!--    <cropper ref="imageCrop"></cropper>-->
    <category-create ref="createCategory" :editable="false" :params="params"/>
    <category-create ref="editCategory" :editable="true" :params="params"/>
    <!-- <category-edit ref="editCategory" :editable="true" :params="params"/> -->
  </div>
</template>
<script>
import CreateCategory from './CategoryCreate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'category-create': CreateCategory
  },
  data() {
    return {
      visible: false,
      loading: false,
      columns: [
        {
          title: this.$t('image'),
          align: 'center',
          scopedSlots: { customRender: 'image' },
        },
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
    ...mapActions(['getAllCategory', 'updateCategory', 'deleteCategory', 'getTreeCategory']),
    cropper () {
      this.$refs.imageCrop.show()
    },
    editCategory(item) {
      this.$refs.editCategory.show(item)
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
    removeCategory (item) {
      console.log(item)
      this.deleteCategory(item.id).then(res => {
        this.getAllCategory(this.params)
      })
    },
    addCategory () {
      this.$refs.createCategory.show()
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
    ...mapGetters(['allCategory', 'loadCategory', 'paginationCategory']),
  },
  mounted() {
    this.getAllCategory(this.params)
    this.getTreeCategory()
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
.imagePreview img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
