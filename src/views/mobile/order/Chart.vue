<template>
    <div>
        <stock-graph></stock-graph>
    </div>
</template>

<script>
import StockGraph from './StockGraph.vue';

export default {
    components: {
        StockGraph
    },
    data () {
        return {
            navTitle : '제목!!!!'
        };
    },
    created() {
       // this.$EventBus.$emit('mobile-nav-title', this.navTitle);
    }
};

</script>