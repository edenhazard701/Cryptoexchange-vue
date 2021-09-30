<template>
    <div class="setting_modal_bx">
        <div class="bg">&nbsp;</div>
        <div class="setting_modal">
            <div class="calender_modal">
                <strong class="src_tit">과거 시점 이동</strong>
                <div class="dadepicker_bx">
                    <div class="dadepicker_form">
                        <input type="text" class="input_calender">
                        <a href="javascript:;" class="btn_calender"><span class="blind">캘린더보기</span></a>
                    </div><!-- dadepicker_form -->
                    <a href="javascript:;" class="btn_datepicker">이동</a>
                </div><!-- dadepicker_bx -->
                <a href="#close" class="btn_setting_close" @click.prevent="$emit('close')">
                    <span class="blind">팝업닫기</span>
                </a>
            </div><!-- calender_modal -->
        </div><!-- setting_modal -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //isReal: false
            }
    },
    mounted () {
        console.log("과거시점 이동 팝업");
    },
    methods: {
    }
  };
</script>

<style scoped>
.setting_modal_bx .calender_modal{position:relative;padding:32px 40px 38px;background:#fff;box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.1);}
.setting_modal_bx .calender_modal .src_tit{display:block;width:100%;font-size:20px;color:#252525;line-height:30px;font-weight:300;clear:both;}	
.setting_modal_bx .calender_modal .dadepicker_bx{padding:16px 0 0;height:48px;}	
.setting_modal_bx .calender_modal .dadepicker_bx:before{content:"";clear:both;height:30px;display:inline-block;}
.setting_modal_bx .calender_modal .dadepicker_bx .btn_datepicker{float:left;display:block;margin:0 0 0 10px;width:50px;height:30px;line-height:29px;font-size:13px;color:#fff;text-align:center;background:#1f4ba4;}	
.setting_modal_bx .calender_modal .dadepicker_bx .dadepicker_form{float:left;width:150px;height:30px;border:1px solid #e2e0e2}	
.setting_modal_bx .calender_modal .dadepicker_bx .dadepicker_form .datepicker{display:block;width:110px;height:28px;float:left;}
.setting_modal_bx .calender_modal .dadepicker_bx .dadepicker_form .input_calender{display:block;float:left;text-indent:10px;width:110px;height:28px;line-height:28px;font-size:13px;color:#4b4b4b;}
.setting_modal_bx .calender_modal .dadepicker_bx .dadepicker_form .btn_calender{display:block;float:left;width:38px;height:28px;background:url("/static/images/chart_btn_calender.png") no-repeat center;}
</style>