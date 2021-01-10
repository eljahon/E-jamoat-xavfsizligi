<template>
  <div>
    <a-card size="small" :title="$t('notifications.list')" style="width: 100%">
      <a-table
        :columns="columns"
        size="small"
        :data-source="allNotification"
        :loading="loadNotifications"
        :rowKey="item => item.id"
        :pagination="paginationNotifications"
        @change="changePagination"
      >
        <template slot="status" slot-scope="status">
          <a-tag v-if="status === 10" color="blue">{{ $t('reading') }}</a-tag>
          <a-tag v-else color="green">{{ $t('unreading') }}</a-tag>
        </template>
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('view') }}</template>
            <a-button size="small" style="margin: 0 2px" type="default" @click="readNotification(item)" icon="eye"></a-button>
          </a-tooltip>
        </template>
      </a-table>
    </a-card>
    <preview ref='preview'/>
  </div>
</template>
<script>
import preview from './Preview'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'preview': preview
  },
  data() {
    return {
      columns: [
        {
          title: this.$t('username'),
          dataIndex: 'user_name',
        },
        {
          title: this.$t('title'),
          dataIndex: 'title',
        },
        {
          title: this.$t('text'),
          dataIndex: 'text',
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
    ...mapActions(['getAllNotifications', 'updateNotifications']),
    readNotification(item) {
      if (item.status !== 10) {
        this.updateNotifications({
          id: item.id,
          data: {
            status: 10
          }
        }).then(res => {
          this.getAllNotifications(this.params)
        })
      }
      this.$refs.preview.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllNotifications(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllNotifications(this.params)
    }
  },
  computed: {
    ...mapGetters(['allNotification', 'loadNotifications', 'paginationNotifications']),
  },
  mounted() {
    this.getAllNotifications(this.params)
  }
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
