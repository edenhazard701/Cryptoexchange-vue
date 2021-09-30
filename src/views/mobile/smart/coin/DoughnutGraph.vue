<script>
    import { Doughnut } from 'vue-chartjs';

    export default {
        extends: Doughnut,
        props: ['data'],
        data() {
            return {
                options: {
                    legend: {
                        display:true
                    },
                    tooltips: {
                        cornerRadius:2
                    },
                    responsive:true,
                    maintainAspectRatio:false,
                    cutoutPercentage:'60'
                }
            }
        },
        mounted() {
            this.renderChart(this.data, this.options);
            
            /* chart 높이 설정 */
            var chart = document.getElementsByClassName("SmartCoinIntro")[0].getElementsByTagName("canvas")[0];
            chart.style.height = '250px';
        },
        watch: {
            data(val, old) {
                this.renderChart(val, this.options);
                var chart = document.getElementsByClassName("SmartCoinIntro")[0].getElementsByTagName("canvas")[0];
                chart.style.height = '250px';
            }
        }
    }
</script>