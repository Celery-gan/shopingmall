<template>
  <div>
    <van-list>
      <router-view></router-view>
    </van-list>
    <div>
      <van-tabbar route>
        <van-tabbar-item replace to="/" icon="home-o">商城</van-tabbar-item>
        <van-tabbar-item replace to="/category" icon="search">分类</van-tabbar-item>
        <van-tabbar-item v-if="amountgoods===0" replace to="/shopingcars" icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item v-else replace to="/shopingcars" icon="cart-o" :info="amountgoods">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/mine" icon="manager-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home",
      // amountgoods: 0
    };
  },
  components: {},
  methods: {
    goto(val) {
      this.$router.push(val);
    }
  },
  mounted() {
    // this.amountgoods = localStorage.getItem("cartlen");
  },
  watch: {},
  computed: {
    amountgoods() {
      return this.$store.state.amountgoods;
    }
  }
};
</script>

<style scoped lang='scss'>
</style>