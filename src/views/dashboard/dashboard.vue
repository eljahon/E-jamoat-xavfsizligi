<template>
  <div>
    <div v-if='topPages && topPages.length && topClients && topClients.length && topData && topData.length && topPages && topPages.length'>
      <a-row type="flex" v-if='topData && topData.length'>
        <a-col style="margin: 15px 0; padding: 0 10px" :xs='24' :sm='12' :md='6' :lg='3' v-for='item in topData' :key='item.name'>
          <div class='topData'>
            <p class='name'>{{ item.name }}</p>
            <p class='number'>{{ item.data.number }}</p>
            <p class='percent' :style="item.data.percent < 0 ? 'color: red;' : 'color: green'">{{ item.data.percent > 0 ? '+' : '' }}{{ item.data.percent }}%</p>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :sm='24' :md='12' :lg='12' style='padding-right: 5px; padding-top: 10px'>
          <a-card style='box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'>
            <a-table size='middle' :columns="columns" :data-source="topProducts"></a-table>
          </a-card>
        </a-col>
        <a-col :sm='24' :md='12' :lg='12' style='padding-left: 5px; padding-top: 10px'>
          <a-card style='box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'>
            <a-table size='middle' :columns="columnsPages" :data-source="topPages"></a-table>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :sm='24' :md='12' :lg='12' style='padding-right: 5px; padding-top: 10px'>
          <a-card style='box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'>
            <a-table size='middle' :columns="columnsClient" :data-source="topClients" :scroll='{ x: 400 }'></a-table>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <a-card v-else>
      <div style='display: flex'><a-skeleton v-for='n in 5' :key='n' active style='width: 200px; margin: 10px 15px'/></div>
      <a-skeleton v-for='n in 3' :key='n' active style='margin: 5px 10px'/>
    </a-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name'
        },
        {
          title: 'Sold',
          dataIndex: 'sold'
        },
        {
          title: 'Amount',
          dataIndex: 'total_amount'
        }
      ],
      columnsClient: [
        {
          title: 'Name',
          dataIndex: 'name'
        },
        {
          title: 'Phone',
          dataIndex: 'phone'
        },
        {
          title: 'Email',
          dataIndex: 'email'
        },
        {
          title: 'Buy Products',
          dataIndex: 'product_qty',
          align: 'center'
        },
        {
          title: 'Price',
          dataIndex: 'product_price'
        }
      ],
      columnsPages: [
        {
          title: 'Title',
          dataIndex: 'title'
        },
        {
          title: 'Count',
          dataIndex: 'count'
        },
      ],
      topData: [],
      topProducts: [],
      topClients: [],
      topPages: []
    }
  },
   methods: {
    ...mapActions(['getDashboardTopData', 'getDashboardTopProducts', 'getDashboardTopClients', 'getDashboardTopPages'])
   },
   mounted() {
    this.getDashboardTopData().then(res => { this.topData = res })
     this.getDashboardTopProducts().then(res => { this.topProducts = res })
     this.getDashboardTopClients().then(res => { this.topClients = res })
     this.getDashboardTopPages().then(res => { this.topPages = res })
   }
}
</script>

<style lang='less' scoped>
.topData {
  width: 100%;
  flex: 1;
  flex-shrink: inherit;
  height: 120px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: white;
  //margin: 15px 0;
  .name, .number, .percent {
    padding: 0 !important;
    margin: 0 !important;
  }
  .name {
    transform: translate(-10px, -15px);
  }
  .number {
    position: absolute;
    font-size: 28px;
    font-weight: 700;
    top: 55%;
    left: 10%;
  }
  .percent {
    position: absolute;
    font-size: 16px;
    font-weight: 500;
    top: 57%;
    left: 40%;
  }
}
</style>
