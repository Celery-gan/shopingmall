<template>
  <div class="back-top" @click="backtopclick">
   <span>UP</span>
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    backtopclick() {}
  }
};
</script>

<style scoped lang='scss'>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 60px;
}
.back-top span {
  width: 43px;
}
</style>

