<template>
	<el-main class="new-password-main">
        <div class="member_form fixed">
            <p class="member_form_txt top">{{$t('m_login.d002')}}</p>
            <el-form ref="form" :model="form" :rules="rule" label-width="0px" class="new-password-form">
                <el-form-item prop="new1">
                    <el-input type="password" class="inp_m"  :placeholder="$t('m_login.d003')" auto-complete="new-password" v-model="form.new1" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item prop="new2">
                    <el-input type="password" class="inp_m"  :placeholder="$t('m_login.d004')" auto-complete="new-password" v-model="form.new2" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item class="btm_fix_btn">
                    <el-button class="b_success_btn" @click="onSubmit" :loading="saving">{{$t('m_login.d005')}}</el-button>
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
        const validatePass1 = (rule, value, callback) => {
            let len = value.length;
            let validate = false
            for(let i=0;i<len;i++){
                if(i+2<len){
                    if(value.charCodeAt(i)+1==value.charCodeAt(i+1)&&value.charCodeAt(i+1)+1==value.charCodeAt(i+2)) validate = true;
                    if(value.charCodeAt(i)==value.charCodeAt(i+1)&&value.charCodeAt(i+1)==value.charCodeAt(i+2)) validate = true;
                }
            }
            validate ? callback(new Error(this.$t('m_login.d009'))) : callback()
        }
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('m_login.d006')))
            } else if (value !== this.form.new1) {
                callback(new Error(this.$t('m_login.a012')))
            } else {
                callback()
            }
        }
		return { 
            navTitle: '새 비밀번호 등록',
            saving: false,
            form: {
                new1: '',
                new2: ''
            },
            rule: {
                new1: [
                    { required: true, message: this.$t('m_login.d006'), trigger: 'blur' },
                    { required: true, pattern:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/ , message: this.$t('m_login.d008'), trigger: 'blur' },
                    { validator: validatePass1, trigger: 'blur'}
                ],
                new2: [
                    { validator: validatePass2, trigger: 'change'}
                ]
            }
		};
	},
	methods : {
		onSubmit() {
            let _this = this;

            _this.$refs['form'].validate((valid) => {
                if (valid) {

                    _this.$store.dispatch('passwordchange', {
                        user_id : _this.$store.state.user.login.user_id,
                        user_pass_now : _this.$store.getters.getLogin.pwd,
                        user_pass_new : new UnikeyAIR().sha256AndBase64(_this.form.new1) //_this.form.new1,
                    }).then((data) => {                        
                        // alert('비밀번호가 변경되었습니다.')
                        _this.$alert(_this.$t('m_login.d010'), '', {
                            confirmButtonText: _this.$t('m_login.b004'),
                            callback: action => {
                                var pwd = new UnikeyAIR().sha256AndBase64(_this.form.new1);
                                var login = _this.$store.state.user.login;
                                login.pwd = pwd;
                                
                                _this.$store.commit('setLogin', login)
                                
                                var secu_auth_tp = _this.$store.state.data.secu_auth_tp;

                                if (secu_auth_tp == '0') {
                                    _this.$router.push({name: 'mSecurityIntro'})
                                }else if (secu_auth_tp == '1') {								
                                    _this.$router.push({ name: 'mSecurePIN' })
                                }else if (secu_auth_tp == '3') {
                                    _this.$router.push({ name: 'mGoogleOTP' })
                                }else{
                                    _this.$router.push({name:'mExchange'})
                                }
                            }
                        })
                    })
                }
            })
        },
        onCancel() {
            this.$router.push({name:'mExchange'})
        }
	},
    created() {
        this.$EventBus.$emit('mobile-nav-title', this.$t('m_login.d001'));
        this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
    }
};

</script>