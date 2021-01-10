<template>
  <div>
    <a-card size="small" :title="$t('search_history.list')" style="width: 100%">
      <a-range-picker
        slot="extra"
        size='small'
        v-model="datePicker"
        valueFormat="YYYY-MM-DD"
        format="YYYY-MM-DD"
        :placeholder="['Дата начала', 'Дата окончания']"
        style="width: 100%">
      </a-range-picker>
      <a-table
        :columns="columns"
        size="small"
        :data-source="allSeHistory"
        :loading="loadSeHistory"
        :rowKey="item => item.id"
        :pagination="paginationSeHistory"
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      columns: [
        {
          title: this.$t('query'),
          dataIndex: 'query',
        },
        {
          title: this.$t('query.count'),
          dataIndex: 'query_count',
        },
        {
          title: this.$t('action'),
          key: 'action',
          align: 'center',
          width: '12%',
          scopedSlots: { customRender: 'action' },
        },
      ],
      datePicker: null,
      params: {
        pagination: {
          current: 1,
          pageSize: 15,
          total: null,
        },
        to: '',
        from: '',
        search: '',
      },
    }
  },
  watch: {
    datePicker (val) {
      this.params.to = val[1]
      this.params.from = val[0]
      this.getAllSeHistory(this.params)
      console.log(val)
    }
  },
  methods: {
    ...mapActions(['getAllSeHistory', 'updateNotifications']),
    readNotification(item) {
      console.log(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllSeHistory(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllSeHistory(this.params)
    }
  },
  computed: {
    ...mapGetters(['allSeHistory', 'loadSeHistory', 'paginationSeHistory']),
  },
  mounted() {
    this.getAllSeHistory(this.params)
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
