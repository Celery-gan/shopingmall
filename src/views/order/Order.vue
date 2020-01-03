<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <div>我的订单</div>
    </mytop>
    <div>
      <van-tabs v-model="activeName" sticky class="order-active">
        <van-tab title="全部" name="a">
          <div class="coming-soon" v-if="orderlist.length < 1">暂无订单数据</div>
          <div v-else>
            <div v-for="item in orderlist" :key="item.id">
              <van-cell>{{item}}</van-cell>
            </div>
          </div>
        </van-tab>
        <van-tab title="待支付" name="b" class="coming-soon">敬请期待~~</van-tab>
        <van-tab title="待发货" name="c" class="coming-soon">敬请期待~~</van-tab>
        <van-tab title="待收货" name="d" class="coming-soon">敬请期待~~</van-tab>
        <van-tab title="全部" name="e">
          <div class="coming-soon" v-if="orderlist.length < 1">暂无订单数据</div>
          <div v-else>
            <div v-for="item in orderlist" :key="item.id">
              <van-cell>{{item}}</van-cell>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 默认第一项
      activeName: "a",
      // 订单列表
      orderlist: []
    };
  },
  components: {},
  methods: {
    // 返回上一个页面
    bcakbefore() {
      history.back();
    },
    getOrderNum() {
      this.$api
        .getOrderNum()
        .then(res => {
          this.orderlist = res.numList;
          console.log(this.orderlist);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getOrderNum();
    if (this.$route.query.activeName) {
      this.activeName = this.$route.query.activeName;
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
.order-active {
  width: 370px;
}
.coming-soon {
  width: 80%;
  margin: 10px auto;
  text-align: center;
  color: grey;
}
</style>