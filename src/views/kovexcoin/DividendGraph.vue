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
                        cornerRadius: 2,
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var label = data.datasets[tooltipItem.datasetIndex].label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += Math.round(tooltipItem.yLabel * 100) / 100 + ' KRW';
                                return label;
                            }
                        }
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontSize: 14,
                                fontColor: '#9e9e9e'
                            },
                            barPercentage: 0.3,
                            gridLines: {
                                display: false,
                                color: '#ccc'
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                display: false,
                                fontSize: 11,
                                callback: function(value, index, values) {
                                    return value + 'KRW';
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
            var chart = document.getElementById("pane-dividend").getElementsByTagName("canvas")[0];
            chart.style.height = '240px';
        },
        watch: {
            data(val, old) {
                this.renderChart(val, this.options);
                // var chart = document.getElementById('bar-chart');
                var chart = document.getElementById("pane-dividend").getElementsByTagName("canvas")[0];
                chart.style.height = '240px';
            }
        }
    }
</script>