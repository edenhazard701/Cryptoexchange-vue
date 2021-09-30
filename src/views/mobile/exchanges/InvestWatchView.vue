<template>
	<el-container class="info-view-container">
		<el-row class="info-view-type">
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f031')}}<!-- 감시 # --></strong>
				<div class="view-info-txt">{{rowData.sq}}</div>
			</el-row>
			<el-row class="info-view-lst">
				<strong class="view-type-tit">{{$t('m_invest.f033')}}<!-- 일시 --></strong>
				<div class="view-info-txt bold-color">
					D-{{rowData.end_dt | Dday}}<br/>{{rowData.cndt_est_dy_tm | dateFormat}} ~ {{rowData.end_dt | dateFormat}}
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
				<div class="view-info-txt red">{{$t('m_invest.f001')}}<!-- 감시중 -->
					<!-- 빨간색 : red / 파란색 : blue / 컬러없을경우 추가 class 안붙힘 -->
				</div>
			</el-row>
		</el-row>
		<el-row class="info-view-btn">
			<el-col :span="12">
				<el-button type="primary" @click="$router.go(-1)" class="btn_cancel_type">{{$t('m_invest.f005')}}<!-- 닫기 --></el-button>
			</el-col>
			<el-col :span="12">
				<el-button type="primary" @click="watchCancelOpenPop" class="btn_blue_type">{{$t('m_invest.f006')}}<!-- 감시취소 --></el-button>
			</el-col>
		</el-row>
		<!-- dialog 감시조건 취소 // -->
		<el-dialog :title="$t('m_invest.f004-0')" :visible.sync="watchCancelDialogVisible" :close-on-click-modal="false" width="20%" center><!-- 감시조건 취소 -->
			<el-row class="notice-dialog-contents-wrapper">
				<el-row class="notice-dialog-contents">
					{{$t('m_invest.f004-1')}}<!-- 선택한 조건을 취소하려면 [감시취소] <br />버튼을 눌러주세요. -->
				</el-row>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button type="info" @click="watchCancelDialogVisible = false">{{$t('m_invest.f005')}}<!-- 닫기 --></el-button>
				<el-button type="primary" @click="watchCancelMessage">{{$t('m_invest.f006')}}<!-- 감시취소 --></el-button>
			</div>
		</el-dialog>
		<!-- // dialog 감시조건 취소 -->
	</el-container>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import fromExponential from 'from-exponential';

export default {
	data() {
		return {
			watchCancelDialogVisible: false,
			reqWatchCancelObj: {     /****** 감시취소요청 ******/
				est_dt: '',             // 설정일자
				symbol: '',             // 단축코드
				sq: '',                 // 조건일련번호
				mbr_ccd: '01',          // 사용자구분
				md_cd: '',              // 매체구분
				trd_ccd: ''             // 1.매수 2.매도
			},
		}
	},
    methods : {
		handleClick() {

		},
		watchCancelOpenPop() {
			this.watchCancelDialogVisible = true
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
		watchCancelMessage(){
            let self = this

            this.reqWatchCancelObj['est_dt']        = this.rowData.est_dt;
            this.reqWatchCancelObj['symbol_tmp']    = this.rowData.symbol;
            this.reqWatchCancelObj['sq']            = this.rowData.sq;
            this.reqWatchCancelObj['trd_ccd']       = this.rowData.trd_ccd;
            
            this.$store.dispatch('reqWatchCancel', self.reqWatchCancelObj).then((obj) => {
                self.alertMsg(self.$t('m_invest.f007'),  (obj) => { self.$router.go(-1) }, true)
            }).catch((obj) => {
                var msgText = ""
                if (obj['errCode'] == '90148' || obj['errCode'] == '90068') {
                    msgText = self.$t('m_invest.f009') // '감시가 완료되었거나 이미 취소된 주문입니다.'
                } else {
                    msgText = self.$t('m_invest.f009') // '취소중 오류가 발생했습니다.'
                }
                self.alertMsg(msgText, null, false)
            });

			this.watchCancelDialogVisible = false;
		},
		alertMsg(text, callback, useHTML) {
			let self = this
            if (!useHTML) useHTML = false
            
            if (typeof callback != 'function' || !callback) {
                callback = (action) => {}
            }

            this.$alert(text, {
                confirmButtonText: self.$t('sys_err.a001'),
                dangerouslyUseHTMLString: useHTML,
                callback: callback
            });
        },
	},
	created() {
		this.$EventBus.$emit('mobile-nav-title', this.$t('m_invest.f030'));
        this.$EventBus.$emit('mobile-nav-menus', ['close', 'noDefault', 'border']);
		//this.selectedTactic = this.tactic;
	},
	computed :{
		...mapGetters(['hogaUnit', 'getCoinByCd']),
		rowData() {
			return this.$route.params.row
		}
	},
	filters: {
        Dday(end_dt) {
			end_dt = end_dt.replace(/\./g,"/")
            const today = new Date();
            const endDay = new Date(end_dt);            
            
            return Math.floor( (endDay.getTime() - today.getTime()) / (1000*60*60*24) ) + 1;
		},
		dateFormat(val) {
			if (!val) return '';
			val = val.replace(/\./g,'')
			val = val.replace(/\:/g,'')
			val = val.replace(/ /g,'')

			return moment(val.substr(0,8) + "T" + val.substr(8,6)).format("YY-MM-DD HH:mm:ss");
		}
    }
};

</script>

