<template>
  <!-- 滑动模块 -->
  <div>
    <div>
      <!-- 页面上下平滑滚动 第一层盒子 -->
      <div class="eva-containers">
        <!-- 第二层盒子 -->
        <div class="eva-wrappers" ref="evawrapper">
          <!-- 第三层盒子 -->
          <div>
            <!-- 下拉刷新 -->
            <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
              <slot></slot>
            </van-pull-refresh>
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
    return {
      // 下拉加载标识
      isLoading: false
    };
  },
  methods: {
    // 页面上下平滑滚动
    init() {
      this.bs = new BScroll(".evawrapper", {
        scrollY: true,
        click: true,
        probeType: 3 // listening scroll hook
      });
    },
    // 下拉加载
    onRefresh() {
      setTimeout(() => {
        // this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
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
.eva-containers {
  .eva-wrappers {
    height: 620px;
    overflow: hidden;
  }
}
</style>