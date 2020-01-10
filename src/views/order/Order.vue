<template>
  <div>
    <!-- 头部 -->
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <van-nav-bar title="我的订单"></van-nav-bar>
    </mytop>
    <div>
      <!-- 订单信息 -->
      <van-tabs v-model="activeName" sticky :swipe-threshold="swipe">
        <orderes>
          <!-- 全部页面 -->
          <van-tab title="全部" name="a">
            <!-- 如果没有订单信息 显示暂无订单数据 -->
            <div class="coming-soon" v-if="orderlist.length < 1">暂无订单数据</div>
            <!-- 如果有订单信息 显示订单信息 -->
            <div v-else>
              <div v-for="item in orderlist" :key="item.id" class="order-item">
                <!-- 订单的头 -->
                <van-cell class="order-cell">
                  <div class="flexbtw">
                    <div>订单编号:{{item.order_id}}</div>
                    <div class="deal-close">交易完成</div>
                  </div>
                </van-cell>
                <!-- 订单商品信息 -->
                <div v-for="item1 in item.order_list" :key="item1.id">
                  <van-card
                    :num="item1.count"
                    :price="item1.mallPrice"
                    :title="item1.name"
                    :thumb="item1.image_path"
                  />
                </div>
                <!-- 订单创建时间等尾部信息 -->
                <div class="order-info">
                  <div>创建时间:{{item.add_time}}</div>
                  <div>收货地址:{{item.address}}</div>
                  <div>共{{item.order_list.length}}件商品 合计:￥{{item.mallPrice}}</div>
                </div>
              </div>
            </div>
          </van-tab>
          <!-- 待支付页面 -->
          <van-tab title="待支付" name="b" class="coming-soon">敬请期待~~</van-tab>
          <!-- 待发货页面 -->
          <van-tab title="待发货" name="c" class="coming-soon">敬请期待~~</van-tab>
          <!-- 待收货页面 -->
          <van-tab title="待收货" name="d" class="coming-soon">敬请期待~~</van-tab>
          <!-- 已完成页面 -->
          <van-tab title="已完成" name="e">
            <!-- 如果没有订单信息 显示暂无订单数据 -->
            <div class="coming-soon" v-if="orderlist.length < 1">暂无订单数据</div>
            <!-- 如果有订单信息 显示订单信息 -->
            <div v-else>
              <div v-for="item in orderlist" :key="item.id" class="order-item">
                <!-- 订单的头 -->
                <van-cell class="order-cell">
                  <div class="flexbtw">
                    <div>订单编号:{{item.order_id}}</div>
                    <div class="deal-close">交易完成</div>
                  </div>
                </van-cell>
                <!-- 订单商品信息 -->
                <div v-for="item1 in item.order_list" :key="item1.id">
                  <van-card
                    :num="item1.count"
                    :price="item1.mallPrice"
                    :title="item1.name"
                    :thumb="item1.image_path"
                  />
                </div>
                <!-- 订单创建时间等尾部信息 -->
                <div class="order-info">
                  <div>创建时间:{{item.add_time}}</div>
                  <div>收货地址:{{item.address}}</div>
                  <div>共{{item.order_list.length}}件商品 合计:￥{{item.mallPrice}}</div>
                </div>
              </div>
            </div>
          </van-tab>
        </orderes>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import orderes from "../../components/pullrefush/payRes";
export default {
  data() {
    return {
      // 默认第一项
      activeName: "a",
      // 订单列表
      orderlist: [],
      swipe:5
    };
  },
  components: {
    orderes
  },
  methods: {
    // 返回上一个页面
    bcakbefore() {
      this.$router.push("/mine");
    },
    // 获取用户全部订单信息
    getMyOrders() {
      this.$api
        .getMyOrder()
        .then(res => {
          // 订单列表
          this.orderlist = res.list;
          // 将订单列表中的价格信息改为2位小数类型
          this.orderlist.map(item => {
            item.mallPrice = item.mallPrice.toFixed(2);
            item.order_list.map(item1 => {
              item1.mallPrice = item1.mallPrice.toFixed(2);
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    //  接受来自我的页面的activeName 进入相应子页面
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
// 暂无订单 内容居中
.coming-soon {
  width: 80%;
  margin: 10px auto;
  text-align: center;
  color: grey;
}
// 每一个订单
.order-item {
  width: 90%;
  background: #fafafa;
  margin: 10px auto;
  border-radius: 20px;
}
// 订单编号行
.order-cell {
  background: #f3f1f1;
  border-radius: 20px 20px 0 0;
}
// 订单创建时间等下方信息 向右对齐
.order-info {
  padding: 5px 10px 10px;
  text-align: right;
  font-size: 14px;
  color: rgb(70, 70, 70);
  line-height: 24px;
  border-top: 1px solid rgb(224, 223, 223);
}
// 交易完成 字体颜色突出
.deal-close {
  color: rgb(250, 144, 94);
}
</style>