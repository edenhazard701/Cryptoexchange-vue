<template>
 <!--서브 페이지 영역 -->
  <div class="sub-cont">
    <div class="join-item join-line">
      <div class="join-tit">
        <h3>{{ $t("Confirm.a006") }}</h3>
      </div>
      <div class="join-area">
        <div class="rc-data">
          <table>
            <tr>
              <td class="bg-gray rc-tit">{{ $t("Confirm.a007") }}</td>
              <!-- <td class="rc-code">20980TG565</td> -->
              <td class="rc-code">{{rcmd_id}}</td>
            </tr>
            <tr>
              <td class="bg-gray rc-tit">{{ $t("Confirm.a008") }}</td>
              <!-- <td class="rc-code">https://kovex.co.kr?referral_id=1cvE48</td> -->
              <td class="rc-code">http://promotion.kovex.co.kr/#/pmtJoin?referral_id={{rcmd_id}}</td>
            </tr>
          </table>
        </div>
        <div class="ok-desc">
          <p>{{ $t("Confirm.a009-1") }}<br>
            <span class="org-color my-cf">{{ $t("Confirm.a009-2") }} </span>{{ $t("Confirm.a009-3") }}</p>
        </div>
        <div class="join-ok-btn">
          <a @click="$router.push('/')" class="btn-s btn-blue">{{ $t("Confirm.a010") }}</a>
        </div>
      </div>
    </div>
  </div>
  <!--서브 페이지 영역 -->

</template>

<script>
export default {
data() {
  return {
    rcmd_id: ''
  }
},
mounted() {
  console.log('route = ', this.$route)

  let rcmd_id = this.$route.query.rcmd_id

  console.log('referral_id = ', rcmd_id)
  
  if (rcmd_id) this.rcmd_id = rcmd_id

},
}
</script>

<style>

</style>
