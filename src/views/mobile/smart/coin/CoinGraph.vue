<script>
    import { Bar } from 'vue-chartjs';

    export default {
        extends: Bar,
        props: ['data'],
        data() {
            return {
                options: {
                    tooltips: {
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        cornerRadius:2,
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var label = data.datasets[tooltipItem.datasetIndex].label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += Math.round(tooltipItem.yLabel * 100) / 100
                                label += " "+ data.datasets[tooltipItem.datasetIndex]['cur_cd']
                                return label;
                            }
                        }
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontSize: 12,
                                fontColor:'#9e9e9e'
                            },
                            barThickness: 60 ,
                            gridLines: {
                                display: false,
                                color: '#f0f2f7'
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                display: false,
                                fontSize: 11,
                                callback: function(value, index, values) {
                                    return value + 'CTC';
                                },
                                min:0
                            },
                            gridLines: {
                                display: false,
                                lineWidth: 1,
                                borderDash: [1, 3],
                                color: '#fff',
                                zeroLineWidth: 0
                            }
                        }]
                    },
                    legend: {
                        display: false
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        mounted() {
            this.renderChart(this.data, this.options);
            
            /* chart 높이 설정 */
            // var chart = document.getElementById('bar-chart');
            var chart = document.getElementById("pane-mining").getElementsByTagName("canvas")[0];
            var chart2 = document.getElementById("pane-share").getElementsByTagName("canvas")[0];
            chart.style.height = '160px';
            chart2.style.height = '160px';
        },
        watch: {
            data(val, old) {
                this.renderChart(val, this.options);
                // var chart = document.getElementById('bar-chart');
                var chart = document.getElementById("pane-mining").getElementsByTagName("canvas")[0];
                var chart2 = document.getElementById("pane-share").getElementsByTagName("canvas")[0];
                chart.style.height = '160px';
                chart2.style.height = '160px';
            }
        }
    }
</script>