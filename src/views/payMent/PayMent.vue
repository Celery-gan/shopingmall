<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <div>订单结算</div>
    </mytop>
    <refeshs>
      <div>
        <!-- <van-cell> -->
        <van-cell icon="location-o" is-link>
          <div class="flexbtw">
            <div>{{`收货人：${addlist.name}`}}</div>
            <div>{{`联系方式：${addlist.tel}`}}</div>
          </div>
          <div>{{`收货地址：${addlist.address}`}}</div>
        </van-cell>
      </div>
      <div>
        <!-- 直接购买 -->
        <van-card
          v-if="this.$route.query.goodsinfo"
          :num="buynum"
          :price="goods.present_price"
          :title="goods.name"
          :thumb="goods.image_path"
        />
        <!-- 购物车购买 -->
        <div v-else v-for="item in goods" :key="item.id">
          <van-card
            :num="item.count"
            :price="item.mallPrice"
            :title="item.name"
            :thumb="item.image_path"
          />
        </div>
      </div>
    </refeshs>
    <van-submit-bar :price="piceses" button-text="提交订单" @submit="placeOrder" />
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
      goods: [],
      count: 1,
      DefaultAddress: {},
      addlist: {},
      buynum: ""
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
    },
    getDefaultAddress() {
      this.$api
        .getDefaultAddress()
        .then(res => {
          this.DefaultAddress = res.defaultAdd;
          this.addlist = {
            name: this.DefaultAddress.name,
            address: `${this.DefaultAddress.province}${this.DefaultAddress.city}${this.DefaultAddress.county}${this.DefaultAddress.addressDetail}`,
            id: this.DefaultAddress._id,
            tel: this.DefaultAddress.tel,
            isDefault: this.DefaultAddress.isDefault
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    placeOrder() {
      let obj = {};
      if (this.$route.query.paylist) {
        obj = {
          tel: this.addlist.tel,
          address: this.addlist.address,
          count: this.paylist.count,
          idDirect: "",
          totalPrice: this.paylist.totalPrice,
          orderId: this.paylist.orderId
        };
      } else if (this.$route.query.goodsinfo) {
        let ids = [];
        ids.push(this.goods.id);
        obj = {
          tel: this.addlist.tel,
          address: this.addlist.address,
          count: this.buynum,
          idDirect: true,
          totalPrice: this.piceses,
          orderId: ids
        };
      }
      console.log(obj);
      this.$api
        .placeOrder(obj)
        .then(res => {
          // console.log(res);
          // 如果是来自购物车的数据 购物车这些商品信息删除
          if (res.code === 200 && this.$route.query.paylist) {
            this.$api
              .deleteShop(this.paylist.orderId)
              .then(res1 => {})
              .catch(err1 => {
                console.log(err1);
              });
          }
          // 弹框提示 返回首页
          this.$toast.success(res.msg);
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    // 获取单个商品信息
    if (this.$route.query.goodsinfo) {
      this.buynum = this.$route.query.goodsinfo.count;
      console.log(this.buynum);
      this.goods = this.$route.query.goodsinfo.list;
      // // 商品信息的价格取两位小数
      this.goods.present_price = Number(this.goods.present_price).toFixed(2);
      console.log(this.goods);
    }
    // 如果传过来数组
    if (this.$route.query.paylist) {
      this.buynum = this.$route.query.paylist.count;
      this.paylist = this.$route.query.paylist;
      console.log(this.paylist);
      this.goods = this.$route.query.paylist.list;
      console.log(this.goods);
    }
    // 获得默认地址
    this.getDefaultAddress();
  },
  watch: {},
  computed: {
    // 计算商品的价格
    piceses() {
      if (this.$route.query.goodsinfo) {
        let sum = 0;
        sum += this.buynum * this.goods.present_price;
        return sum * 100;
      } else if (this.$route.query.paylist) {
        return this.$route.query.paylist.totalPrice * 100;
      }
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
.pay-address {
  height: 100px;
}
</style>