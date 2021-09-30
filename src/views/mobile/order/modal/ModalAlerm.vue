<template>
<div class="modal_wrap">
    <div class="dim"></div>
    <div class="modal_cont">
        <div class="modal_area">
            <strong class="pop_tit"><!--알림선 설정-->{{$t('html5chart.alertlinesett')}}</strong>
            <div class="alrm_lst_cont">
                <ul class="alerm_lst">
                    <li v-for="(item, i) in alermProps">
                        <div class="lst_bx">
                            <strong class="tit">{{item.text}}</strong>
                            <label class="switch">
                                <input type="checkbox" value="true" :name="item.name" :checked="item.value" @click="$emit('send-alerm-prop', {key: i, value: !item.value})">
                                <span class="slider round"></span>
                            </label><!-- switch -->
                        </div><!-- lst_bx -->
                    </li>
                </ul><!-- alerm_lst -->
            </div><!-- alrm_lst_cont -->
            <a href="#confirm" class="btn_modal_confirm" @click.prevent="$emit('confirm')"><!--확인버튼-->{{$t('html5chart.okbtn')}}</a>
            <a href="#close" class="btn_modal_close" @click.prevent="$emit('close')"><!--팝업닫기-->{{$t('html5chart.closebtn')}}</a>
        </div><!-- modal_area -->
    </div><!-- modal_cont -->
</div>
</template>

<script>
export default {
    props: ['alermProps'],
    created () {
        console.log("created ()");
        //하이브리드 앱 체크
        if (afc.isDevice) {
            //모바일 차트 - 주기 drop list 선택시 차트의 z-index 변경
            // cordova.exec( null , null, "ChartPlugin" , "toast", ["click-cross-remove"]); 
            ChartManager.bringToFront(true);
            //모바일 차트 - 주기 drop list 선택시 차트의 z-index 변경
        }
    },
    beforeDestroy () {
        console.log("beforeDestroy ()");
        //하이브리드 앱 체크
        if (afc.isDevice) {
            //모바일 차트 - 주기 drop list 선택시 차트의 z-index 변경
            // cordova.exec( null , null, "ChartPlugin" , "toast", ["click-cross-active"]); 
            ChartManager.bringToFront(false);
            //모바일 차트 - 주기 drop list 선택시 차트의 z-index 변경
        }        
    }
};
</script>

<style scoped>
.modal_wrap .alrm_lst_cont{border-top:1px solid #e0e0e0;}
.modal_wrap .alerm_lst > li{overflow:hidden;border-top:1px solid #e0e0e0;}
.modal_wrap .alerm_lst > li:first-child{border-top:none;}
.modal_wrap .alerm_lst .lst_bx{overflow:hidden;padding:15px 15px 15px;}
.modal_wrap .alerm_lst .lst_bx .tit{float:left;display:block;height:20px;line-height:19px;font-size:14px;color:#212121;font-weight:normal;}
.modal_wrap .alerm_lst .lst_bx .switch{float:right;}
.modal_wrap .alerm_lst .alerm_lst{border-top:1px solid #e0e0e0;}
.modal_wrap .alerm_lst .alerm_lst .tit{padding:0 0 0 15px;color:#616161;}
@media only screen and (orientation: landscape) { .alrm_lst_cont{height:204px;overflow-y:auto;} }
</style>