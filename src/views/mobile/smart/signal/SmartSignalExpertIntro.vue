<template>
  <div class="SmartSignalExpertIntro">
    <div class="introduce-img" v-if="prImage">
      <img :src="prImage">
    </div>
  </div>
</template>

<script>
export default {
  /**
   * @property {string} prImage props 로 받은 이미지 URL
   */
  props: ["prImage"]
};
</script>

