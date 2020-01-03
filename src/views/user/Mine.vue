<template>
  <div class="mall-bg">
    <mytop>会员中心</mytop>
    <div class="mine-header">
      <div class="mine-setting">
        <van-icon name="setting-o" color="#fff" @click="mineinfo" />
      </div>
      <div class="mine-picture">
        <van-image round src="https://img.yzcdn.cn/vant/cat.jpeg" class="mine-imgs" />
      </div>
      <div class="mine-welcome">欢迎您:{{nickname}}</div>
      <div class="mine-logout" @click="loginout">退出登录</div>
    </div>

    <div class="mine-status">
      <div>
        <van-icon name="cash-back-record" size="40" />
        <div>待付款</div>
      </div>
      <div>
        <van-icon name="logistics" size="40" />
        <div>待发货</div>
      </div>
      <div>
        <van-icon name="points" size="40" />
        <div>待收货</div>
      </div>
      <div>
        <van-icon name="certificate" size="40" />
        <div>待评价</div>
      </div>
      <div>
        <van-icon name="like-o" size="40" />
        <div>已完成</div>
      </div>
    </div>
    <div class="mine-cell">
      <van-cell title="全部订单" icon="description" is-link />
    </div>
    <div class="mine-cell">
      <div class="mine-none"></div>
    </div>

    <div class="mine-cell">
      <van-cell title="收藏管理" icon="star-o" is-link />
    </div>
    <div class="mine-cell">
      <van-cell title="地址管理" icon="location-o" is-link />
    </div>
    <div class="mine-cell">
      <van-cell title="最近浏览" icon="browsing-history-o" is-link />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { nickname: "" };
  },
  components: {},
  methods: {
    mineinfo() {},
    loginout() {}
  },
  mounted() {
    this.nickname = localStorage.getItem("nickname");
  },
  watch: {},
  computed: {}
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
  margin: 10px;
  color: #fff;
}
.mine-logout {
  text-align: center;
  margin: 10px;
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
</style>