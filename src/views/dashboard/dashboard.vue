<template>
  <div>
    <a-card :title="$t('dashboard')" v-if='topPages && topClients && topData && topPages && charts'>
      <a-range-picker separator='--->' valueFormat="YYYY-MM-DD" format="YYYY-MM-DD" v-model='rangePicker' slot='extra' @change="onChangeDateFilter" :placeholder="[$t('start_time'), $t('end_time')]" />
      <div>
        <a-row type="flex" v-if='topData && topData.length'>
          <a-col style="margin: 15px 0; margin-right: 21px" :xs='24' :sm='12' :md='6' :lg='3' v-for='item in topData' :key='item.name'>
            <div class='topData'>
              <p class='name'>{{ item.name }}</p>
              <p class='number'>{{ item.data.number }}</p>
              <p class='percent' :style="item.data.percent < 0 ? 'color: red;' : 'color: green'">{{ item.data.percent > 0 ? '+' : '' }}{{ item.data.percent }}%</p>
            </div>
          </a-col>
        </a-row>
        <a-row v-if='charts'>
          <a-col :sm="24" :md="12" :xl="8" style='padding-right: 5px'>
            <a-card>
              <bar title='Birnima' :head-title='charts.chart_one.chart[0].name' :data='charts.chart_one.chart[0].data' :labels='charts.chart_one.days'></bar>
            </a-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="8" style='padding-right: 5px; padding-left: 5px'>
            <a-card>
              <line-chart title='Birnima' :head-title='charts.chart_one.chart[1].name' :data='charts.chart_one.chart[1].data' :labels='charts.chart_one.days'></line-chart>
            </a-card>
          </a-col>
          <a-col :sm="24" :md="12" :xl="8" style='padding-left: 5px'>
            <a-card>
              <bar title='Birnima' :head-title='charts.chart_one.chart[2].name' :data='charts.chart_one.chart[2].data' :labels='charts.chart_one.days'></bar>
            </a-card>
          </a-col>

        </a-row>
        <a-row>
          <a-col :span='24' style='padding-top: 10px'>
            <a-card style='box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'>
              <a-table size='middle' :columns="columnsClient" :data-source="topClients" :scroll='{ x: 400 }'></a-table>
            </a-card>
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
      </div>
    </a-card>
    <a-card v-else>
      <div style='display: flex'><a-skeleton v-for='n in 5' :key='n' active style='width: 200px; margin: 10px 15px'/></div>
      <a-skeleton v-for='n in 3' :key='n' active style='margin: 5px 10px'/>
    </a-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import bar from '@/components/charts/barChart'
import LineChart from '@/components/charts/lineChart'
import moment from 'moment'
export default {
  components: {
    LineChart,
    'bar': bar
  },
  data () {
    return {
      columns: [
        {
          title: this.$t('name'),
          dataIndex: 'name'
        },
        {
          title: this.$t('sold'),
          dataIndex: 'sold'
        },
        {
          title: this.$t('amount'),
          dataIndex: 'total_amount'
        }
      ],
      columnsClient: [
        {
          title: this.$t('name'),
          dataIndex: 'name'
        },
        {
          title: this.$t('phone'),
          dataIndex: 'phone'
        },
        {
          title: this.$t('email'),
          dataIndex: 'email'
        },
        {
          title: this.$t('buy.products'),
          dataIndex: 'product_qty',
          align: 'center'
        },
        {
          title: this.$t('price'),
          dataIndex: 'product_price'
        }
      ],
      columnsPages: [
        {
          title: this.$t('name'),
          dataIndex: 'title'
        },
        {
          title: this.$t('amount'),
          dataIndex: 'count'
        },
      ],
      charts: null,
      topData: [],
      topProducts: [],
      topClients: [],
      topPages: [],
      rangePicker: null,
      date: {
        from: '',
        to: ''
      }
    }
  },
   methods: {
    moment,
    ...mapActions(['getDashboardTopData', 'getDashboardTopProducts', 'getDashboardTopClients', 'getDashboardTopPages', 'getDashboardAllCharts']),
     onChangeDateFilter (e) {
      this.date.from = e[1]
      this.date.to = e[2]
       this.rangePicker = e
       this.topPages = []
       this.topClients = []
       this.charts = null
       this.getData()
     },
     getData () {
       this.getDashboardTopData(this.date).then(res => { this.topData = res })
       this.getDashboardTopProducts(this.date).then(res => { this.topProducts = res })
       this.getDashboardTopClients(this.date).then(res => { this.topClients = res })
       this.getDashboardTopPages(this.date).then(res => { this.topPages = res })
       this.getDashboardAllCharts(this.date).then(res => { this.charts = res })
     }
   },
   mounted() {
     this.getData()
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
  border-radius: 2px;
  box-shadow: rgba(40, 39, 39, 0.2) 0px 2px 8px 0px;
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
