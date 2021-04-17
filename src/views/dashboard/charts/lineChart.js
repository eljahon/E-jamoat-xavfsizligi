import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: ['data', 'labels', 'title', 'headTitle'],
  mounted () {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: this.headTitle,
            data: this.data,
            backgroundColor: 'rgb(0, 102, 255, .2)',
            borderColor: 'rgb(0, 102, 255, .6)',
            pointBackgroundColor: 'rgb(0, 102, 255, .8)'
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
