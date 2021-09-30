<template>
  <!--서브 페이지 영역 -->
  <div class="sub-cont">
    <div class="success-tit">
      <h3>{{ $t('preRegister.b001-1') }} <span>{{ $t('preRegister.b001-2') }}</span></h3>
    </div>
    <div class="success-content ">
      <div class="suc-area board-line">
        <div class="join-ok-tit">
          <div class="item">
            <img src="/static/images/img/sub/join-item.png" alt="" class="pc-join-img">
            <img src="/static/images/img/sub/m/m-join-item.png" alt="" class="m-join-img">
          </div>
          <div class="ok-tit">
            <h3>{{ $t('preRegister.b002') }}</h3>
          </div>
        </div>
        <div class="suc-desc">
          <p>{{ $t('preRegister.b003') }}<br>
            {{ $t('preRegister.b004') }}<br>
            <span class="org-color">{{ $t('preRegister.b005') }}</span>
          </p>
        </div>
        <div class="rc-data">
          <table>
            <tr>
              <td class="bg-gray rc-tit">{{ $t('preRegister.b006') }}</td>
              <td class="rc-code">{{user_mail}}</td>
            </tr>
            <tr>
              <td class="bg-gray rc-tit">{{ $t('preRegister.b007') }}</td>
              <td class="rc-code">{{timeout}}</td>
            </tr>
          </table>
          <div class="btn-join">
            <router-link class="join btn-blue" to="/">{{ $t('preRegister.b008') }}</router-link>
          </div>
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
      user_mail: this.$route.params.user_mail,
      timeout: this.$route.params.timeout
    }
  }
}
</script>

<style>

</style>
