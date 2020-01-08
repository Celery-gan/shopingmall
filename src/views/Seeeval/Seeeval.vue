<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <van-nav-bar title="我的评价"></van-nav-bar>
    </mytop>
    <div>
      <div class="myrate-header">
        <div>
          <img src="../../assets/evaluate.jpg" class="user-img" />
          <van-rate v-model="myrates.rate" readonly />
        </div>
        <div>{{myrates.comment_time}}</div>
      </div>
      <div class="myrate-header">评价内容：{{myrates.content}}</div>
      <div class="myrate-body">
        <div>
          <img :src="arr.image_path" class="myrate-img" />
        </div>
        <div class="myrate-font">
          {{arr.name}}
          <van-icon name="shopping-cart-o" color="red" @click="onAddCartClicked" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myrates: {},
      arr: {}
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
          .addShop(this.arr.id)
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
      this.arr = this.myrates.goods[0];
      // console.log(this.myrates);
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
.myrate-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.myrate-body {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px dashed rgb(240, 240, 240);
}
.user-img {
  width: 40px;
}
.myrate-img {
  width: 100px;
}
.myrate-font {
  width: 220px;
  margin: auto 10px;
}
</style>