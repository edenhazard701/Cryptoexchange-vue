<template>
	<el-main class="bank-account-main">
        <el-form ref="form" :model="form" :rules="rule" label-width="0px" class="bank-account-form">
			<el-form-item prop="agreed" class="agreement">
				<div class="check_area">
					<el-checkbox v-model="form.agreed" :disabled="checking">{{$t('m_mypage.g001_01')}} <span class="essential">{{$t('m_mypage.g001_02')}}</span></el-checkbox>
				</div>
				<div class="terms">
					<ul class="list">
						<li class="dot">{{$t('m_mypage.g002')}}</li>
						<li class="dot">{{$t('m_mypage.g003')}}</li>
						<li class="dot">{{$t('m_mypage.g004')}}</li>
					</ul>
				</div>
			</el-form-item>
			<el-form-item prop="bank" class="bank">
				<p class="bank_top_txt" v-html="$t('m_mypage.g005')"></p>
				<el-select v-model="form.bank"  :placeholder="$t('m_mypage.g006')" :disabled="checking" class="sel_m" popper-class="m_style">
						<el-option label="KB국민은행" value="004">국민은행</el-option>
						<el-option label="신한은행" value="088">신한은행</el-option>
						<el-option label="KEB하나은행" value="081">KEB하나은행</el-option>
						<el-option label="우리은행" value="020">우리은행</el-option>
						<el-option label="기업은행" value="003">기업은행</el-option>
				</el-select>
			</el-form-item>
            <el-form-item prop="accountNumber" class="account_number">
                <el-input type="number" pattern="\d*" 
				maxlength="20" max="99999999999999999999"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
				class="inp_m" :placeholder="$t('m_mypage.g007')" auto-complete="off" v-model="form.accountNumber">
					<el-button class="btn_m_sy01" @click.native.prevent="checkClicked" :class="{'disabled':checking}" :disabled="checking" :loading="verifying"  slot="append">{{$t('m_mypage.g008')}}</el-button>
				</el-input>
            </el-form-item>
            <el-form-item class="btm_fix_btn">
                <el-button class="b_success_btn" @click.native.prevent="registerClicked" :loading="registering" :disabled="disabled">{{$t('m_mypage.g009')}}</el-button>
            </el-form-item>
        </el-form>
	</el-main>
</template>

<script>
export default {
	components: {
        
	},
	data () {
		return {
			navTitle: '입출금 계좌 등록',
			user_nm : null,
            checking: false,
			registering: false,
			disabled: true,
			verifying : false,
            form: {
				agreed: false,
                bank: '',
				accountNumber: ''
            },
            rule: {
				agreed: [
					{ type: 'enum', enum: ['true'], required: true, message: this.$t('m_mypage.k034'), transform: value => value.toString(), trigger: 'change' }
				],
                bank: [
                    { required: true, message: this.$t('m_mypage.k050'), trigger: 'change' }
                ],
				accountNumber: [
					{ required: true, message: this.$t('m_mypage.k051'), trigger: 'blur' }
				]
            }
		};
	},
	methods : {
		checkClicked() {
			var self = this;
			self.verifying = true;
			self.$refs['form'].validate((valid) => {
				if(!valid) {
					if(!self.form.agreed) {
						self.$alert(self.$t('m_mypage.k034'), '', {
							confirmButtonText: self.$t('m_mypage.i021')
						});
					}else if(self.form.bank == '') {
						self.$alert(self.$t('m_mypage.k050'), '', {
							confirmButtonText: self.$t('m_mypage.i021')
						});
					}else if(self.form.accountNumber == '') {
						self.$alert(self.$t('m_mypage.k051'), '', {
							confirmButtonText: self.$t('m_mypage.i021')
						});
					}
					self.verifying = false;
				}else {
					self.$store.dispatch('myInfo',{user_id:self.$store.getters.getUserId}).then((data) => {
						self.user_nm = self.$store.state.user.mypage.user_nm;
						self.exchangeAccountNumber();
					})

				}
			})
        },
		exchangeAccountNumber(){
			var self = this;
			var params = {
				cid : 'CID0001',
				bankcd : self.form.bank,
				acctno : self.form.accountNumber,
				acctnm : self.user_nm		  					
			};
			
			var url = process.env.EXCN_URL;

			self.$http.post(url,$.param(params)).then(response => { //post 전송시 직렬화 시켜준다. 
        		if(response.ok){
					var resValue = response.body;
					if(resValue.rcode != '00000000') {
						self.$alert(resValue.rmsg, '', {
							confirmButtonText: self.$t('m_mypage.i021')
						});
						//초기화
						self.initData();
					}else{
						self.$alert(self.$t('m_mypage.k036'), '', {
							confirmButtonText: self.$t('m_mypage.i021')
						});
						self.checking = true;
						self.disabled = false;
					}
        		}else{
					self.$alert('Error 관리자에 문의 바랍니다.', '', {
						confirmButtonText: self.$t('m_mypage.i021')
					});
					//초기화
					self.initData();
				}
			self.verifying = false;	
			}).catch((errorData) => {
				self.$alert('알수없는 오류', '', {
					confirmButtonText: self.$t('m_mypage.i021')
				});
				self.verifying = false;
				self.initData();	
			});
		}, 
        registerClicked() {
			var self = this;
			self.$socket.sendProcessByName('ac119', (queryData) => {
				var block = queryData.getBlockData('InBlock1')[0];
				block['user_id'] = self.$store.getters.getUserId;
				block['bank_cd'] = self.form.bank;
				block['acct_no'] = self.form.accountNumber;
				
			}, (returnData) => {
				if( returnData ) {
					self.$alert(self.$t('m_mypage.k037'), '', {
						confirmButtonText: self.$t('m_mypage.i021'),
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
		initData() {
			var self = this;
			self.form.bank = '';
			self.form.accountNumber = '';
		}
	},
    created() {
		this.$EventBus.$emit('mobile-nav-title', this.$t('m_mypage.g009'));
		this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
	},
	mounted() {
		var self = this;		
	}
};

</script>