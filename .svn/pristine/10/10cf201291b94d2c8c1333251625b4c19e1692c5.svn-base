<template>
	<el-row class="NotiSettingList">
		<div class="search">
			<el-input placeholder="암호화폐 검색" v-model="searchData" clearable>
				<i class="el-icon-search el-input__icon" slot="suffix"></i>
			</el-input>
		</div>
		<div class="filter">
			<el-button v-model="checked" @click="showFavorite"><i v-bind:class="[checked ? 'el-icon-star-on favorite-on' : 'el-icon-star-off']" size="small"></i></el-button>
			<el-button @click="showExchange('KRW')">KRW</el-button>
			<el-button @click="showExchange('BTC')">BTC</el-button>
            <el-button @click="showExchange('ETH')">ETH</el-button>
		</div>
		<el-table :data="tableData" height="400" style="width: 100%" @row-click="selectItem">
			<el-table-column prop="favorite" label="" width="60" header-align="center" align="center">
				<template slot-scope="scope">
					<el-button v-bind:class="[scope.row.favorite ? 'el-icon-star-on favorite-on' : 'el-icon-star-off']" type="text"></el-button>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="종목명" width="160" header-align="center" align="center"><!-- 종목명 -->
				<template slot-scope="scope">
					{{ scope.row.name }} <br> 
					<span>{{ scope.row.code }}</span>
				</template>
			</el-table-column>
			<el-table-column sortable prop="presentValue" label="현재가(24H)" header-align="center" align="right"><!-- 현재가(24H) -->
				<template slot-scope="scope">
					<div v-html="priceStrSetting(scope.row.presentValue)"></div>
					<span v-bind:class="[ scope.row.presentValueFluctuation ? 'fluctuation-up' : 'fluctuation-down' ]">{{ scope.row.presentValueFluctuationPoint }}</span>
				</template>
			</el-table-column>
			<el-table-column sortable prop="transactionAmount" label="거래금액" header-align="center" align="right"><!-- 거래금액 -->
				<template slot-scope="scope">
					<div v-html="strMillionSetting(scope.row.transactionAmount)"></div>
				</template>
			</el-table-column>
		</el-table>
	</el-row>
</template>

<script>

export default {
	props: ['selectedRowData'],
	data () {
		return {
			searchData: '',				// 검색 데이터
			checked: false,				// 관심 코인 체크
			tableData: [				// 테이블 데이터
				{
					id: '0',
					name: '0비트코인',
					code: '0BTC/KRW',
					presentValue: '7397000',
					presentValueFluctuation: true,
					presentValueFluctuationPoint: '+0.26%',
					transactionAmount: '12000000000',
					// transactionAmount: 123456,
					favorite: true
				},
				{
					id: '1',
					name: '1이더리움',
					code: '1ETH/KRW',
					presentValue: '98765350000',
					presentValueFluctuation: false,
					presentValueFluctuationPoint: '-1.28%',
					transactionAmount: '210000000000',
					// transactionAmount: 2123456,
					favorite: false
				},
				{
					id: '2',
					name: '2리플',
					code: '2XRP/KRW',
					presentValue: '358',
					presentValueFluctuation: false,
					presentValueFluctuationPoint: '-5.12%',
					transactionAmount: '8000000000',
					// transactionAmount: 5500,
					favorite: true
				},
				{
					id: '3',
					name: '3이오스',
					code: '3EOS/KRW',
					presentValue: '6235',
					presentValueFluctuation: true,
					presentValueFluctuationPoint: '+0.48%',
					transactionAmount: '4169000000',
					// transactionAmount: 238888888,
					favorite: true
				}
			],
		};
	},
	methods : {
		selectItem(row, event, column){
            if(column.label == '') {
				this.setNotification(row);
			} else {
				this.$emit('sendItemId', row.id);
			}
		},
		setNotification(row) {
			row.favorite = !row.favorite;
		},
        showFavorite() {
			this.checked = !this.checked;
        },
        showExchange(exchange) {
			alert(exchange);
		},
		/* 숫자 comma 넣기 */
		priceStrSetting(price) {
			var parts = price.toString().split(".");
			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		},
		/* 백만 단위 넣기 */
		strMillionSetting(price) {
			var priceLength = price.length;
			if (priceLength > 6) {
				var cal_price = Math.round(Number(price) / 1000000);
				return price = this.priceStrSetting(cal_price) + '<span class="unit-million">백만</span>';
			} else {
				return price = this.priceStrSetting(price);
			}
		}
	},
	computed :{
		
	}
};

</script>