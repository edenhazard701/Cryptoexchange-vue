<template>
	<el-container class="info-view-container">
		<el-row class="info-view-type">
			<!-- 하단 버튼 없는 경우 view-btn-type -->
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f031')}}<!-- 감시 # --></strong>
				<div class="view-info-txt">{{rowData.sq}}</div>
			</el-row>
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f032')}}<!-- 주문 # --></strong>
				<div v-if="rowData.ordr_no == '' || rowData.ordr_no == 0" class="view-info-txt"> - </div>
				<div v-else class="view-info-txt">{{rowData.ordr_no}}</div>
			</el-row>
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f033')}}<!-- 일시 --></strong> 
				<div class="view-info-txt bold-color">
					{{rowData.st_upt_dy_tm.replace(/\./g,"-")}}
				</div>
			</el-row>
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f034')}}<!-- 종목 --></strong>
				<div class="view-info-txt">{{rowData.symbol_abbr}}</div>
			</el-row>
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f035')}}<!-- 방식 --></strong>
				<div v-if="rowData.md_cd == '1'" class="view-info-txt">{{$t('m_invest.f055')}}<!-- 스탑 시장가 --></div>
				<div v-else-if="rowData.md_cd == '2'" class="view-info-txt">{{$t('m_invest.f056')}}<!-- 스탑 지정가 --></div>
				<div v-else-if="rowData.md_cd == '3'" class="view-info-txt">{{$t('m_invest.f057')}}<!-- 트레일링 스탑 --></div>
			</el-row>
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f036')}}<!-- 조건 --></strong>
				<div v-if ="rowData.md_cd == '1' || rowData.md_cd == '2'" class="view-info-txt">
					{{$t('m_invest.f058')}}<!-- 스탑가격 --> {{priceFormat(rowData.paycurrcode, rowData.stop_prc)}}
					<span class="gray_txt">{{rowData.paycurrcode}}</span>
				</div>
				<div v-else-if ="rowData.md_cd == '3' && rowData.trd_ccd == '2'" class="view-info-txt">
					{{$t('m_invest.f059')}}<!-- 최저가대비상승폭 --> {{priceFormat(rowData.paycurrcode, rowData.distance)}}
					<span class="gray_txt">{{rowData.paycurrcode}}</span>
				</div>
				<div v-else-if ="rowData.md_cd == '3' && rowData.trd_ccd == '1'" class="view-info-txt">
					{{$t('m_invest.f060')}}<!-- 최고가대비하락폭 --> {{priceFormat(rowData.paycurrcode, rowData.distance)}}
					<span class="gray_txt">{{rowData.paycurrcode}}</span>
				</div>
			</el-row>
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f037')}}<!-- 구분 --></strong>
				<div v-if="rowData.trd_ccd == '2'" class="view-info-txt red">
					{{$t('m_invest.d017')}}<!-- 매수 -->
				</div>
				<div v-else class="view-info-txt blue">
					{{$t('m_invest.d018')}}<!-- 매도 -->
				</div>
			</el-row>
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f038')}}<!-- 주문금액 --></strong>
				<div v-if="rowData.ordr_amt > 0" class="view-info-txt">
					{{priceFormat(rowData.paycurrcode, rowData.ordr_amt)}}
					<span class="gray_txt">{{rowData.paycurrcode}}</span>
				</div>
				<div v-else class="view-info-txt">-</div>
			</el-row>
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f039')}}<!-- 주문가격 --></strong>
				<div v-if="rowData.ordr_typ_cd == '2'" class="view-info-txt">
					{{priceFormat(rowData.paycurrcode, rowData.ordr_prc)}}
					<span class="gray_txt">{{rowData.paycurrcode}}</span>
				</div>
				<div v-else-if="rowData.ordr_typ_cd == '1'" class="view-info-txt">{{$t('m_invest.f061')}}<!-- 시장가 --></div>
			</el-row>
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f040')}}<!-- 주문수량 --></strong>
				<div v-if="rowData.ordr_q > 0" class="view-info-txt">
					{{coinFormat(rowData.tradcurrcode, rowData.ordr_q)}}
					<span class="gray_txt">{{rowData.tradcurrcode}}</span>
				</div>
				<div v-else class="view-info-txt">-</div>
			</el-row>
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f041')}}<!-- 상태 --></strong>
				<div class="view-info-txt">
					{{watchedStatus(rowData.hndl_st_vl, rowData.ordr_hndl_ccd)}}
					<!-- 빨간색 : red / 파란색 : blue / 컬러없을경우 추가 class 안붙힘 -->
				</div>
			</el-row>
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f042')}}<!-- 사유 --></strong>
				<div v-if="rowData.rfsl_msg == ''" class="view-info-txt">
					-
				</div>
				<div v-else class="view-info-txt">
					{{rowData.rfsl_msg}}
				</div>
			</el-row>
		</el-row>
		<div class="info-view-btn">
			<el-button type="primary" @click="$router.go(-1)" class="btn_cancel_type">{{$t('m_invest.f043')}}<!-- 닫기 --></el-button>
		</div>
	</el-container>	
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import fromExponential from 'from-exponential';

