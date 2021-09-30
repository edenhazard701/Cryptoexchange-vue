<template>
	<el-main class="BankAccount">
		<div class="mypage_cont">
			<h1 class="pageTitle">{{$t('mypage.i001')}}<!--입출금계좌 등록--></h1>
			<el-form ref="form" :model="form" :rules="rule" label-width="0px" class="bank-account-form">
				<el-form-item prop="agreed" class="agreement">
					<el-checkbox v-model="form.agreed" :disabled="checking"><span v-html="$t('mypage.i002')"></span><!--개인정보 수집 및 이용 동의 <span class="caution">(필수)</span>--></el-checkbox>
					<div class="account-terms">
						<ul>
							<li>{{$t('mypage.i003')}}<!--목적 : 원화(KRW) 거래를 위한 본인 확인--></li>
							<li>{{$t('mypage.i004')}}<!-- 항목 : 은행명, 계좌번호--></li>
							<li>{{$t('mypage.i005')}}<!--보유기간 : 법령이 정한 기간--></li>
						</ul>
					</div>
				</el-form-item>
				<span class="mypage-info">{{$t('mypage.i006')}}<!--본인 명의로 계좌확인을 완료한 후 [입출금계좌 등록] 버튼을 누르세요.--></span>
				<el-form-item prop="bank">
					<el-select v-model="form.bank" :placeholder="$t('mypage.i007')" :disabled="checking">
						<el-option label="KB국민은행" value="004">국민은행</el-option>
						<el-option label="신한은행" value="088">신한은행</el-option>
						<el-option label="KEB하나은행" value="081">KEB하나은행</el-option>
						<el-option label="우리은행" value="020">우리은행</el-option>
						<el-option label="기업은행" value="003">기업은행</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="accountNumber" class="bankaccount-account">
					<el-row>
						<el-col class="input"><el-input type="text" maxlength="20"  @keyup.native="onlyNumber" :placeholder="$t('mypage.i008')" auto-complete="off" v-model="form.accountNumber" :disabled="checking"></el-input></el-col>
						<el-col class="btn"><el-button type="info" :loading="verifying"  @click.native.prevent="checkClicked" :class="{'disabled':checking}" :disabled="checking">{{$t('mypage.i009')}}<!--계좌확인--></el-button></el-col>
					</el-row>
				</el-form-item>
				<el-form-item class="bankaccount-btn">
					<el-button type="primary" @click.native.prevent="registerClicked" :class="{'disabled':disabled}" :disabled="disabled">{{$t('mypage.i010')}}<!--입출금계좌 등록--></el-button>
				</el-form-item>
			</el-form>
		</div>
	</el-main>
</template>

<script>
export default {
	components: {
        
	},
	data () {
		return {
			user_nm : null,            //유저이름
            checking: false,           //계좌인증후 disabled 여부 
			disabled: true,            //입출금 계좌등록 disabled 여부
			verifying : false,         //실명인증 계좌 확인 로딩중 ...
            form: {
				agreed: false,         //동의 체크 여부 
                bank: '',              //은행 선택
				accountNumber: ''      //계좌번호 
            },
            rule: {
				agreed: [
					{ type: 'enum', enum: ['true'], required: true, message: this.$t('mypage.i011'), transform: value => value.toString(), trigger: 'change' }
				],
                bank: [
                    { required: true, message: this.$t('mypage.i007-1'), trigger: 'change' }
                ],
				accountNumber: [
					{ required: true, message: this.$t('mypage.i008-1'), trigger: 'blur' }
				]
            }
		};
	},
	methods : {
		checkClicked() {
		//계좌확인 클릭
			var self = this;
			self.verifying = true;
			self.$refs['form'].validate((valid) => {
				if(!valid) {                     //동의 체크 , 은행, 계좌번호 validation 확인
					if(!self.form.agreed) {                        
						self.$alert(this.$t('mypage.i011'), '', {
							confirmButtonText: this.$t('mypage.i019')
						});
					}else if(self.form.bank == '') {
						self.$alert(this.$t('mypage.i007-1'), '', {
							confirmButtonText: this.$t('mypage.i019')
						});
					}else if(self.form.accountNumber == '') {
						self.$alert(this.$t('mypage.i008-1'), '', {
							confirmButtonText: this.$t('mypage.i019')
						});
					}
					self.verifying = false;
				}else {
					//유저정보 : 이름
					self.$store.dispatch('myInfo',{user_id:self.$store.getters.getUserId}).then((data) => {
						self.user_nm = self.$store.state.user.mypage.user_nm;
						self.exchangeAccountNumber();  //계좌확인
					})

				}
			})
		},
		
		exchangeAccountNumber(){
		//계좌확인 (exchange 업체 : 이성주 차장님(010-3124-5081)  )
			var self = this;
			var params = {
				cid : 'CID0001',               //코백스 전용 cid
				bankcd : self.form.bank,
				acctno : self.form.accountNumber,
				acctnm : self.user_nm		  					
			};

			console.log(params);

			var url = process.env.EXCN_URL;
			
			self.$http.post(url,$.param(params)).then(response => { //post 전송시 직렬화 시켜준다. 
        		if(response.ok) {
					var resValue = response.body;
					if(resValue.rcode != '00000000') {
						self.$alert(resValue.rmsg, '', {
							confirmButtonText: this.$t('mypage.i019')
						});
						//초기화
						self.initData();
					}else{
						self.$alert(this.$t('mypage.i013'), '', {
							confirmButtonText: this.$t('mypage.i019')
						});
						self.checking = true;
						self.disabled = false;
					}
        		}else{
					self.$alert('Error 관리자에 문의 바랍니다.', '', {
						confirmButtonText: this.$t('mypage.i019')
					});
					//초기화
					self.initData();
				}
			self.verifying = false;	
			}).catch((errorData) => {
				console.log('에러',errorData)
				self.$alert('알수없는 오류', '', {
					confirmButtonText: this.$t('mypage.i019')
				});
				self.verifying = false;
				self.initData();	
			});
		}, 
        registerClicked() {
		//입출금 계좌 등록
			var self = this;
			self.$socket.sendProcessByName('ac119', (queryData) => {
				var block = queryData.getBlockData('InBlock1')[0];
				block['user_id'] = self.$store.getters.getUserId;
				block['bank_cd'] = self.form.bank;
				block['acct_no'] = self.form.accountNumber;
				
			}, (returnData) => {
				if( returnData ) {
					self.$alert(this.$t('mypage.i014'), '', {
						confirmButtonText: this.$t('mypage.i019'),
						callback: action => {
							self.$router.go(-1);
						}
					});
				} else {
					// 전문 에러 언어팩 적용
					const errorData = JSON.parse( window.sessionStorage.getItem('lastErrorData') );
					if (errorData.trName != "ac119") return

					self.$alert(self.$t('sys_err.' + errorData.errCode), '', {
						dangerouslyUseHTMLString: true,
						confirmButtonText: self.$t('sys_err.a001')
					});
					return;
				}
			})
		},
		onlyNumber() {
		//숫자만 입력
			this.form.accountNumber = this.form.accountNumber.replace(/[^0-9]/g,'');
		},
		initData() {
		//데이터 초기화
			var self = this;
			self.form.bank = '';
			self.form.accountNumber = '';
		}
			
	},
	created() {
		this.$EventBus.$emit('pc-navi', [
			{ label: this.$t('header.me'), target: 'mypageInfo' },
            { label: this.$t('mypage.a002'), target: 'mysecurity' },
            { label: this.$t('mypage.e025'), target: null }
		]);
	}

};

</script>