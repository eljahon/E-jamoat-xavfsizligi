<template>
  <div>
    <a-card :title="$t('category_list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addCategory">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allCategory"
        :loading="loadCategory"
        :rowKey="item => item.id"
        :pagination="paginationCategory"
        @change="changePagination"
        bordered
      >
        <template slot="status" slot-scope="is_popular">
          <a-tag @click="cropper" v-if="is_popular" color="green">Popular</a-tag>
          <a-tag v-else color="red">Not Popular</a-tag>
        </template>
        <template slot="image" slot-scope="item">
          <div class="imagePreview">
            <img :src="item" :alt="item.name">
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
    <cropper ref="imageCrop"></cropper>
    <category-create ref="createCategory" :editable="false" :params="params"/>
    <category-create ref="editCategory" :editable="true" :slug="slug" :params="params"/>
    <!-- <category-edit ref="editCategory" :editable="true" :params="params"/> -->
  </div>
</template>
<script>
import CreateCategory from './CategoryCreate'
import Croppper from '@/components/CropImageUpload/cropper'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'category-create': CreateCategory,
    'cropper': Croppper
    // 'category-edit': EditCategory
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
          title: 'Popular',
          dataIndex: 'is_popular',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: 'Image',
          dataIndex: 'image_url',
          scopedSlots: { customRender: 'image' },
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
    ...mapActions(['getAllCategory', 'updateCategory', 'deleteCategory']),
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
    lockCategory(item) {
      console.log(item)
      this.updateCategory({
        id: item.id,
        locker: true,
        data: {
          active: item.active,
          lang: item.lang,
          name: item.name,
          order: item.order,
          vendor_id: '5f4a2611c001ec0012f23596'
        },
      })
        .then((res) => {
          this.getAllCategory(this.params)
        })
        .catch((err) => {
          this.$notification.error({
            message: 'Error Request or Response',
            description: err.message,
          })
        })
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
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
.imagePreview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
