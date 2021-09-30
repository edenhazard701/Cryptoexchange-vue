<script>
import { Bar } from "vue-chartjs";
import MobileDetect from "mobile-detect";
import ChartRounded from "../../../static/Library/Chart.roundedBarCharts.min.js";

export default {
  extends: Bar,
  props: ["chartData"],
  data() {
    return {
      isPC: true,
      options: {
        cornerRadius: 30,
        tooltips: {
          backgroundColor: "rgba(0,0,0,0.6)",
          callbacks: {
            label: function(tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              label += Math.round(tooltipItem.yLabel * 100) / 100 + "%";
              return label;
            }
          }
        },
        elements: {
          line: {
            tension: 0,
            borderWidth: 1,
            backgroundColor: "transparent",
            borderColor: "#4fd165"
          },
          point: {
            radius: 4,
            borderWidth: 2,
            backgroundColor: "#fff",
            borderColor: "#4fd165"
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: 12
              },
              // barPercentage: 0.15,
              // categoryPercentage: 0.5,
              barThickness: 10,
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontSize: 11,
                callback: function(value, index, values) {
                  return value + "%";
                }
              },
              gridLines: {
                display: true,
                lineWidth: 1,
                // borderDash: [1, 3],
                color: "#f0f2f7",
                zeroLineWidth: 0.5
              }
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    let self = this;
    self.renderChart(this.chartData, this.options);

    var md = new MobileDetect(window.navigator.userAgent);
    if (md.phone()) {
      self.isPC = false;
    } else {
      self.isPC = true;
    }

    /* chart 높이 설정 */
    var chart = document.getElementById("bar-chart");
    if (self.isPC === true) {
      chart.style.height = "400px";
    } else {
      chart.style.height = "300px";
    }
  },
  watch: {
    /**
     * 차트데이터 변경 감시
     */
    chartData(val, old) {
      this.renderChart(val, this.options);
      var chart = document.getElementById("bar-chart");
      if (this.isPC === true) {
        chart.style.height = "400px";
      } else {
        chart.style.height = "300px";
      }
    }
  }
};
</script>