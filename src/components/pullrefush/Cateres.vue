<template>
  <!-- 滑动模块 -->
  <div>
    <div>
      <!-- 页面上下平滑滚动 第一层盒子 -->
      <div class="core-containers">
        <!-- 第二层盒子 -->
        <div class="wrapper" ref="wrapper">
          <!-- 第三层盒子 -->
          <div class="scroll-content">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    // // 页面上下平滑滚动
    init() {
      this.bs = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        probeType: 3 // listening scroll hook
      });
    }
  },
  mounted() {
    this.init();
  },
  watch: {},

  computed: {}
};
</script>

<style scoped lang='scss'>
.core-containers {
  .wrapper {
    height: 530px;
    overflow: hidden;
  }
}
</style>