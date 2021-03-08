import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  props: ['data', 'labels', 'title', 'headTitle'],
  mounted () {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: this.headTitle,
            data: this.data,
            backgroundColor: 'rgb(0, 102, 255, .5)'
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false
      }
    )
  }
}
