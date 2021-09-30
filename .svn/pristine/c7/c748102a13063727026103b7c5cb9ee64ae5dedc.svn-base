<template>
<div class="setting_modal_bx">
	<div class="bg">&nbsp;</div>
	<div class="setting_modal">
		<div class="alerm_modal">
			<div class="pop_cont">
				<strong class="src_tit"><!--알림선 설정-->{{$t('html5chart.alertlinesett')}}</strong>
				<ul class="modal_form_lst">
					<li v-for="(item, i) in alermProps">
						<strong class="tit">{{item.text}}</strong>
						<span class="rdo_check">
							<label :class="{active: !item.value}" >
								<span class="txt">OFF</span>
								<input class="check_rdo" value="false" type="radio" @click="$emit('send-alerm-prop', {key: i, value: false})"/>
							</label>
							<label :class="{active: item.value}">
								<span class="txt">ON</span>
								<input class="check_rdo" value="true" type="radio" @click="$emit('send-alerm-prop', {key: i, value: true})"/>
							</label>
						</span>
					</li>					
				</ul><!-- modal_form_lst -->
			</div><!-- pop_cont -->
			<a href="#confirm" class="btn_setting_confirm" @click.prevent="$emit('confirm')"><!--확인버튼-->{{$t('html5chart.okbtn')}}</a>
			<a href="#close" class="btn_setting_close" @click.prevent="$emit('close')">
				<span class="blind"><!--팝업닫기-->{{$t('html5chart.closebtn')}}</span>
			</a>
		</div><!-- anal_setting_modal -->
		
	</div><!-- setting_modal -->
</div>
</template>

<script>
export default {
	props: ['alermProps']
}
</script>

<style scoped>
.alerm_modal {position:relative;background:#fff;box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.1);}
.alerm_modal .src_tit{display:block;padding:24px 30px 14px;width:100%;font-size:20px;color:#252525;line-height:30px;font-weight:300;clear:both;border-bottom:1px solid #e0e0e0;}	
.alerm_modal .pop_cont{padding:0 0 30px;}
.alerm_modal .modal_form_lst{padding:20px 30px 0;}
.alerm_modal .modal_form_lst > li{overflow:hidden;width:auto;margin:15px 0 0;}
.alerm_modal .modal_form_lst > li:first-child{margin:0;}
.alerm_modal .modal_form_lst .tit{display:block;margin:0 20px 0 0;float:left;height:30px;line-height:29px;font-weight:normal;font-size:14px;color:#4b4b4b;}
.alerm_modal .modal_form_lst .rdo_check{float:right;}
.alerm_modal .modal_form_lst .rdo_check > label{cursor:pointer;}
.alerm_modal .modal_form_lst > li.depth02_lst > .tit{float:none;display:block;margin:-7px 0 0;width:100%;}
.alerm_modal .modal_form_lst > li.depth02_lst .modal_form_lst{padding:6px 0 0 36px;width:auto;}
</style>