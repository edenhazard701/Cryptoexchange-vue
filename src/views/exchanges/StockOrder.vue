<template>
    <el-tabs stretch type="card" class="StockOrder">
        <el-tab-pane :label="$t('exchange.e001')" class="tab-item order-tab" ><!-- 매수 -->
            <stock-buy></stock-buy>
        </el-tab-pane>
        <el-tab-pane :label="$t('exchange.e002')" class="sell-tab"><!-- 매도 -->
            <stock-sell></stock-sell>
        </el-tab-pane >
    </el-tabs>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import {_} from 'vue-underscore';
import StockBuy from './StockBuy.vue';
import StockSell from './StockSell.vue';

export default {
    components: {
        StockBuy,
        StockSell
    },
    data() {
        return {
            name: 'StockOrder'
        };
    },
    methods: {
        onRB03Notification() {
            this.getOrderAble();
        },
        socketConnectedCallback(){
            if (this.getUserId) {
                this.$socket.registerReal("RB03", "key_user_id", [this.getUserId], this.name, this.onRB03Notification);
            }
        },
        ...mapActions(['getOrderAble'])
    },
    computed: {
      ...mapGetters(['getUserId'])
    },
    mounted() {
        if (this.$store.getters.isSocketConnected && this.getUserId) {
            this.$socket.registerReal("RB03", "key_user_id", [this.getUserId], this.name, this.onRB03Notification);
        }

        this.$EventBus.$on('socketConnected', this.socketConnectedCallback);
        
    },
    beforeDestroy() {
        if (this.getUserId) {
            this.$socket.unregisterReal("RB03", [this.getUserId], this.name);
        }

        this.$EventBus.$off('socketConnected', this.socketConnectedCallback);
    }
};
</script>