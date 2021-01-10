<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-descriptions title="Lorem">
        <a-descriptions-item label="Lorem">1000000000</a-descriptions-item>
        <a-descriptions-item label="Lorem">Lorem</a-descriptions-item>
        <a-descriptions-item label="Lorem">1234123421</a-descriptions-item>
        <a-descriptions-item label="Lorem">3214321432</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>
      <a-descriptions title="Lorem">
        <a-descriptions-item label="Lorem">Lorem</a-descriptions-item>
        <a-descriptions-item label="Lorem">18100000000</a-descriptions-item>
        <a-descriptions-item label="Lorem">Lorem</a-descriptions-item>
        <a-descriptions-item label="Lorem">Lorem18Lorem</a-descriptions-item>
        <a-descriptions-item label="Lorem">	Lorem</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>

      <div class="title">Lorem</div>
      <s-table
        style="margin-bottom: 24px"
        row-key="id"
        :columns="goodsColumns"
        :data="loadGoodsData">

      </s-table>

      <div class="title">Lorem</div>
      <s-table
        style="margin-bottom: 24px"
        row-key="key"
        :columns="scheduleColumns"
        :data="loadScheduleData">

        <template
          slot="status"
          slot-scope="status">
          <a-badge :status="status" :text="status | statusFilter"/>
        </template>

      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'

export default {
  components: {
    STable
  },
  data () {
    return {
      goodsColumns: [
        {
          title: 'Lorem',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: 'Lorem',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Lorem',
          dataIndex: 'barcode',
          key: 'barcode'
        },
        {
          title: 'Lorem',
          dataIndex: 'price',
          key: 'price',
          align: 'right'
        },
        {
          title: 'Lorem（Lorem）',
          dataIndex: 'num',
          key: 'num',
          align: 'right'
        },
        {
          title: 'Lorem',
          dataIndex: 'amount',
          key: 'amount',
          align: 'right'
        }
      ],
      // Lorem Lorem Promise Lorem
      loadGoodsData: () => {
        return new Promise(resolve => {
          resolve({
            data: [
              {
                id: '1234561',
                name: 'Lorem 550ml',
                barcode: '12421432143214321',
                price: '2.00',
                num: '1',
                amount: '2.00'
              },
              {
                id: '1234562',
                name: 'Lorem 300ml',
                barcode: '12421432143214322',
                price: '3.00',
                num: '2',
                amount: '6.00'
              },
              {
                id: '1234563',
                name: 'Lorem',
                barcode: '12421432143214323',
                price: '7.00',
                num: '4',
                amount: '28.00'
              },
              {
                id: '1234564',
                name: 'Lorem',
                barcode: '12421432143214324',
                price: '8.50',
                num: '3',
                amount: '25.50'
              }
            ],
            pageSize: 10,
            pageNo: 1,
            totalPage: 1,
            totalCount: 10
          })
        }).then(res => {
          return res
        })
      },

      scheduleColumns: [
        {
          title: 'Lorem',
          dataIndex: 'time',
          key: 'time'
        },
        {
          title: 'Lorem',
          dataIndex: 'rate',
          key: 'rate'
        },
        {
          title: 'Lorem',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: 'LoremID',
          dataIndex: 'operator',
          key: 'operator'
        },
        {
          title: 'Lorem',
          dataIndex: 'cost',
          key: 'cost'
        }
      ],
      loadScheduleData: () => {
        return new Promise(resolve => {
          resolve({
            data: [
              {
                key: '1',
                time: '2017-10-01 14:10',
                rate: 'Lorem',
                status: 'processing',
                operator: 'Lorem ID1234',
                cost: '5mins'
              },
              {
                key: '2',
                time: '2017-10-01 14:05',
                rate: 'Lorem',
                status: 'success',
                operator: 'Lorem ID1234',
                cost: '1h'
              },
              {
                key: '3',
                time: '2017-10-01 13:05',
                rate: 'Lorem',
                status: 'success',
                operator: 'Lorem ID1234',
                cost: '5mins'
              },
              {
                key: '4',
                time: '2017-10-01 13:00',
                rate: 'Lorem',
                status: 'success',
                operator: 'Lorem',
                cost: '1h'
              },
              {
                key: '5',
                time: '2017-10-01 12:00',
                rate: 'Lorem',
                status: 'success',
                operator: 'Lorem',
                cost: '5mins'
              }
            ],
            pageSize: 10,
            pageNo: 1,
            totalPage: 1,
            totalCount: 10
          })
        }).then(res => {
          return res
        })
      }
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'processing': 'Lorem',
        'success': 'Lorem',
        'failed': 'Lorem'
      }
      return statusMap[status]
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  }

}
</script>

<style lang="less" scoped>
  .title {
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
</style>
