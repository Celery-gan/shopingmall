<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <van-nav-bar title="我的评价"></van-nav-bar>
    </mytop>
    <div>
      <div class="myrate-header">
        <div>
          <img :src="userpic" class="user-img" />
          <van-rate v-model="myrates.rate" readonly />
        </div>
        <div class="comment_time">{{myrates.comment_time}}</div>
      </div>
      <div class="myrate-header">评价内容：{{myrates.content}}</div>
      <div class="myrate-body">
        <div @click="gotos(goods.id)">
          <img :src="goods.image_path" class="myrate-img" />
        </div>
        <div class="myrate-font">
          {{goods.name}}
          <van-icon name="cart-circle-o" color="red" @click="onAddCartClicked" size="30px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ratesid: "",
      myrates: {},
      userpic: "",
      goods: {}
    };
  },
  components: {},
  methods: {
    // 返回上一个页面
    bcakbefore() {
      history.back();
    },
    evaluateOne() {
      this.$api
        .evaluateOne(this.ratesid)
        .then(res => {
          this.myrates = res.evaluateOne;
          this.userpic = this.myrates.user[0].avatar;
          this.goods = this.myrates.goods[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 加入购物车
    onAddCartClicked() {
      if (localStorage.getItem("nickname")) {
        this.$api
          .addShop(this.myrates.goods[0].id)
          .then(res => {
            this.$toast.success(res.msg);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$toast.fail("您好，请先登录");
      }
    },
    // 点击搜索出来的商品 前往商品详情页
    gotos(val) {
      this.$router.push({
        name: "detail",
        query: {
          ids: val
        }
      });
    }
  },
  mounted() {
    if (this.$route.query.ratesid) {
      this.ratesid = this.$route.query.ratesid;
    }
    this.evaluateOne();
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
  width: 240px;
  margin: auto 10px;
}
.comment_time {
  font-size: 14px;
  color: gray;
  padding: 0 15px;
  margin-top: 10px;
}
</style>