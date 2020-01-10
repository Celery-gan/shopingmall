<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <div>订单结算</div>
    </mytop>
    <payres>
      <!-- 收货信息  -->
      <!-- 如果有地址 显示地址 -->
      <div v-if="addlist.id !== undefined">
        <van-cell icon="location-o" is-link @click="gotoaddress">
          <div class="flexbtw">
            <div>{{`收货人：${addlist.name}`}}</div>
            <div>{{`联系方式：${addlist.tel}`}}</div>
          </div>
          <div>{{`收货地址：${addlist.address}`}}</div>
        </van-cell>
      </div>
      <!-- 如果没有地址 前往添加地址 -->
      <div v-else>
        <van-cell icon="location-o" is-link @click="gotoaddress">
          <div>添加地址</div>
        </van-cell>
      </div>
      <!-- 商品信息 -->
      <div>
        <!-- 如果是直接购买 页面内容 -->
        <van-card
          v-if="this.buyway === 1"
          :num="buynum"
          :price="goodsone.present_price"
          :title="goodsone.name"
          :thumb="goodsone.image_path"
        />
        <!-- 购物车购买 页面内容 -->
        <div v-else v-for="item in goods" :key="item.id">
          <van-card
            :num="item.count"
            :price="item.mallPrice"
            :title="item.name"
            :thumb="item.image_path"
          />
        </div>
        <!--  -->
      </div>
    </payres>
    <!-- 提交订单 -->
    <van-submit-bar :price="piceses" button-text="提交订单" @submit="placeOrder" />
  </div>
</template>

<script>
import payres from "../../components/pullrefush/payRes";
export default {
  data() {
    return {
      // 购买对应的商品信息数组
      goods: [],
      // 默认地址对象
      DefaultAddress: {},
      // 默认地址修改后的地址对象
      addlist: {},
      // 直接购买数量
      buynum: "",
      goodsone: {}
    };
  },
  components: {
    payres
  },
  methods: {
    // 返回上页
    bcakbefore() {
      this.$dialog
        .confirm({
          title: "确认取消购买"
        })
        .then(() => {
          history.back();
        })
        .catch(() => {});
    },
    // 获取默认地址
    getDefaultAddress() {
      this.$api
        .getDefaultAddress()
        .then(res => {
          //如果有默认地址 将该默认地址交给默认地址对象
          if (res.defaultAdd !== null) {
            this.DefaultAddress = res.defaultAdd;
            // 默认地址修改后的地址对象 以便页面获取显示
            this.addlist = {
              name: this.DefaultAddress.name,
              address: `${this.DefaultAddress.province}${this.DefaultAddress.city}${this.DefaultAddress.county}${this.DefaultAddress.addressDetail}`,
              id: this.DefaultAddress._id,
              tel: this.DefaultAddress.tel,
              isDefault: this.DefaultAddress.isDefault
            };
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提交订单
    placeOrder() {
      // 当有地址时可以提交
      if (this.addlist.id !== undefined) {
        let obj = {};
        // 如果来自购物车 buyway=2
        if (this.buyway === 2) {
          obj = {
            tel: this.addlist.tel,
            address: this.addlist.address,
            count: this.paylist.count,
            idDirect: Boolean(false),
            orderId: this.paylist.orderId
          };
        }
        // 如果来自立即购买 buyway=1
        else if (this.buyway === 1) {
          let ids = [];
          ids.push(this.goodsone.id);
          // console.log(ids);
          obj = {
            tel: this.addlist.tel,
            address: this.addlist.address,
            count: this.buynum,
            idDirect: true,
            orderId: ids
          };
        }

        this.$dialog
          .confirm({
            title: "确认购买当前商品？"
          })
          .then(() => {
            this.$api
              .placeOrder(obj)
              .then(res => {
                // 弹框提示 返回首页
                this.$toast.success(res.msg);
                this.$router.push("/shopingcars");
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {});
      }
      // 如果没有地址 提示添加收货地址
      else {
        this.$toast.fail("请选择收货地址");
      }
    },
    // 前往地址列表
    gotoaddress() {
      this.$router.push("/address");
    }
  },
  mounted() {
    // console.log(this.buyway);
    // 如果来自立即购买 buyway=1
    if (this.buyway === 1) {
      this.buynum = this.payone.count;
      this.goodsone = this.payone.list;
      this.goodsone.present_price = Number(this.goodsone.present_price).toFixed(
        2
      );
    }
    // 如果来自购物车 buyway=2
    else if (this.buyway === 2) {
      this.buynum = this.paylists.count;
      this.paylist = this.paylists;
      this.goods = this.paylists.list;
    }
    // 获得地址信息
    if (this.addresslist.id === undefined) {
      this.getDefaultAddress();
    } else {
      this.addlist = this.addresslist;
    }
  },
  watch: {},
  computed: {
    addresslist() {
      return this.$store.state.addresslist;
    },
    buyway() {
      return this.$store.state.buyway;
    },
    paylists() {
      return this.$store.state.paylists;
    },
    payone() {
      return this.$store.state.payone;
    },
    // 计算商品的价格
    piceses() {
      if (this.buyway === 1) {
        let sum = 0;
        sum += this.buynum * this.goodsone.present_price;
        return sum * 100;
      } else if (this.buyway === 2) {
        return this.paylists.totalPrice * 100;
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