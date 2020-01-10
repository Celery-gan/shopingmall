<template>
  <!-- 轮播图 + 分类 + 广告图 + 滑动查看 -->
  <div>
    <!-- 轮播图  -->
    <van-swipe :autoplay="3000" class="swipe-box" :stop-propagation="false">
      <van-swipe-item v-for="(item) in images" :key="item.id" @click="gotos(item.goodsId)">
        <img :src="item.image" class="imgs" />
      </van-swipe-item>
    </van-swipe>

    <!-- 分类介绍 -->
    <div class="categorys flexbtw">
      <div v-for="(item,index) in categorys" :key="item.id" @click="gotocate(index)">
        <img :src="item.image" class="category-img" />
        <div class="mallCategory-name">{{item.mallCategoryName}}</div>
      </div>
    </div>

    <!-- 广告图片 -->
    <div>
      <img :src="advertes" class="imgs" />
    </div>

    <!-- 商品推荐 -->
    <div class="recommends">
      <div class="recommend-title">商品推荐</div>
      <!-- 滑动列表 -->
      <div class="wrappers" ref="personWrap">
        <ul class="recommend-list" ref="personTab">
          <!-- 推荐商品信息 -->
          <li v-for="item in recommends" :key="item.id" class="recommend-item">
            <!-- 商品图片 -->
            <img :src="item.image" class="recommend-img" @click="gotos(item.goodsId)" />
            <!-- 商品标题 超出部分省略号显示 -->
            <div class="recommend-name" @click="gotos(item.goodsId)">{{item.goodsName}}</div>
            <!-- 价格 -->
            <div>
              <!-- 商品现价 -->
              <span class="recommend-price">￥{{item.mallPrice}}</span>
              <!-- 商品原价 -->
              <span class="recommend-oldprice">￥{{item.price}}</span>
            </div>
            <!-- 购买组合 -->
            <div class="recommend-tobuy">
              <!-- 加入购物车 -->
              <div class="recommend-cars" @click="addShops(item.goodsId)"></div>
              <!-- 查看详情 -->
              <div class="recommend-buy" @click="gotos(item.goodsId)">查看详情</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    // 轮播图的图片
    images: {
      type: Array,
      default: () => {}
    },
    // 商品分类
    categorys: {
      type: Array,
      default: () => {}
    },
    // 商品推荐
    recommends: {
      type: Array,
      default: () => {}
    },
    // 广告图
    advertes: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
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
    // 路由的一般跳转
    gotocate(index) {
      this.$router.push({ name: "category", query: { cateindex: index } });
    },
    getData: function() {
      //此次用来加载数据（对应加载不同page下数据）
      this.page = this.page + 1;
      /*发送请求*/
    },
    // 横向滑动
    personScroll() {
      // 默认有17个li子元素，每个子元素的宽度为117px
      let width = 17 * 126;
      this.$refs.personTab.style.width = width + "px";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startX: 0,
            // 水平方向滚动
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    // 获取购物车数据
    getCards() {
     if(localStorage.getItem('nickname')){
        this.$api
        .getCard({})
        .then(res => {
          if (res.shopList.length !== 0) {
            let count = 0;
            res.shopList.map(item => {
              count += item.count;
            });
            this.$store.state.amountgoods = count;
          }
        })
        .catch(err => {
          console.log(err);
        });
     }
    },
    // 加入购物车
    addShops(ids) {
      if (localStorage.getItem("nickname")) {
        this.$api
          .addShop(ids)
          .then(res => {
            this.$toast.success(res.msg);
            this.getCards();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$toast.fail("您好，请先登录");
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.personScroll();
    });
    this.getCards();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 轮播图的盒子
.swipe-box {
  width: 100%;
  height: 167px;
}
// 所有横铺满的图片
.imgs {
  width: 100%;
  margin: 5px auto;
}
// 分类样式
.categorys {
  margin: 5px auto;
  padding: 5px 10px;
  width: 350px;
  background: rgb(255, 255, 255);
  border-radius: 10px;
}
// 分类的图片
.category-img {
  width: 50px;
  display: block;
}
// 分类的名字
.mallCategory-name {
  font-size: 12px;
  text-align: center;
}
// 推荐商品大盒子
.recommends {
  background: #fff;
  margin: 5px auto;
}
.recommend-title {
  border-bottom: 1px solid rgb(229, 231, 235);
  line-height: 30px;
  padding-left: 5px;
}
// 滚动的可视化部分
.wrappers {
  width: 100%;
  // 超出范围隐藏
  overflow: hidden;
}
// 所有滚动的推荐商品横向排列
.recommend-list {
  display: flex;
}
// 推荐商品每一项
.recommend-item {
  width: 120px;
  margin: 3px;
  background: #ffffff;
}
// 推荐商品的图片
.recommend-img {
  width: 110px;
  display: block;
  margin: 0 5px;
}
// 推荐商品的名称
.recommend-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  font-size: 12px;
  margin: 0 5px;
}
// 推荐商品的价格
.recommend-price {
  font-size: 12px;
  padding-left: 5px;
  line-height: 24px;
}
// 推荐商品的原价
.recommend-oldprice {
  font-size: 12px;
  padding-left: 5px;
  line-height: 24px;
  color: grey;
  text-decoration: line-through;
}
// 推荐商品购买按钮
.recommend-tobuy {
  margin: 0 5px;
  height: 24px;
  display: flex;
  border-radius: 5px;
  font-size: 14px;
  line-height: 24px;
  color: #fff;
}
// 推荐商品加入购物车
.recommend-cars {
  flex: 1;
  border-radius: 5px 0 0 5px;
  background: rgb(240, 236, 29) url("../../assets/shopcar.svg") no-repeat center;
  background-size: contain;
}
// 推荐商品立即购买
.recommend-buy {
  flex: 2;
  text-align: center;
  background-color: rgb(245, 59, 59);
  border-radius: 0 5px 5px 0;
}
</style>