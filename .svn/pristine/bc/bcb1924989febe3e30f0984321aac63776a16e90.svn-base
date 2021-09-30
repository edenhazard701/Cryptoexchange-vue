<!--
PC : 회원가입 > 보안비밀번호 등록
-->
<template>
	<el-main class="EtcVue NewSecurePIN">
        <div class="mypage_cont input-form">
            <h3 class="title">{{$t('mypage.f001')}}<!--보안비밀번호 등록--></h3>
            <el-form ref="form" :model="$store.state.user.newSecurePin" :rules="rule" label-width="0px" class="new-secure-pin-form" autocomplete="off">
                <h5>{{$t('signup.c001')}}<!--보안비밀번호 숫자 4자리를 입력하세요.--></h5>
                <el-form-item prop="secu_pass" :label="$t('mypage.f003')">
                    <el-input type="password" :placeholder="$t('login.c003')" @keypress.native="keypressEvent" autocomplete="false" v-model="$store.state.user.newSecurePin.secu_pass" maxlength="4"></el-input>
                </el-form-item>
                <el-form-item prop="secu_pass2" :label="$t('signup.c003')">
                    <el-input type="password" :placeholder="$t('signup.c003')" @keypress.native="keypressEvent" autocomplete="false" v-model="$store.state.user.newSecurePin.secu_pass2" maxlength="4"></el-input>
                </el-form-item>
                <el-form-item class="btm-buttons">
                    <el-button @click.native.prevent="onCancel" class="cancel-btn">{{$t('mypage.f006')}}<!--취소--></el-button>
                    <el-button ref="okBtn" type="primary" @click.native.prevent="onSubmit">{{$t('mypage.f005')}}<!--저장--></el-button>
                </el-form-item>
            </el-form>
        </div>
	</el-main>
</template>

<script>
export default {
	components: {},
	data () {
        const validatePass1 = (rule, value, callback) => {
            let len = value.length;
            let validate = false
            for(let i=0;i<len;i++){
                if(i+2<len){
                    if(value.charCodeAt(i)+1==value.charCodeAt(i+1)&&value.charCodeAt(i+1)+1==value.charCodeAt(i+2)) validate = true;
                    if(value.charCodeAt(i)==value.charCodeAt(i+1)&&value.charCodeAt(i+1)==value.charCodeAt(i+2)) validate = true;
                }
            }
            validate ? callback(new Error(this.$t('signup.c008'))) : callback()
        }
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('signup.c006')))
            } else if (value !== this.$store.state.user.newSecurePin.secu_pass) {
                callback(new Error(this.$t('signup.c009')))
            } else {
                callback()
            }
        }
		return {
            saving: false,
            rule: {
                secu_pass: [
                    { required: true, message: this.$t('signup.c006'), trigger: 'blur' },
                    { required: true, pattern:/^[0-9]{4,4}$/, message: this.$t('signup.c007'), trigger: 'blur'},
                    { validator: validatePass1, trigger: 'blur'},
                ],
                secu_pass2: [
                    { validator: validatePass2, trigger: ['change', 'blur']}
                ]
            }
		};
	},
	methods : {
        onSubmit() {
            let self = this
            let user = self.$store.state.user
            let plan = self.$route.query.plan

            self.$refs['form'].validate((valid) => {
                if (valid) {

                    /**
                     * PRE로그인 후 미등록 : PRE로그인 -> SecurityIntro -> 인증등록 -> 로그인 보안비밀번호 입력
                     * 회원가입 : 뒤로
                     * 마이페이지 : 뒤로
                     */
                    this.$store.dispatch('newSecurePin',user).then((data) => {
                        console.log('newSecurePin Success')
                        // alert('보안비밀번호가 등록되었습니다.')
                        this.$alert(this.$t('signup.c010'), '', {
                            confirmButtonText: this.$t('login.g009'),
                            callback: action => {
                                //인증완료 상태값 변경후 이전화면 이동
                                if(plan === 'preLogin'){
                                    // self.$router.push({name : 'login'});

                                    let inputPin = user.newSecurePin.secu_pass
                                    let encPassword = new UnikeyAIR().sha256AndBase64(inputPin)
                                    if(inputPin != ''){
                                        self.$store.dispatch('login', {
                                            iput_secu_pass : encPassword
                                        }).then((data) => {
                                            console.log('login Success')
                                            self.$EventBus.$emit('reloadStockMaster');
                                            if(data.temp_use_tp === '1'){
                                                self.$router.push({name:'exchange'})
                                            }else{
                                                self.$router.push({name:'mypageSecurity'})
                                            }
                                        });
                                    }
                                } else {
                                    //인증완료 상태값 변경후 이전화면 이동
                                    self.$store.state.user.registration.secured = true
                                    self.$router.go(-1)
                                }
                            }
                        });
                    })

                } else {
                    self.disabled = true
                }
            })

        },
        onCancel() {
            let self = this;
            self.$router.go(-1)
        },
        keypressEvent(e) {

            var charCode = (typeof e.which === undefined) ? e.keyCode : e.which;
            var charStr = String.fromCharCode(charCode);
            
            if (e.key == 'Enter') {
                
                this.$refs['okBtn'].$el.click();
                e.preventDefault();
            } else {
                
                if((charCode < 48 || charCode > 57)) {   // 숫자, . 아니면 입력 방지
                    e.preventDefault();
                }
            }
        }
    },
    created() {
        this.$EventBus.$emit('pc-navi', '');

        this.$store.state.user.newSecurePin.secu_pass = '';
        this.$store.state.user.newSecurePin.secu_pass2 = '';
    }
};

</script>