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
            <div v-for="item in orderlist" :key="item.id" class="order-item">
              <van-cell class="order-cell">订单编号:{{item.order_id}}</van-cell>
              <div v-for="item1 in item.order_list" :key="item1.id">
                <van-card
                  :num="item1.count"
                  :price="item1.mallPrice"
                  :title="item1.name"
                  :thumb="item1.image_path"
                />
              </div>
              <div class="order-info">
                <div>创建时间:{{item.add_time}}</div>
                <div>收货地址:{{item.address}}</div>
                <div>共{{item.order_list.length}}件商品 合计:￥{{item.mallPrice}}</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="待支付" name="b" class="coming-soon">敬请期待~~</van-tab>
        <van-tab title="待发货" name="c" class="coming-soon">敬请期待~~</van-tab>
        <van-tab title="待收货" name="d" class="coming-soon">敬请期待~~</van-tab>
        <van-tab title="全部" name="e">
          <div class="coming-soon" v-if="orderlist.length < 1">暂无订单数据</div>
          <div v-else>
            <div v-for="item in orderlist" :key="item.id" class="order-item">
              <van-cell class="order-cell">订单编号:{{item.order_id}}</van-cell>
              <div v-for="item1 in item.order_list" :key="item1.id">
                <van-card
                  :num="item1.count"
                  :price="item1.mallPrice"
                  :title="item1.name"
                  :thumb="item1.image_path"
                />
              </div>
              <div class="order-info">
                <div>创建时间:{{item.add_time}}</div>
                <div>收货地址:{{item.address}}</div>
                <div>共{{item.order_list.length}}件商品 合计:￥{{item.mallPrice}}</div>
              </div>
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
    getMyOrders() {
      console.log(1);
      this.$api
        .getMyOrder()
        .then(res => {
          console.log(res);
          this.orderlist = res.list;
          console.log(this.orderlist);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    if (this.$route.query.activeName) {
      this.activeName = this.$route.query.activeName;
    }
    this.getMyOrders();
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
.order-item {
  width: 90%;
  background: #fafafa;
  margin: 10px auto;
  border-radius: 20px;
}
.order-cell {
  background: #f3f1f1;
  border-radius: 20px 20px 0 0;
}
.order-info {
  padding: 5px 10px;
  text-align: right;
  font-size: 14px;
  color: rgb(70, 70, 70);
  line-height: 24px;
  border-top: 1px solid rgb(224, 223, 223);
}
</style>