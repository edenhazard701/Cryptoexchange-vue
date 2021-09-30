<template>
    <el-main class="EtcVue AccountFind">
        <div class="mypage_cont input-form">
            <h3 class="title">{{$t('login.h001')}}<!--아이디 찾기--></h3>
            <el-form ref="form" :model="form" :rules="rule" label-width="0px" class="account-find-form">
                <h5>{{$t('login.h002')}}<!--아이디를 찾으시려면 휴대폰본인확인이 필요합니다.--></h5>
                <div class="item-inner">
                    <el-button size="small" @click="onSubmit">{{$t('login.h003')}}<!--휴대폰본인확인--></el-button>
                </div>
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
            form:{
                auth_di:''  // 휴대폰 본인확인 고유번호
            }
		};
	},
	methods : {
		onSubmit() {    // 휴대폰 본인확인 진행

            let self=this

            self.$refs['form'].validate((valid) => {
                if (valid) {
                    
                    var myWindow = window.open(process.env.CRET_URL,'pccPopup', "width=400,height=615");
                    // self.$router.push({name: 'mobileVerification' ,query:{ plan:'accountFind' }});
                } else {
                    self.disabled = true
                }
            })
        },
        pccCallback(e) {    // 휴대폰 본인확인 완료 처리
            let self = this;
            let user = self.$store.state.user
            console.log('pccCallback', e.detail);

			const form = {
				//auth_ci			: self.randomText(88), // 임시
				auth_di			: e.detail.di, //self.randomText(64),
				//mobl_corp 		: e.detail.cellCorp, // 통신사
				//user_gend		    : e.detail.sex, // 성별
				//user_forn_tp 	    : e.detail.fgnGbn, // 외국인구분
				//auth_mobl_no 	    : e.detail.cellNo, //user.mobileVertification.auth_mobl_no
				//user_nm 	 	    : e.detail.name, // user.mobileVertification.user_nm
				//user_brth_day	    : e.detail.birYMD, // user.mobileVertification.user_brth_day
			}
            
			self.$store.commit('setAccountFind',{auth_di : form.auth_di})   // 휴대폰 본인확인 고유번호 저장
            self.$store.dispatch('accountFind', {}).then((data) => {    // 아이디 찾기
                // alert("가입하신 ID는 '" + data.user_mail + "' 입니다.");
                self.$alert(self.$t('login.h004') + " : " + data.user_mail, '', {
                    confirmButtonText: self.$t('login.h005'),
                    callback: action => {
                        self.$router.push({name: 'login'});
                    }
                });
            });
        }
    },
    created() {
        this.$EventBus.$emit('pc-navi', '');
    },
    mounted(){
		window.addEventListener('pccCallback', this.pccCallback);
    },
    destroyed(){
		window.removeEventListener('pccCallback', this.pccCallback);
	}
};

</script>
