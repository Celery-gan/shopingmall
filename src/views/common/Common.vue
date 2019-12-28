<template>
  <div>
    <van-list>
      <router-view></router-view>
    </van-list>
    <div>
      <van-tabbar route>
        <van-tabbar-item replace to="/" icon="home-o">商城</van-tabbar-item>
        <van-tabbar-item replace to="/category" icon="search">分类</van-tabbar-item>
        <van-tabbar-item replace to="/shopingcars" icon="search">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/mine" icon="search">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home"
    };
  },
  components: {},
  methods: {
    goto(val) {
      this.$router.push(val);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>