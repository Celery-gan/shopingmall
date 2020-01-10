<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>


<script>
// 导入better-scroll
import BScroll from "better-scroll";
export default {
  props: {
    // 接收父组件传递的参数
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: Boolean,
      default: false
    }  
  },
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {
    // 1.滚动效果 创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 1.1、 probeType：监听滚动的位置；可选值：1、2、3;
      probeType: this.probeType,
      // 1.2、click:默认值：false  better-scroll 默认会阻止浏览器的原生 click 事件。
      // 当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
      click: true,
      //1.3、pullUpLoad：默认值：false // 如果需要监听滚动底部事件，设置为true
      pullUpLoad: this.pullUpLoad,
      //1.4 pullDownRefresh  如果需要监听下拉事件，设置为true
      pullDownRefresh: this.pullDownRefresh
    });
    //2. 实时监听滚动，来实现返回顶部按钮的功能
    this.scroll.on("scroll", position => {
      // 将监听的数据坐标发射出去，父组件用来接收处理
      this.$emit("scroll", position);
    });
    // 3.实现加载更多 监听上拉事件
    this.scroll.on("pullingUp", () => {
      //当滚动到底部的时候调用。
      this.$emit("pullingUp");
    });
    // 3.实现加载更多 监听下拉事件
    this.scroll.on("pullingDown", () => {
      //当滚动到底部的时候调用。
      this.$emit("pullingDown");
    });
  },

  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>