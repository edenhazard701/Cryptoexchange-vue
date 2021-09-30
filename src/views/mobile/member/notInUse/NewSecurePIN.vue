<!--
모바일 : 회원가입 > 보안비밀번호 등록
-->
<template>
	<el-main class="new-secure-pin-main">
        <div class="member_form fixed">
            <p class="member_form_txt top">{{$t('m_signup.c001')}}</p>
            <el-form ref="form" :model="form" :rules="rule" label-width="0px">
                <el-form-item prop="secu_pass">
                    <el-input type="password" class="inp_m" :placeholder="$t('m_signup.c002')" pattern="\d*" auto-complete="new-password" v-model="form.secu_pass" maxlength="4"></el-input>
                </el-form-item>
                <el-form-item prop="secu_pass2">
                    <el-input type="password" class="inp_m" :placeholder="$t('m_signup.c003')" pattern="\d*" auto-complete="new-password" v-model="form.secu_pass2" maxlength="4"></el-input>
                </el-form-item>

                <!-- 모바일 앱 보안키패드
                <el-form-item v-if="isDevice" prop="secu_pass">
                    <el-input id="secure_pass1" type="text" class="inp_m" :placeholder="$t('m_signup.c002')"  v-model="secu_pass_d1" readonly="readonly" @click.native.prevent="secuClick"></el-input>
                    <el-input id="secure_pass_h1" type="hidden" class="inp_m" :placeholder="$t('m_signup.c002')" v-model="form.secu_pass" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item v-if="isDevice" prop="secu_pass2">
                    <el-input id="secure_pass2" type="text" class="inp_m" :placeholder="$t('m_signup.c003')"  v-model="secu_pass_d2" readonly="readonly" @click.native.prevent="secuClick"></el-input>
                    <el-input id="secure_pass_h2" type="hidden" class="inp_m" :placeholder="$t('m_signup.c003')"  v-model="form.secu_pass2" readonly="readonly"></el-input>
                </el-form-item>

                -->

                <el-form-item class="btm_fix_btn">
                    <el-button @click="onSubmit" :loading="saving" class="b_success_btn">{{$t('m_signup.c004')}}</el-button>
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
            validate ? callback(new Error(this.$t('m_signup.c007'))) : callback()
        }
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('m_signup.c005')))
            } else if (value !== this.form.secu_pass) {
                callback(new Error(this.$t('m_signup.c008')))
            } else {
                callback()
            }
        }
        return {
            navTitle : '보안비밀번호 등록',
            saving: false,
            form: {
                secu_pass: '',
                secu_pass2: '',
            },
            rule: { 
                secu_pass: [
                    { required: true, message: this.$t('m_signup.c005'), trigger: 'blur' },
                    { required: true, pattern:/^[0-9]{4,4}$/, message: this.$t('m_signup.c006'), trigger: 'blur'},
                    { validator: validatePass1, trigger: 'blur'}
                ],
                secu_pass2: [
                    { validator: validatePass2, trigger: 'change'}
                ]
            },
            secu_pass_d1 : '', //보안키패드 더미 패스워드 앱 
            secu_pass_d2 : '', //보안키패드 더미 패스워드 앱
            openkeyPadcheck : false 
        };
    },
    watch: {
        "form.secu_pass": function(val, oldVal) {
            var self = this;
            var text = self.form.secu_pass.replace(/[^0-9]/g,"");

            if(text != self.form.secu_pass){
                setTimeout(() => {
                    self.form.secu_pass = text;
                }, 100);
            }
        },
        "form.secu_pass2": function(val, oldVal) {
            var self = this;
            var text = self.form.secu_pass2.replace(/[^0-9]/g,"");

            if(text != self.form.secu_pass2){
                setTimeout(() => {
                    self.form.secu_pass2 = text;
                }, 100);
            }
        },
    },
    methods : {
        onSubmit() {
            let _this = this;
            let user = _this.$store.state.user
            let plan = _this.$route.query.plan;

            if(!_this.$store.state.user.newSecurePin.user_id){
                _this.$store.state.user.newSecurePin.user_id = _this.$store.state.user.login.user_id;
            }
            
            _this.$store.state.user.newSecurePin.secu_pass = _this.form.secu_pass;
            _this.$store.state.user.newSecurePin.secu_pass2 = _this.form.secu_pass2;

            _this.$refs['form'].validate((valid) => {
                if (valid) {

                    /**
                     * PRE로그인 후 미등록 : PRE로그인 -> SecurityIntro -> 인증등록 -> 로그인 보안비밀번호 입력
                     * 회원가입 : 뒤로
                     * 마이페이지 : 뒤로
                     */
                    this.$store.dispatch('newSecurePin',user).then((data) => {
                        console.log('newSecurePin Success')
                        // alert('보안비밀번호가 등록되었습니다.')
                        this.$alert(this.$t('m_signup.c009'), '', {
                            confirmButtonText: this.$t('m_login.b004')
                        })

                        if(plan === 'preLogin'){
                            //_this.$router.push({name : 'mMain'});
                            let encPassword = new UnikeyAIR().sha256AndBase64(_this.form.secu_pass)
                            _this.$store.dispatch('login', {
                                iput_secu_pass : encPassword
                            }).then((data) => {
                                console.log('login Success')
                                _this.$EventBus.$emit('reloadStockMaster');
                                if(data.temp_use_tp === '1'){
                                    _this.$router.push({name:'mExchange'})
                                }else{
                                    _this.$router.push({name:'mMySecurity'})
                                }
                                
                                
                            });
                        }else{
                            //인증완료 상태값 변경후 이전화면 이동
                            _this.$store.state.user.registration.secured = true
                            _this.$router.go(-1)
                        }

                    })

                } else {
                    _this.disabled = true
                }
            })

        },
        onCancel() {
            let self = this;
            self.$router.go(-1)
        },
        // 보안키패드 앱
        // secuClick(event){
        //     var self = this;
        //     self.openkeyPadcheck = true
        //     SecurePadManager.closePopupPad(); 
        //     SecurePadManager.resetCallback();

        //     var padOption =
        //     {
        //         title: '비밀번호 입력',
        //         padType: 'popup', 
        //         returnType: 1, 
        //         maxLength: 4,
        //         minLength: 4,
        //         genKey: null
        //     };
            
        //     SecurePadManager.openPad(padOption, function(code, data, len){ 
        //         if(len === 'cancel'){ //취소버튼 클릭시
        //             //SecurePadManager.closePopupPad()
        //         }else{
        //             if(event.target.id === 'secure_pass1'){
        //                 self.secu_pass_d1 =  afc.makeDummyString(len)
        //                 self.form.secu_pass =  data
        //             }else if(event.target.id === 'secure_pass2'){
        //                 self.secu_pass_d2 =  afc.makeDummyString(len)
        //                 self.form.secu_pass2 =  data
        //             }
        //         }
        //     });
        // },
    },
    created() {
        this.$EventBus.$emit('mobile-nav-title', this.$t('m_signup.c010'));
        this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
    },
    computed: {
        isDevice() {
            return afc.isDevice;
        }
    },
    mounted() {
        var self = this;
        // 보안키패드 앱 
        // if(afc.isDevice){
        //     $(document).off('click touchstart').on('click touchstart', function (event) {
        //         if(event.target.id === 'secure_pass1' ||event.target.id === 'secure_pass2'){
        //             return 
        //         }else if(self.openkeyPadcheck === true){
        //             self.openkeyPadcheck = false
        //             SecurePadManager.closePopupPad()
        //         }else{
        //             self.openkeyPadcheck = false
        //             return 
        //         }
        //     });
        // }
    }
};

</script>