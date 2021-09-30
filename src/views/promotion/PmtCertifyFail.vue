<template>
  <div class="sub-cont">
    <div class="cf join-line">
      <div class="cf-area">
        <p>{{ $t("Confirm.a003") }}<br>
          {{ $t("Confirm.a004") }}</p>
      </div>
      <div class="cf-btn">
        <a @click="$router.push('/pmtJoin')" class="btn-s btn-blue">{{ $t("Confirm.a005") }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
