<template>
  <div>
    <a-card size="small" :title="$t('complaints.list')" style="width: 100%">
      <a-table
        :columns="columns"
        size="small"
        :data-source="allComplaint"
        :loading="loadComplaints"
        :rowKey="item => item.id"
        :pagination="paginationComplaints"
        @change="changePagination"
      >
        <template slot="status" slot-scope="status">
          <a-tag v-if="status === 10" color="blue">{{ $t('reading') }}</a-tag>
          <a-tag v-else color="green">{{ $t('unreading') }}</a-tag>
        </template>
        <template slot="phone" slot-scope="phone">
          +{{ phone }}
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
          title: this.$t('name'),
          dataIndex: 'name',
        },
        {
          title: this.$t('phone'),
          dataIndex: 'phone',
          scopedSlots: { customRender: 'phone' }
        },
        {
          title: this.$t('email'),
          dataIndex: 'email',
        },
        {
          title: this.$t('complaint_type'),
          dataIndex: 'complaint_type',
        },
        {
          title: this.$t('comment'),
          dataIndex: 'comment',
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
    ...mapActions(['getAllComplaints', 'updateComplaints']),
    readNotification(item) {
      if (item.status !== 10) {
        this.updateComplaints({
          id: item.id,
          data: {
            status: 10
          }
        }).then(res => {
          this.getAllComplaints(this.params)
        })
      }
      this.$refs.preview.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllComplaints(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllComplaints(this.params)
    }
  },
  computed: {
    ...mapGetters(['allComplaint', 'loadComplaints', 'paginationComplaints']),
  },
  mounted() {
    this.getAllComplaints(this.params)
  }
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
