<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <div>我的评价</div>
    </mytop>
    <div>
      <van-card
        :num="myrates.goods[0].count"
        :price="myrates.goods[0].mallPrice"
        :title="myrates.goods[0].name"
        :thumb="myrates.goods[0].image"
        @click="onAddCartClicked"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myrates: {}
    };
  },
  components: {},
  methods: {
    // 返回上一个页面
    bcakbefore() {
      history.back();
    },
    // 加入购物车
    onAddCartClicked() {
      if (localStorage.getItem("nickname")) {
        this.$api
          .addShop(this.myrates.goods[0].id)
          .then(res => {
            this.$toast.success(res.msg);
            this.getCards();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$toast.fail("您好，请先登录");
      }
    }
  },
  mounted() {
    if (this.$route.query.myrate) {
      this.myrates = this.$route.query.myrate;
      console.log(this.myrates);
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 返回按钮样式
.bcakHome {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
</style>