<template>
  <div>
    <mytop>购物车</mytop>
    <refeshs>
      <!-- 如果未登录 页面内容提示前往登录 -->
      <div v-if="nickname === ''">
        <div class="shopcarts"></div>
        <div class="shopcarts-login" @click="tologin">
          <van-button round type="default">去登录</van-button>
        </div>
      </div>
      <!-- 如果已登录 显示购物车内容 -->
      <div v-else>
        <div class="cart-header">
          <!-- 全选按钮 -->
          <van-button type="primary" @click="checkAll" :checked="checked">全选</van-button>
          <!-- 如果有商品被选中 删除按钮 -->
          <div v-if="amountpay != 0">
            <van-button type="danger" class="cart-del" @click="delcart">删除</van-button>
          </div>
          <!-- 如果有商品被选中 去结算按钮 -->
          <div v-if="amountpay != 0">
            <van-button type="primary" class="cart-del" @click="gotopay">去结算</van-button>
          </div>
          <!-- 如果有商品被选中 金额统计 -->
          <div v-if="amountpay != 0" class="cart-paymoney">
            <div>总计：￥{{amountpay}}</div>
            <div>请确认订单</div>
          </div>
        </div>
        <!-- 商品列表 -->
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <div v-for="(item,index) in goodsinfo" :key="item.id">
            <div class="cartitem-box">
              <!-- 复选框 -->
              <van-checkbox :name="index" v-model="item.check" @click="checkitem(index)"></van-checkbox>
              <!-- 商品内容 -->
              <van-card
                :price="item.mallPrice"
                :title="item.name"
                :thumb="item.image_path"
                class="cartitem-info"
              >
                <!-- 步进器 -->
                <div slot="footer" class="cartitem-footer">
                  <van-stepper
                    v-model="item.count"
                    min="1"
                    max="10"
                    integer
                    @change="editCart(item)"
                  />
                </div>
              </van-card>
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
      this.$refs.checkboxGroup.toggleAll(this.checked);
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
          this.goodsinfo = res.shopList;
          this.goodsinfo.map(item => {
            item.mallPrice = item.mallPrice.toFixed(2);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择某个商品
    checkitem(index) {
      this.goodsinfo[index].check = !this.goodsinfo[index].check;
    },
    // 删除
    delcart() {
      let delarr = [];
      this.arr.map(item => {
        delarr.push(item.cid);
      });
      this.$api
        .deleteShop(delarr)
        .then(res => {
          this.getCards();
          this.$toast.success(res.msg);
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotopay() {
      let idlist = [];
      let count = this.arr[0].count;
      this.arr.map(item => {
        idlist.push(item.cid);
        // count += item.count;
      });
      let obj = {
        orderId: idlist,
        totalPrice: this.amountpay,
        count: count,
        list: this.arr
      };
      this.$store.state.paylists = obj;
      this.$store.state.buyway = 2;
      this.$router.push({ name: "payMent" });
    },
    // 修改商品量
    editCart(val) {
      this.$api
        .editCart(val.count, val.cid, val.mallPrice)
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
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
    },
    amountgoods() {
      let sum = 0;
      this.goodsinfo.map(item => {
        sum += item.count;
      });
      this.$store.state.amountgoods = sum;
      return sum;
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
  margin-left: 20px;
  font-size: 12px;
  line-height: 20px;
}
.cartitem-footer {
  z-index: 5;
}
</style>