<template>
  <div>
    <mytop>
      <van-nav-bar title="购物车"></van-nav-bar>
    </mytop>

    <!-- 如果未登录 页面内容提示前往登录 -->
    <div v-if="nickname === ''">
      <div class="shopcarts"></div>
      <div class="msg">亲，你还没有登录哟~~</div>
      <div class="shopcarts-login" @click="tologin">
        <van-button round type="default">去登录</van-button>
      </div>
    </div>
    <!-- 如果已登录 但是 购物车没有商品 -->
    <div v-else-if="goodsinfo.length === 0">
      <div class="shopcarts"></div>
      <div class="msg">你的购物车空空的~~~~</div>
      <div class="shopcarts-login" @click="gotos">
        <van-button round type="default">去购物</van-button>
      </div>
    </div>
    <!-- 如果已登录 且 购物车有商品 -->
    <div v-else>
      <div class="cartcontrol">
        <div class="cart-header">
          <!-- 全选按钮 -->
          <div class="check">
            <van-switch v-model="checked" @click="checkAll" />
            <div>全选</div>
          </div>
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
      </div>
      <shopres>
        <!-- 商品列表 -->
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <div v-for="(item,index) in goodsinfo" :key="item.id">
            <div class="cartitem-box">
              <!-- 复选框 -->
              <van-checkbox :name="index" v-model="item.check" @click="checkitem(item)"></van-checkbox>
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
                    max="50"
                    integer
                    @change="editCart(item)"
                  />
                </div>
              </van-card>
            </div>
          </div>
        </van-checkbox-group>
      </shopres>
    </div>
  </div>
</template>

<script>
import shopres from "../../components/pullrefush/shopcarRes";
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
  components: {
    shopres
  },
  methods: {
    gotos() {
      this.$router.push("/");
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
    // 选择某个商品
    checkitem(val) {
      val.check = !val.check;
      this.checked = this.goodsinfo.every(item => {
        return item.check;
      });
    },
    // 删除
    delcart() {
      this.$dialog
        .confirm({
          title: "确认从购物车删除选中的商品吗？"
        })
        .then(() => {
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
        })
        .catch(() => {});
    },
    // 去结算页面
    gotopay() {
      let idlist = [];
      let count = this.arr[0].count;
      this.arr.map(item => {
        idlist.push(item.cid);
      });
      let flag = this.arr.every(item => {
        return item.count >= 2;
      });
      if (this.arr.every(item => item.count >= 2)) {
        let obj = {
          orderId: idlist,
          totalPrice: this.amountpay,
          count: count,
          list: this.arr
        };
        this.$store.state.paylists = obj;
        this.$store.state.buyway = 2;
        this.$router.push({ name: "payMent" });
      } else {
        this.$toast.fail("本商城所有商品2件起售");
      }
    },
    // 修改商品量
    editCart(val) {
      let count = 0;
      this.goodsinfo.map(item => {
        count += item.count;
      });
      this.$store.state.amountgoods = count;
      this.$api
        .editCart(val.count, val.cid, val.mallPrice)
        .then(res => {
          if (!this.goodsinfo.some(item => item.check)) {
            this.getCards();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取购物车数据
    getCards() {
      if (localStorage.getItem("nickname")) {
        this.$api
          .getCard({})
          .then(res => {
            this.cartlen = res.shopList.length;
            this.goodsinfo = res.shopList;
            let count = 0;
            if (this.goodsinfo !== undefined) {
              this.goodsinfo.map(item => {
                count += item.count;
                item.mallPrice = item.mallPrice.toFixed(2);
              });
              this.$store.state.amountgoods = count;
            }
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
  margin-left: 20px;
  font-size: 12px;
  line-height: 20px;
}
.cartitem-footer {
  z-index: 5;
}
.check {
  display: flex;
  align-items: center;
}
.msg {
  margin: 10px auto;
  text-align: center;
  width: 200px;
}
.cartcontrol {
  // background: rgb(241, 238, 238);
  line-height: 48px;
}
</style>