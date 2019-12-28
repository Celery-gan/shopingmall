<template>
  <div  class="wraper">
    <slot></slot>
    <template>
      <el-backtop target=".wraper" :bottom="100">
        <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;’
        line-height: 20px;
        color: #1989fa;
      }"
        >UP</div>
      </el-backtop>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style lang='scss'>
.wraper {
  height: 89vh;
  overflow-x: hidden;
}
</style>