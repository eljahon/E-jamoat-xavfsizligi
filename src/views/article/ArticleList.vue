<template>
  <div>
    <a-card title="Article List" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addItem">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allArticles"
        :loading="loadArticle"
        :rowKey="item => item.id"
        :pagination="paginationArticle"
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
            :okText="$t(
              'yes')"
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
    <article-create ref="createArticle" :editable="false" :params="params"/>
    <article-create ref="editArticle" :editable="true" :params="params"/>
  </div>
</template>
<script>
import articleCreate from './ArticleCreateWithUpdate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'article-create': articleCreate,
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
          title: 'Symbol',
          dataIndex: 'symbol',
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
    ...mapActions(['getAllArticles', 'deleteArticle']),
    editItem(item) {
      this.$refs.editArticle.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllArticles(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllArticles(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteArticle(item.id).then(res => {
        this.getAllArticles(this.params)
      })
    },
    addItem () {
      this.$refs.createArticle.show()
    }
  },
  computed: {
    ...mapGetters(['allArticles', 'loadArticle', 'paginationArticle']),
  },
  mounted() {
    this.getAllArticles(this.params)
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
