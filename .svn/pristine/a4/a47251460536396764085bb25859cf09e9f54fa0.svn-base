<template>
    <el-main class="account-find-main">
        <div class="member_form">
            <p class="member_form_txt top">{{$t('m_login.h002')}}</p>
            <el-button class="btn_m_sy01" @click="onSubmit">{{$t('m_login.h003')}}</el-button>
        </div>
        <el-form ref="form" :model="form" :rules="rule" label-width="0px" class="account-find-form">
		</el-form>
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
    computed:{
        isDevice() {
            return afc.isDevice;
        }
    },
	methods : {
		onSubmit() {    // 휴대폰 본인확인 진행

            let self = this;

            self.$refs['form'].validate((valid) => {
                if (valid) {
                    var myWindow = null;
                    if (self.isDevice) {
                        myWindow = window.open(process.env.MTS_CRET_URL,'pccPopup', "width=400,height=615");
					} else {
                        myWindow = window.open(process.env.CRET_URL,'pccPopup', "width=400,height=615");
                    }
                    if (myWindow === null || typeof(myWindow) === 'undefined') {
                        self.$alert(self.$t('m_login.h006'), '', {
                            dangerouslyUseHTMLString: true,
                            confirmButtonText: self.$t('m_login.b004')
                        });
                    }

                    // if(self.isDevice){						
					// 	cordova.exec(null,null,"AppPlugin","loadWebView",[0,0,1,1,'',process.env.CRET_URL]);
					// }else{
                    //     var myWindow = window.open(process.env.CRET_URL,'pccPopup', "width=400,height=615");
                    //     if (myWindow === null || typeof(myWindow) === 'undefined') {
                    //         self.$alert(self.$t('m_login.h006'), '', {
                    //             dangerouslyUseHTMLString: true,
                    //             confirmButtonText: self.$t('m_login.b004')
                    //         });
                    //     }
                    // }
                    

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

			self.$store.commit('setAccountFind',{auth_di : form.auth_di})
            self.$store.dispatch('accountFind', {}).then((data) => {
                // alert("가입하신 ID는 '" + data.user_mail + "' 입니다.");
                self.$alert(self.$t('m_login.h004') + ' : ' + data.user_mail, '', {
                    confirmButtonText: self.$t('m_login.g014'),
                    callback: action => {
                        self.$router.push({name: 'mLogin'});
                    }
                });
            });
        },
	},
    created() {
        this.$EventBus.$emit('mobile-nav-title', this.$t('m_login.h001'));
        this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
    },
    mounted(){
		window.addEventListener('pccCallback', this.pccCallback);
    },
    destroyed(){
		window.removeEventListener('pccCallback', this.pccCallback);
	}
};

</script>