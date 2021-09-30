<template>
  <div style="overflow:hidden">
    <!-- 우편번호  -->
    <el-dialog
      title="우편번호 검색"
      :visible.sync="zipCodeDialogVisible"
      :width="pcWidth"
      :top="isPC ? '10vh' : ''"
      :close-on-click-modal="true"
      :fullscreen="fullScrn"   
      lock-scroll  
      destroy-on-close
      append-to-body       
    >
      <div style="margin-top:50px;">
        <!-- 주소검색API 화면이 보여지는 곳 -->
        <div ref="embed" id="iframePostNo"></div>
        <div v-if="btnVisible" style="text-align: center; margin-top: 20px">
          <el-button type="success" @click="showApi">우편번호 찾기</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MobileDetect from 'mobile-detect';
export default {
  data() {
    return {
      btnVisible:true,

      fullScrn: true,
      pcWidth: "",
      zip: "",
      addr1: "",
      addr2: "",

      zipCodeDialogVisible: false,

      homeAddr: [{
        zipCode: "",
        addrUpdate1: "",
        flag: "",
      }],

      jobAddr: [{
        zipCode: "",
        addrUpdate1: "",
        flag: "",
      }],

      isPC: true,     
      pcHeight:'450px',
      mobileHeight:'600px',
    };
  },
  watch: {
    //팝업 뜰 때 데이터 초기화, 주소선택없이 닫을 때 각 페이지 영역 비노출
    zipCodeDialogVisible(val1, val2) {      
      let self = this;
      console.log("zipCodeDialogVisible:" + self.zipCodeDialogVisible);
      if (
        self.zipCodeDialogVisible == false &&
        self.zip == "" &&
        self.addr1 == ""
      ) {
        self.$EventBus.$emit("ResidenceFlag");
        self.$EventBus.$emit("jobAddrInfoFlag");
        self.$EventBus.$emit("AccomoInfoFlag");
        self.$EventBus.$emit("mAccomoEditFlag");
        self.$EventBus.$emit("mWorkPlaceEditFlag");
        self.$EventBus.$emit("mAccomoInfoFlag");
        self.$EventBus.$emit("mWorkPlaceInfoFlag");
        self.$EventBus.$emit("AccomoEditFlag");
        self.$EventBus.$emit("WorkPlaceEditFlag");
        self.$EventBus.$emit("AccomoInfoFlag");
        self.$EventBus.$emit("WorkPlaceInfoFlag");    
      } else if (self.zipCodeDialogVisible == true) {
        self.zip = "";
        self.addr1 = "";
      }
    },
  },
  methods: {
    //우편번호 팝업 띄우고 PC/모바일 에 따라 UI 세팅
    zipCode(data) {      
      const self = this;
      self.btnVisible = true
      if (data) {
        self.$store.state.user.postNoFrom = data;
        self.zipCodeDialogVisible = true;
      }

      if (  data === "AccomoInfo" 
         || data == "WorkPlaceInfo"
         || data === "AccomoEdit" 
         || data == "WorkPlaceEdit"
      ) {//PC웹 환경
        self.fullScrn = false;
        self.pcWidth = "50%";
      } else { //모바일 환경
        self.fullScrn = true;
        self.pcWidth = "100%";
      }
    },

    showApi() {
      this.btnVisible = false        
      new window.daum.Postcode({
        //iFrame 사이즈에 맞게 width 수치 조절되어 내려옴
        onresize: function(size){
          
            const post = document.getElementById('iframePostNo');
            post.style.width = size.width+'px';
           // post.style.height = size.height+'px'; ->  검색결과가 많으면 Height 가 너무 길어져 버림     

            console.log("size:"+ JSON.stringify(size))        
        },
        width : '100%',
        height : this.isPC?this.pcHeight:this.mobileHeight,  
        oncomplete: (data) => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
          let extraRoadAddr = ""; // 도로명 조합형 주소 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }

          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }

          // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }
          // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
          if (fullRoadAddr !== "") {
            fullRoadAddr += extraRoadAddr;
          }

          this.addrProcess(data.zonecode, fullRoadAddr);
          //팝업 끔
          this.zipCodeDialogVisible = false;

       
        },   
      }).embed(
          this.$refs.embed        
      );     
    },
    addrProcess(zonecode, fullRoadAddr) {
      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      let flag = "";

      if (this.$store.state.user.postNoFrom == "residence") {
        //거주정보에서 호출
        this.zip = zonecode;
        this.$store.state.user.userAccCreationInfo.home_pst_no =
          zonecode;
        //5자리 새우편번호 사용
        this.addr1 = fullRoadAddr;
        this.$store.state.user.userAccCreationInfo.home_addr =
          fullRoadAddr;

        if (this.zip && this.addr1) flag = true;
        else flag = false;
        this.$EventBus.$emit("residenceFlag", flag);
      } else if (
        this.$store.state.user.postNoFrom == "jobAddrInfo"
      ) {
        //직장정보에서 호출
        this.zip = zonecode;
        this.$store.state.user.userAccCreationInfo.ofc_pst_no =
          zonecode;
        //5자리 새우편번호 사용
        this.addr1 = fullRoadAddr;
        this.$store.state.user.userAccCreationInfo.ofc_addr =
          fullRoadAddr;

        if (this.zip && this.addr1) flag = true;
        else flag = false;
        this.$EventBus.$emit("jobAddrInfoFlag", flag);
      } else if (
        this.$store.state.user.postNoFrom == "mAccomoInfo"
      ) {
        //모바일 고객확인 재이행 자택정보에서 호출
        this.zip = zonecode;
        this.homeAddr.zipCode = zonecode;
        //5자리 새우편번호 사용
        this.addr1 = fullRoadAddr;
        this.homeAddr.addrUpdate1 = fullRoadAddr;

        if (this.zip && this.addr1) flag = true;
        else flag = false;
        this.homeAddr.flag = flag;
        this.$EventBus.$emit("mAccomoInfoFlag", this.homeAddr);
      } else if (
        this.$store.state.user.postNoFrom == "mWorkPlaceInfo"
      ) {
        //모바일 고객확인 재이행 직장정보에서 호출
        this.zip = zonecode;
        this.jobAddr.zipCode = zonecode;
        //5자리 새우편번호 사용
        this.addr1 = fullRoadAddr;
        this.jobAddr.addrUpdate1 = fullRoadAddr;

        if (this.zip && this.addr1) flag = true;
        else flag = false;
        this.jobAddr.flag = flag;
        this.$EventBus.$emit("mWorkPlaceInfoFlag", this.jobAddr);
      } else if (  
        this.$store.state.user.postNoFrom == "accomoInfo"
      ) {
        //PC 고객확인 재이행 자택정보에서 호출
        this.zip = zonecode;
        this.homeAddr.zipCode = zonecode;
        //5자리 새우편번호 사용
        this.addr1 = fullRoadAddr;
        this.homeAddr.addrUpdate1 = fullRoadAddr;

        if (this.zip && this.addr1) flag = true;
        else flag = false;
        this.homeAddr.flag = flag;
        this.$EventBus.$emit("accomoInfoFlag", this.homeAddr);
      } else if (
        this.$store.state.user.postNoFrom == "workPlaceInfo"
      ) {
        //PC 고객확인 재이행 직장정보에서 호출
        this.zip = zonecode;
        this.jobAddr.zipCode = zonecode;
        //5자리 새우편번호 사용
        this.addr1 = fullRoadAddr;
        this.jobAddr.addrUpdate1 = fullRoadAddr;

        if (this.zip && this.addr1) flag = true;
        else flag = false;
        this.jobAddr.flag = flag;
        this.$EventBus.$emit("workPlaceInfoFlag", this.jobAddr);
      } else if (
        this.$store.state.user.postNoFrom == "mAccomoEdit"
      ) {
        //모바일 정보편집 자택정보에서 호출
        this.zip = zonecode;
        this.homeAddr.zipCode = zonecode;

        //5자리 새우편번호 사용
        this.addr1 = fullRoadAddr;
        this.homeAddr.addrUpdate1 = fullRoadAddr;

        if (this.zip && this.addr1) flag = true;
        else flag = false;
        this.homeAddr.flag = flag;
        this.$EventBus.$emit("mAccomoEditFlag", this.homeAddr);
      } else if (
        this.$store.state.user.postNoFrom == "mWorkPlaceEdit"
      ) {
        //모바일 정보편집 직장정보에서 호출
        this.zip = zonecode;
        this.jobAddr.zipCode = zonecode;
        //5자리 새우편번호 사용
        this.addr1 = fullRoadAddr;
        this.jobAddr.addrUpdate1 = fullRoadAddr;

        if (this.zip && this.addr1) flag = true;
        else flag = false;
        this.jobAddr.flag = flag;
        this.$EventBus.$emit("mWorkPlaceEditFlag", this.jobAddr);
      } else if (
        this.$store.state.user.postNoFrom == "accomoEdit"
      ) {
        //PC 정보편집 자택정보에서 호출
        this.zip = zonecode;
        this.homeAddr.zipCode = zonecode;

        //5자리 새우편번호 사용
        this.addr1 = fullRoadAddr;
        this.homeAddr.addrUpdate1 = fullRoadAddr;

        if (this.zip && this.addr1) flag = true;
        else flag = false;
        this.homeAddr.flag = flag;
        this.$EventBus.$emit("accomoEditFlag", this.homeAddr);
      } else if (
        this.$store.state.user.postNoFrom == "workPlaceEdit"
      ) {
        //PC 정보편집 직장정보에서 호출
        this.zip = zonecode;
        this.jobAddr.zipCode = zonecode;
        //5자리 새우편번호 사용
        this.addr1 = fullRoadAddr;
        this.jobAddr.addrUpdate1 = fullRoadAddr;

        if (this.zip && this.addr1) flag = true;
        else flag = false;
        this.jobAddr.flag = flag;
        this.$EventBus.$emit("workPlaceEditFlag", this.jobAddr);
      }
      //초기화
      this.homeAddr = []
      this.jobAddr = []
      this.$store.state.user.postNoFrom = "";
    },
  },
  created() {
    const self = this;       
    const md = new MobileDetect(window.navigator.userAgent);
    if (md.phone()) {
        self.isPC = false;
    } else {
        self.isPC = true;
    }
    console.log("isPC:"+ self.isPC)
    self.$EventBus.$on("zipCode", self.zipCode);
  },
  beforeDestroy() {
    const self = this;
    self.$EventBus.$off("zipCode", self.zipCode);
  },
};
</script>
