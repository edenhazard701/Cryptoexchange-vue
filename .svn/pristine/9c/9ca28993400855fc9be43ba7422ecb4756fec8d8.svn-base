<!--
MOBILE 로그인 > 보안비밀번호 확인
-->
<template>
	<el-main class="secure-pin-main">
        <div class="member_form fixed">
            <p class="member_form_txt top">{{$t('m_login.c002')}}</p>
            <el-form ref="form" :model="form" :rules="rule" label-width="0px" class="secure-pin-form">
                <div style="display:none"> <!-- 자동이동 방지 -->
                    <input type="submit" onclick="return false;" />
                    <input type="text"/>
                </div>
                <el-form-item prop="pin">
                    <el-input type="password" :placeholder="$t('m_login.c003')" pattern="\d*" auto-complete="new-password" v-model="form.pin" class="inp_m" maxlength="4"></el-input>
                    <el-input type="hidden"></el-input>
                </el-form-item>

                <!-- 보안 키패드 앱 -->
                <!-- <el-form-item v-if="isDevice" prop="pin">
                    <el-input id="secure_pass_now" type="text" :placeholder="$t('m_login.c003')" v-model="secure_pin" class="inp_m" readonly="readonly" @click.native.prevent="secuClick"></el-input>
                    <el-input id="secure_pass_now_h" type="hidden" v-model="form.pin" class="inp_m" readonly="readonly"></el-input>
                </el-form-item> -->
                 <!-- 보안 키패드 앱 -->

                <!-- 보안 키패드 앱 test용 -->
                <!-- <el-form-item v-if="isDevice" >
                    <el-input id="secure_pass_now" type="text" placeholder="보안키패드 숫자 테스트용" v-model="secure_pin" class="inp_m" readonly="readonly" @click.native.prevent="secuClickTest"></el-input>
                    <el-input id="secure_pass_now_h" type="text" v-model="testKeyPad" class="inp_m" readonly="readonly"></el-input>
                </el-form-item> -->
                 <!-- 보안 키패드 앱 -->

                <el-form-item class="security_cont">
                    <p class="gray_txt">{{$t('m_login.c004')}}</p>
                    <el-button type="text" class="blue_txt_btn" @click="$router.push({name: 'mMySecurity' ,query:{plan:'preLogin'} })">{{$t('m_login.c005')}}</el-button>
                </el-form-item>
                <el-form-item class="btm_fix_btn">
                    <el-button class="b_success_btn" @click.native.prevent="onSubmit" :loading="verifying">{{$t('m_login.b004')}}</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 불투명 mask -->
        <div id="secureKeyPadbg" class="half-transparent" v-show="secureKeyPadbg"></div> 
	</el-main>
</template>

<script>
import { mapState } from 'vuex';
export default {
	components: {

	},
	data () {
		return {
            navTitle: '보안비밀번호 확인',
            verifying: false,
            form: {
                pin: ''//A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=
            },
            rule: {
                pin: [
                    { required: true, message: this.$t('m_login.c006'), trigger: 'blur' }
                ]
            },
            secure_pin : '',

            secureKeyPadbg : false  //보안키패드 백그라운드 배경
            ,testKeyPad : ''  //test키패드 변수 (test 완료후 삭제)
		}
    },
    computed: {
        ...mapState({
            nameList: state => state.data['n1001']
        }),
        isDevice() {
            return afc.isDevice;
        }
    },
    watch: {
        "form.pin": function(val, oldVal) {
            var self = this;
            var text = self.form.pin.replace(/[^0-9]/g,"");

            if(text != self.form.pin){
                setTimeout(() => {
                    self.form.pin = text;                    
                }, 100);
            }
        }
    },
	methods : {
        onSubmit() {
            let self = this;
            let inputPin = self.form.pin
            let encPassword = new UnikeyAIR().sha256AndBase64(inputPin)
            console.log('encPasswordTest===>' ,encPassword)
            if(inputPin != ''){
                this.$store.dispatch('login', {
                    iput_secu_pass : encPassword
                }).then((data) => {
                    console.log('login Success')
                    this.$EventBus.$emit('reloadStockMaster');

                    //if(data.temp_use_tp === '1'){
                        //새 비밀번호 등록
                    //this.$router.push({name:'mNewPassword'})
                    //}else{
                        //거래소로 이동
                        this.$router.push({name:'mExchange'})
                    //}
                });
            }
        },
        // 보안 키패드 앱
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
        //             if(event.target.id === 'secure_pass_now'){
        //                 self.secure_pin =  afc.makeDummyString(len)
        //                 self.form.pin =  data
        //             }
        //         }
        //     });
        // },

        secuClickTest(event){    //test 숫자 키패드 소스 (test ) 
            var self = this;
            alert('키패드 오픈 클릭')
            SecurePadManager.closePopupPad();
            self.secureKeyPadbg = false 
            SecurePadManager.resetCallback();

            var padOption =
            {
                title: '비밀번호 입력',
                padType: 'popup', 
                returnType: 1, 
                maxLength: 4,
                minLength: 4,
                genKey: null
            };
            self.secureKeyPadbg = true 
            SecurePadManager.openPad(padOption, function(code, data, len ,state){ 
                if(state === 'cancel' || state === 'complete' ){ //취소버튼 또는 입력완료시
                    if(event.target.id === 'secure_pass_now'){
                        self.secure_pin =  afc.makeDummyString(len)
                        self.testKeyPad =  data
                    }
                    self.secureKeyPadbg = false 
                    SecurePadManager.closePopupPad()
                }else{
                    if(event.target.id === 'secure_pass_now'){
                        self.secure_pin =  afc.makeDummyString(len)
                        self.testKeyPad =  data
                    }
                }
            });
        },

       
        
	},
    created() {
        this.$EventBus.$emit('mobile-nav-title', this.$t('m_login.c001'));
        this.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
    },
    mounted() {
        var self = this;
        // 보안 키패드 앱 
        if(afc.isDevice){
            $('#secureKeyPadbg').off('click focus touchstart').on('click focus touchstart', function (event) {
                alert('불투명 화면 클릭 ')
                self.secureKeyPadbg = false
                SecurePadManager.closePopupPad()
            });
        }


        // var self = this;
        // var input = self.$refs.form.$el.getElementsByTagName('input')[0];
        // $(input).bind("keyup change input", function(e) {
        //     if(e.keyCode == 13){          
        //         self.onSubmit();
        //     }
        // });
    }
};

</script>
