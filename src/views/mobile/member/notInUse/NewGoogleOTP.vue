<!--
모바일 : 회원가입 > 구글 OTP 등록
-->
<template>
	<el-main class="new-google-otp-main">
        <el-form ref="form" :model="form" :rules="rule" label-width="0px" class="new-google-otp-form">
            <div class="list_cont">
                <p class="txt" v-html="$t('m_signup.b001_01')"></p>
            </div>
            <div class="list_cont">
                <p class="txt">{{$t('m_signup.b001_02')}}</p>                
                <div class="qr-code">
                    <!-- <span class="label">&lt;QR코드&gt;</span> -->
                    <div id="qrcode" class="code-img"></div>
                </div>
                <div class="key">
                    <!-- <span class="label">&lt;키&gt;</span> -->
                    <el-input type="text" placeholder="seri_no" auto-complete="off" v-model="form.seri_no"></el-input>
                </div>
            </div>
            <div class="list_cont">
                <p class="txt">{{$t('m_signup.b004')}}</p>
                <div prop="otp" class="otp_wrap">
                    <el-form-item prop="iput_otp">
                        <el-input type="number" maxlength="6" max="999999"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        id="iput_otp" class="inp_m" :placeholder="$t('m_signup.b005')" v-model="form.iput_otp"></el-input>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <div class="btm_fix_btn">
            <el-button @click.native.prevent="onSubmit" :loading="saving" class="b_success_btn">{{$t('m_signup.b006')}}</el-button>
        </div>
	</el-main>
</template>

<script>
export default {
    components: {},
	data () {
		return {
            navTitle: 'Google OTP 등록',
            saving: false,
            form: {
                iput_otp: '',
                seri_no: '1JMQz8z2HwTJNt1JVHB4E7U1xKn9qSSLcm'
            },
            rule: {
                iput_otp: [
                    {required: true, message: this.$t('m_signup.b008'), trigger: 'blur'},
                    {required: true, pattern:/^[0-9]*$/, message: this.$t('m_signup.b011'), trigger: 'change'}
                ]
            },
            androidPackage: "my.app.package",
            appleAppId: "id1401934913", // id1401934913 형식으로 itunes url에 나오는 앱아이디.
            androidMarketUrl: "market//detail?id=my.app.package",
            iosMarketUrl: "http://itunes.apple.com/kr/app/id1401934913"
		};
	},
	methods : {
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
                        self.$alert(self.$t('m_signup.b010'), '', {
                           confirmButtonText: self.$t('m_login.b004')
                        })

                        if(plan === 'preLogin'){
                            let inputOtp = self.form.iput_otp
                            if(inputOtp != ''){
                                self.$store.dispatch('login', {
                                    iput_secu_pass : inputOtp
                                }).then((data) => {
                                    self.$EventBus.$emit('reloadStockMaster');
                                    self.$router.push({name:'mExchange'})
                                });
                            }                           
                            
                            //self.$router.push({ name: 'mGoogleOTP' })
                        }else{
                            //인증완료 상태값 변경후 이전화면 이동
                            self.$store.state.user.registration.secured = true
                            self.$router.go(-1)
                        }

                    })

                }
            })

        },
        onCancel() {
            let self = this;
            self.$router.go(-1)
        },
        qrcodeClick() {
            var self = this;
            var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
            var seriNo = '1111';
            var isAndroid = varUA.indexOf('android')>-1;
            var isiOS = varUA.indexOf('ios')>-1;
            var startTime = +new Date();

            setTimeout(function() {
                    var now = +new Date();
                    if ( now - startTime < 1000){
                        var marketUrl = "";
                        if( isAndroid ){
                            marketUrl = androidMarketUrl;
                        }else if( isiOS ){
                            marketUrl = iosMarketUrl;
                        }
                        location.href = marketUrl;
                    }
            }, 500);

            if ( isAndroid ){
                if ( varUA.match(/chrome/) ){
                    location.href = "intent://hostName?param1=someValue1&param2=someValue2/"
                                                +"#Intent;scheme=schemeName;action=android.intent.action.VIEW;"
                                                +"category=android.Intent.category.BROWSABLE;package="+self.androidPackage;
                }else{
                    var iframe = document.createElement( 'iframe' );
                    iframe.style.visivility = 'hidden';
                    iframe.src = 'schemeName://hostName?param1=someValue1&param2=someValue2';
                    document.body.appendChild(iframe);
                    document.body.removeChild(iframe);
                }
            }else if ( isiOS ){
                location.href = "schemeName://hostName?param1=someValue1&param2=someValue2";
            }

        }
    },
    watch: {
        
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
                let qrcode = new QRCode( document.getElementById("qrcode"), { width : 158, height : 158 })
                qrcode.makeCode( qrCodeData )
                console.log('otpInfomCall Success')
            });

        }
    },
    mounted() {
        var self = this;
        self.getQrCode;        
    },
    created() {
        this.$EventBus.$emit('mobile-nav-title', this.$t('mypage.e018'));
        this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
    }
};

</script>
