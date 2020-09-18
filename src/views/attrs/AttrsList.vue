<template>
  <div>
    <a-card :title="$t('attrs_list')" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addAttrs">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allAttrs"
        :loading="loadAttr"
        :rowKey="record => record.id"
        :pagination="paginationAttr"
        @change="changePagination"
        bordered
      >
        <template slot="status" slot-scope="is_active">
          <a-tag v-if="is_active" color="#108ee9">{{ $t('active') }}</a-tag>
          <a-tag v-else color="#f00">{{ $t('inactive') }}</a-tag>
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button style="margin: 0 2px" id="buttonUpdate" type="primary" @click="editAttr(item)" icon="edit"></a-button>
          </a-tooltip>
          <a-popconfirm
            placement="topRight"
            slot="extra"
            :title="$t('deleteMsg')"
            @confirm="removeAttr(item)"
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
    <attr-create ref="attrCreate" :params="params" :editable="false"></attr-create>
    <attr-create ref="attrEdit" :params="params" :slug="slug" :editable="true"></attr-create>
  </div>
</template>
<script>
import AttrCreate from '@/views/attrs/AttrCreate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'attr-create': AttrCreate
  },
  data() {
    return {
      visible: false,
      loading: false,
      slug: null,
      image: '',
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'Slug',
          dataIndex: 'slug',
        },
        {
          title: this.$t('status'),
          dataIndex: 'active',
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
          pageSize: 10,
          total: null,
        },
        search: '',
      },
    }
  },
  methods: {
    ...mapActions(['getAllAttrs', 'getProductBySlug', 'deleteAttr']),
    addAttrs () {
      this.$refs.attrCreate.show()
    },
    editAttr(item) {
      console.log(item)
      this.slug = item.slug
      setTimeout(() => {
        this.$refs.attrEdit.show()
      }, 100)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllAttrs(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllAttrs(this.params)
    },
    removeAttr (item) {
      console.log(item)
      this.deleteAttr(item.slug).then(res => {
        this.getAllAttrs(this.params)
      })
    }
  },
  computed: {
    ...mapGetters(['allAttrs', 'loadAttr', 'paginationAttr']),
  },
  mounted() {
    this.getAllAttrs(this.params)
  }
}
</script>
