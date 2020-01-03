<template>
  <div>
    <mytop>购物车</mytop>
    <refeshs>
      <div v-if="nickname === ''">
        <div class="shopcarts"></div>
        <div class="shopcarts-login" @click="tologin">
          <van-button round type="default">去登录</van-button>
        </div>
      </div>
      <div v-else>
        <div class="cart-header">
          <van-button type="primary" @click="checkAll" :checked="checked">全选</van-button>
          <div v-if="amountpay != 0">
            <van-button type="danger" class="cart-del" @click="delcart">删除</van-button>
          </div>
          <div v-if="amountpay != 0" class="cart-paymoney">
            <div>总计：￥{{amountpay}}</div>
            <div>请确认订单</div>
          </div>
        </div>
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <div v-for="(item,index) in goodsinfo" :key="item.id">
            <div class="cartitem-box">
              <van-checkbox :name="index" v-model="item.check" @click="checkitem(index)"></van-checkbox>
              <van-card
                :num="item.count"
                :price="item.mallPrice"
                :title="item.name"
                :thumb="item.image_path"
                class="cartitem-info"
                @click="gotos(item.cid)"
              />
            </div>
          </div>
        </van-checkbox-group>
      </div>
    </refeshs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: "",
      goodsinfo: [],
      result: [],
      checked: false,
      arr: []
    };
  },
  components: {},
  methods: {
    // 路由跳转到详情页 传参为商品id
    gotos(val) {
      this.$router.push({
        name: "detail",
        query: {
          ids: val
        }
      });
    },
    // 全选
    checkAll() {
      this.checked = !this.checked;
      this.goodsinfo.map(item => {
        item.check = this.checked;
      });
    },
    // 前往登录
    tologin() {
      this.$router.push("/login");
    },
    // 获取购物车数据
    getCards() {
      this.$api
        .getCard({})
        .then(res => {
          // console.log(res.shopList);
          this.goodsinfo = res.shopList;
          this.goodsinfo.map(item => {
            item.mallPrice = item.mallPrice.toFixed(2);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择某个
    checkitem(index) {
      // console.log(index);
      this.goodsinfo[index].check = !this.goodsinfo[index].check;
    },
    // 删除
    delcart() {
      this.arr.map(item => {
        console.log(item.cid);
        this.$api
          .deleteShop(item.cid)
          .then(res => {
            console.log(res);
            // this.getCards();
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  },
  mounted() {
    if (localStorage.getItem("nickname")) {
      this.nickname = localStorage.getItem("nickname");
    }
    this.getCards();
  },
  watch: {},

  computed: {
    amountpay() {
      let sum = 0;
      if (this.goodsinfo) {
        this.arr = this.goodsinfo.filter(item => {
          return item.check === true;
        });
        this.arr.map(item => {
          // console.log(item);
          if (item) {
            sum += Number(item.mallPrice) * item.count;
          }
        });
      }
      return sum.toFixed(2);
    }
  }
};
</script>

<style scoped lang='scss'>
.shopcarts {
  width: 180px;
  height: 180px;
  margin: 30px auto;
  background: rgb(226, 217, 217) url("../../assets/shop.png") no-repeat center;
  border-radius: 50%;
  align-items: center;
}
// 去登录按钮设置
.shopcarts-login {
  width: 80px;
  margin: 10px auto;
}
.cartitem-box {
  display: flex;
}
.cartitem-info {
  width: 90%;
}
.cart-header {
  display: flex;
  margin: 5px 10px;
}
.cart-del {
  margin: 0 5px;
}
.cart-paymoney {
  margin-left: 90px;
  font-size: 12px;
  line-height: 20px;
}
</style>