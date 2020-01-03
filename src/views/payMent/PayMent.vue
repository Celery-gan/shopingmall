<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <div>订单结算</div>
    </mytop>
    <div>
      <van-contact-card add-text="saf" @click="addAddress">sss</van-contact-card>
    </div>
    <div>
      <van-card :num="count" :price="goods.present_price" :title="goods.name" :thumb="goods.image" />
    </div>
    <van-submit-bar :price="piceses" button-text="提交订单" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: "",
      useraddress: "",
      usertel: "",
      chosenAddressId: "1",
      goods: "",
      count: 0
    };
  },
  components: {},
  methods: {
    bcakbefore() {
      history.back();
    },
    addAddress() {
      // 前往地址列表
      this.$router.push("/address");
    }
  },
  mounted() {
    // 获取单个商品信息
    this.goods = this.$route.query.goodsinfo;
    // 商品信息的价格取两位小数
    this.goods.present_price = this.goods.present_price.toFixed(2);
  },
  watch: {},
  computed: {
    // 计算单个商品的价格
    piceses(val) {
      return this.count * Number(this.goods.present_price) * 100;
    }
  }
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