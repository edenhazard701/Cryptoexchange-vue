<!--
PC : 회원가입 > 구글 OTP 등록
-->
<template>
	<el-main class="EtcVue NewGoogleOTP">
        <div class="mypage_cont input-form">
            <h3 class="title">{{$t('mypage.e018')}}<!--Google OTP 등록--></h3>
            <el-form ref="form" :model="form" :rules="rule" label-width="0px" class="new-google-otp-form">
                <div class="otp-step">
                    {{$t('signup.b001')}}
                    <!--1. Google OTP 앱을 실행하세요.--><br>
                    <span class="small">{{$t('signup.b001-1')}}<!--(앱스토어에서 다운로드)--></span>
                </div>
                <div class="otp-step">
                    <!-- 2. QR코드를 스캔하거나 제공된 키를 입력하세요. -->
                    {{$t('signup.b001-2')}}
                </div>
                <el-row>
                    <el-col class="qr-code">
                        <span class="label">{{$t('signup.b002')}}<!--&lt;QR코드&gt;--></span>
                        <div id="qrcode" class="code-img"></div>
                    </el-col>
                    <el-col class="key">
                        <span class="label">{{$t('signup.b003')}}<!--&lt;키&gt;--></span>
                        <el-input type="text" placeholder="seri_no" auto-complete="off" v-model="form.seri_no"></el-input>
                    </el-col>
                </el-row>

                <div class="otp-step">{{$t('signup.b004')}}<!--3. Google OTP 앱에서 보이는 OTP번호를 입력하세요.--></div>
                <el-form-item prop="iput_otp">
                    <el-input type="text" :placeholder="$t('signup.b005')" @keypress.native="keypressEvent" auto-complete="new-password" v-model="form.iput_otp" maxlength="6"></el-input>
                </el-form-item>
                <el-form-item class="btns-row">
                    <el-button type="info" @click.native.prevent="onCancel" class="cancel-btn">{{$t('signup.b007')}}<!--취소--></el-button>
                    <el-button type="primary" ref="okBtn" @click.native.prevent="onSubmit">{{$t('signup.b006')}}<!--저장--></el-button>
                </el-form-item>
            </el-form>
        </div>
	</el-main>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            saving: false,
            form: {
                iput_otp: '',
                seri_no: ''
            },
            rule: {
                iput_otp: [
                    {required: true, message: this.$t('signup.b008'), trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        onSubmit() {
            let self = this;
            let plan = self.$route.query.plan

            self.$refs['form'].validate((valid) => {
                if (valid) {
                    /**
                     * PRE로그인 후 미등록 : PRE로그인 -> SecurityIntro -> 인증등록 -> 로그인 보안비밀번호 입력
                     * 회원가입 : 뒤로
                     * 마이페이지 : 뒤로
                     */
                    self.$store.dispatch('otpInfoSave',{iput_otp:self.form.iput_otp}).then((data) => {
                        console.log('otpInfoSave Success')
                        // alert('Google OTP가 등록되었습니다.')
                        this.$alert(this.$t('signup.b010'), '', {
                            confirmButtonText: this.$t('login.g014'),
                            callback: action => {
                                if(plan === 'preLogin'){
                                    //self.$router.push({name : 'login'});

                                    if(self.form.iput_otp != ''){
                                        self.$store.dispatch('login', {
                                            iput_secu_pass : self.form.iput_otp
                                        }).then((data) => {
                                            console.log('login Success')
                                            self.$EventBus.$emit('reloadStockMaster');
                                            if(data.temp_use_tp === '1'){
                                                self.$router.push({name:'exchange'})
                                                // self.$router.push({name:'newPassword'}) //새 비밀번호 등록
                                            }else{
                                                self.$router.go(-3);
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

                if (charCode !== 46 && (charCode < 48 || charCode > 57)) {   // 숫자, . 아니면 입력 방지
                    e.preventDefault();
                }
            }
                
        }
    },
    computed: {
        getQrCode() {

            //시크릿키로 QR코드 생성하기
            this.$store.dispatch('otpInfomCall').then((data) => {
                console.log(data);
                this.form.seri_no = data.seri_no
                let qrcd_url = data.qrcd_url
                let qrCodeDataTmp = qrcd_url.substring(qrcd_url.indexOf('otpauth'))
                let qrCodeData = qrCodeDataTmp.substr(0,qrCodeDataTmp.indexOf('&'))
                let qrcode = new QRCode( document.getElementById("qrcode"), { width : 200, height : 200 })
                qrcode.makeCode( qrCodeData )
                console.log('otpInfomCall Success')
            });

        }
    },
    created() {
        this.$EventBus.$emit('pc-navi', '');
    },
    mounted() {
        this.getQrCode
    }

}
</script>