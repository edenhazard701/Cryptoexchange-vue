<template>
<div class="modal_wrap">
    <div class="dim"></div>
    <div class="modal_cont">
        <div class="modal_area count_modal_area">
            <strong class="pop_tit">봉 개수 설정</strong>
            <div class="count_cont">
                <input id="" name="" class="input_txt" type="number" v-model="count"/>
            </div><!-- count_cont -->
            <a href="#confirm" class="btn_modal_confirm" @click.prevent="$emit('confirm', count)">확인</a>
            <a href="#close" class="btn_modal_close" @click.prevent="$emit('close')">팝업닫기</a>
        </div><!-- modal_area -->
    </div><!-- modal_cont -->
</div>
</template>

<script>
export default {
    props: ['icnt'],
    data() {
        return {
            count: this.icnt
        }
    }
  };
</script>

<style scoped>
.modal_wrap .modal_area.count_modal_area{width:180px !important;}
.modal_wrap .modal_area .count_cont{padding:0 20px 30px !important;}
.modal_wrap .modal_area .count_cont .input_txt{text-align:center !important;}
</style>