<script>
    import { Pie } from 'vue-chartjs';

    export default {
        extends: Pie,
        props: ['data'],
        data() {
            return {
                options: {
                    legend: {
                        display: true
                    },
                    tooltips: {
                        cornerRadius: 2
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        },
        mounted() {
            this.renderChart(this.data, this.options);
		},
		watch : {
			data(val, old) {
                this.renderChart(val, this.options);
                // var chart = document.getElementById('bar-chart');
                // var chart = document.getElementById("pane-mining").getElementsByTagName("canvas")[0];
                // chart.style.height = '400px';
            }
		}
    }
</script>