export default {
	data() {
		return {
			tmp_order_no : null
		}
	},
    methods : {
		handleClick() {

		},
		priceFormat(cd, prc) {
            let self = this;
            var nLenBelowDigitArray = [1];
            UnitManager.getHogaUnit(self.hogaUnit, cd, prc, undefined, undefined, nLenBelowDigitArray);
            // let formatter = Intl.NumberFormat(self.$i18n.locale, {
            //     minimumFractionDigits: nLenBelowDigitArray[0],
            //     maximumFractionDigits: nLenBelowDigitArray[0]
            // });
			// return formatter.format(prc);
			return UnitManager.fixedDecimalWithCommas(prc, nLenBelowDigitArray[0])
		},
		coinFormat(cd, number) {
            let self = this;
            let dec_digt = self.getCoinByCd(cd).dec_digt
            // let formatter = Intl.NumberFormat(self.$i18n.locale, {
            //     minimumFractionDigits: dec_digt? dec_digt : 8,
            //     maximumFractionDigits: dec_digt? dec_digt : 8
            // });
			// return formatter.format(number);
			return UnitManager.fixedDecimalWithCommas(number, dec_digt? dec_digt : 8)
		},
		watchedStatus(hndl_st_vl, ordr_hndl_ccd) {
            var res = '';

            if (hndl_st_vl === '2') {           // 2:Expired 
                
                res = this.$t('m_invest.f028') //'유효기간만료'
            } else if (hndl_st_vl === '3') {    // 3:Completed 
                
                res = ordr_hndl_ccd === '1' ? this.$t('m_invest.f026') // '주문접수'
                    : ordr_hndl_ccd === '2' ? this.$t('m_invest.f029') // '주문거부'
                    : ordr_hndl_ccd === '3' ? this.$t('m_invest.f026') // '주문접수'
                    : ordr_hndl_ccd === '4' ? this.$t('m_invest.f029') // '주문거부'
                    : ordr_hndl_ccd === '5' ? this.$t('m_invest.f026') // '주문접수'
                    : ordr_hndl_ccd === '6' ? this.$t('m_invest.f029') // '주문거부'
                    : ordr_hndl_ccd === '7' ? this.$t('m_invest.f026') // '주문접수'
                    : ordr_hndl_ccd === '8' ? this.$t('m_invest.f026') // '주문접수' // '취소'
                    : this.$t('m_invest.f026') // '주문접수'
            } else if (hndl_st_vl === '4') {    // 4:Canceled
                
                res = this.$t('m_invest.f027') // '취소';
            }

            return res;
        },
	},
	created() {
		this.$EventBus.$emit('mobile-nav-title', this.$t('m_invest.f030')); // '감시 상세내용'
        this.$EventBus.$emit('mobile-nav-menus', ['noDefault', 'back', 'border']);
		//this.selectedTactic = this.tactic;
	},
	computed :{
		...mapGetters(['hogaUnit', 'getCoinByCd']),
		rowData() {
			return this.$route.params.row
		}
	},
	filters: {
		
	}
};

</script>

