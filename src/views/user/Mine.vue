<template>
  <div class="mall-bg">
    <mytop>会员中心</mytop>

    <div v-if="nickname" class="mine-header">
      <div class="mine-setting">
        <van-icon name="setting-o" color="#fff" @click="mineinfo" />
      </div>
      <div class="mine-picture">
        <van-image round src="https://img.yzcdn.cn/vant/cat.jpeg" class="mine-imgs" />
      </div>
      <div class="mine-welcome">欢迎您:{{nickname}}</div>
      <div class="mine-logout" @click="loginout">退出登录</div>
    </div>
    <div v-else class="mine-header">
      <div class="mine-picture">
        <van-image round class="mine-imgs" />
      </div>
      <div class="mine-welcome">欢迎!!</div>
      <div class="mine-logout" @click="gotologin">登录/注册</div>
    </div>

    <div class="mine-status">
      <div class="mine-condition" @click="gotoorder('b')">
        <van-icon name="cash-back-record" size="40" />
        <div>待支付</div>
      </div>
      <div class="mine-condition" @click="gotoorder('c')">
        <van-icon name="logistics" size="40" />
        <div>待发货</div>
      </div>
      <div class="mine-condition" @click="gotoorder('d')">
        <van-icon name="points" size="40" />
        <div>待收货</div>
      </div>
      <div v-if="tobeEvallen !== 0" class="mine-condition" @click="gotorate">
        <van-icon name="certificate" size="40" :info="tobeEvallen" />
        <div>待评价</div>
      </div>
      <div v-else class="mine-condition" @click="gotorate">
        <van-icon name="certificate" size="40" />
        <div>待评价</div>
      </div>
      <div class="mine-condition" @click="gotoorder('e')">
        <van-icon name="like-o" size="40" />
        <div>已完成</div>
      </div>
    </div>
    <div class="mine-cell">
      <van-cell title="全部订单" icon="description" is-link to="order" />
    </div>
    <div class="mine-cell">
      <div class="mine-none"></div>
    </div>
    <div class="mine-cell">
      <van-cell title="收藏管理" icon="star-o" is-link to="collect" />
    </div>
    <div class="mine-cell">
      <van-cell title="地址管理" icon="location-o" is-link to="address" />
    </div>
    <div class="mine-cell">
      <van-cell title="最近浏览" icon="browsing-history-o" is-link to="browes" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: "",
      tobeEvallen: 0
    };
  },
  components: {},
  methods: {
    mineinfo() {
      this.$router.push("/userdetail");
    },
    loginout() {
      this.$dialog
        .confirm({
          title: "退出登录？"
        })
        .then(() => {
          this.$api
            .loginOut({})
            .then(res => {
              console.log(res);
              localStorage.removeItem("nickname");
              localStorage.removeItem("SearchHistory");
              localStorage.removeItem("usercity");
              this.$store.state.amountgoods = 0;
              this.$toast.success("退出成功");
              this.$router.push("/");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    gotologin() {
      this.$router.push("/login");
    },
    // 前往订单
    gotoorder(val) {
      this.$router.push({ name: "order", query: { activeName: val } });
    },
    // 前往评价
    gotorate(val) {
      this.$router.push("/evaluate");
    },
    // 待评价
    tobeEvaluated() {
      if (localStorage.getItem("nickname")) {
        this.$api
          .tobeEvaluated()
          .then(res => {
            this.tobeEvallen = res.data.count;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    if (localStorage.getItem("nickname")) {
      this.nickname = localStorage.getItem("nickname");
    }
    this.tobeEvaluated();
  },
  watch: {},
  computed: {},
  beforeRouteLeave(to, from, next) {
    if (
      to.path === "/" ||
      to.path === "/login" ||
      to.path === "/category" ||
      to.path === "/shopingcars" ||
      this.nickname.trim() !== ""
    ) {
      next();
    } else {
      this.$toast.fail("您还未登录，请先登录");
    }
  }
};
</script>

<style scoped lang='scss'>
.mine-header {
  height: 220px;
  background: rgb(247, 127, 58);
  overflow: hidden;
}
.mine-picture {
  width: 100px;
  margin: 20px auto;
}
.mine-imgs {
  width: 100px;
  height: 100px;
}
.mine-setting {
  position: absolute;
  right: 5px;
  top: 40px;
}
.mine-welcome {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  // margin: 5px;
  color: #fff;
}
.mine-logout {
  text-align: center;
  color: #fff;
}
.mine-status {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  margin: 2px 0;
  font-size: 14px;
  line-height: 20px;
  background: rgb(255, 255, 255);
}
.mine-cell {
  margin: 1px 0;
}
.mine-none {
  height: 20px;
  background: rgb(255, 255, 255);
}
.mine-condition {
  color: rgb(99, 99, 99);
}
</style>