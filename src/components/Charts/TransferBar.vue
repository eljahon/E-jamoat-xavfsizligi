<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <v-chart
      height="254"
      :data="data"
      :scale="scale"
      :forceFit="true"
      :padding="['auto', 'auto', '40', '50']">
      <v-tooltip />
      <v-axis />
      <v-bar position="x*y"/>
    </v-chart>
  </div>
</template>

<script>
const tooltip = [
  'x*y',
  (x, y) => ({
    name: x,
    value: y
  })
]
const scale = [{
  dataKey: 'x',
  title: 'Lorem(Lorem)',
  alias: 'Lorem(Lorem)',
  min: 2
}, {
  dataKey: 'y',
  title: 'Lorem(Gb)',
  alias: 'Lorem(Gb)',
  min: 1
}]

export default {
  name: 'Bar',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      data: [],
      scale,
      tooltip
    }
  },
  created () {
    this.getMonthBar()
  },
  methods: {
    getMonthBar () {
      this.$http.get('/analysis/month-bar')
        .then(res => {
          this.data = res.result
        })
    }
  }
}
</script>
