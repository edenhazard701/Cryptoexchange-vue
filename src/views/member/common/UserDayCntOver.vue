<template>      
    <!-- 고객확인제도재이행 주기일 초과시-->
    <el-dialog :visible.sync="myUserDayCntOverVisible" :show-close="false" destroy-on-close append-to-body class="NewStock">
        <span slot="title"></span>
        <div class="new-stock-info" style="margin-top:0px; font-size:15px">{{content2}}</div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="myCloseUDC" :class="{'mobile-ok': !isPC}">확인</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
	components: {

	},
	data () {
		return {           
            myUserDayCntOverVisible: false,            
        
            content2:"고객확인제도 재이행 주기가 도래했어요."
            + "정보 업데이트 후 서비스를 이용해 주세요.",
            userId:'',
            from:''
		};
       
	},
	methods : {  
        //정보업데이트 페이지 이동
        myCloseUDC(){
            let self = this;            
            self.myUserDayCntOverVisible = false

            if(afc.isDevice)   
            {
                self.$router.push({name:'mCustomerConfirm', params:{user_id:  self.userId}})

            }else
            {          
                self.$router.push({name:'mypageCustomerconfirm', params:{user_id:  self.userId}}) 
            }
        },
        checkDayCnt(data){

            const self = this;       
            console.log("userId: "+ data.userId)
            self.userId = data.userId
            self.from = data.from

            self.myUserDayCntOverVisible = true
        }

	},
    created() {
        let self = this;
        self.$EventBus.$on('checkDayCntOver', self.checkDayCnt);      
        self.$EventBus.$emit("mobile-nav-title", "휴대폰번호변경");
        self.$EventBus.$emit('mobile-nav-menus', ['back', 'noDefault', 'border']);
    }, 
    beforeDestroy(){
        let self = this;
        self.$EventBus.$off("checkDayCntOver", self.checkDayCnt);

    }
};

</script>
