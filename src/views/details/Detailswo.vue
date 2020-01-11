<template>
  <!-- 详情页 -->
  <div>
    <van-sticky>
      <!-- 头部 返回按钮 -->
      <mytop>
        <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      </mytop>
    </van-sticky>
    <!-- 1、轮播图 点击使show为true 显示预览 -->
    <van-swipe :autoplay="3000" class="swipe-img" :stop-propagation="false">
      <van-swipe-item v-for="(item,index) in images" :key="item.id">
        <img :src="item" class="detail-imgs" @click="show = true" />
        <div class="custom-indicator" slot="indicator">{{ index + 1 }}/4</div>
      </van-swipe-item>
    </van-swipe>
    <!-- 1.1、 预览图片 默认隐藏 当show为true时显示 -->
    <van-image-preview v-model="show" :images="images" @change="onChange">
      <template v-slot:index>{{ index + 1 }}/{{images.length}}</template>
    </van-image-preview>

    <!--2、 商品名称title + 价格desc -->
    <van-panel :title="goodsinfo.name" :desc="`￥${goodsinfo.present_price}`">
      <!-- 2.1 运费 + 商品量amount + 收藏、取消收藏collectGoods -->
      <div class="flexbtw goodsinfos">
        <div>运费：0</div>
        <div>剩余：{{goodsinfo.amount}}</div>
        <!-- 2.1.1 如果没有登录 或者 检测到该商品没有被收藏  页面显示没有收藏的状态-->
        <div v-if="nickname === ''" @click="collectGoods">
          收藏
          <van-icon name="like-o" color="red" />
        </div>
        <!-- 2.1.1 如果没有登录 或者 检测到该商品没有被收藏  页面显示没有收藏的状态-->
        <div v-else-if="isCollect === 0" @click="collectGoods">
          收藏
          <van-icon name="like-o" color="red" />
        </div>
        <!-- 2.1.2 在登录状态下 并且已收藏 可以点击取消收藏 -->
        <div v-else @click="cancelCollect">
          取消收藏
          <van-icon name="like" color="red" />
        </div>
      </div>
      <!-- 2.2 店铺名 + 进入店铺 -->
      <van-cell value="进入店铺" is-link icon="shop-o">
        <!-- 2.2.1使用 title 插槽来自定义标题 -->
        <template slot="title">
          <!-- 2.2.1.1 店铺名 -->
          <span>有名的店</span>
          <!-- 2.2.1.2 店铺标签 -->
          <van-tag type="danger">官方</van-tag>
        </template>
      </van-cell>
    </van-panel>

    <div ref="container">
      <van-sticky :container="container">
        <van-tabs @click="onClick">
          <van-tab title="商品详情"></van-tab>
          <van-tab title="商品评价"></van-tab>
        </van-tabs>
      </van-sticky>

      <div v-if="indexs===0">
        <!-- 3.1 商品详情 -->

        <div v-html="goodsinfo.detail"></div>
        <div class="null">hello</div>
      </div>
      <div v-else>
        <!-- 3.2商品评价 -->
        <div v-if="comments.length === 0" class="goodsinfo-comments">暂无数据</div>
        <div v-else>
          <!--  comments 所有的评论 -->
          <div v-for="item in comments" :key="item.id">
            <!-- 3.2.1 匿名评价 -->
            <div v-if="item.anonymous">
              <div class="comments-header">
                <div class="comments-user">
                  <img :src="item.comment_avatar" class="user-img" />
                  <div>
                    <div>{{item.comment_nickname}}</div>
                    <van-rate v-model="item.rate" readonly />
                  </div>
                </div>
                <div class="comments-time">{{item.comment_time}}</div>
              </div>
              <div class="comment-content">评论：{{item.content}}</div>
            </div>
            <!-- 3.2.2 实名评价 -->
            <div v-else>
              <div class="comments-header">
                <div class="comments-user">
                  <img :src="item.user[0].avatar" class="user-img" />
                  <div>
                    <div>用户：{{item.user[0].nickname}}</div>
                    <van-rate v-model="item.rate" readonly />
                  </div>
                </div>
                <div class="comments-time">{{item.comment_time}}</div>
              </div>
              <div class="comment-content">评论：{{item.content}}</div>
            </div>
          </div>
          <!-- comments end -->
        </div>
        <div class="null">thank you</div>
      </div>
    </div>

    <!-- 4、 下方菜单栏 -->
    <van-goods-action>
      <!-- 4.1 联系客服 -->
      <van-goods-action-icon icon="chat-o" text="客服" @click="onlineserver" />
      <!-- 4.2 前往购物车 -->
      <van-goods-action-icon v-if="amountgoods===0" icon="cart-o" text="购物车" @click="jumpto" />
      <van-goods-action-icon
        v-else-if="amountgoods>99"
        icon="cart-o"
        info="99+"
        text="购物车"
        @click="jumpto"
      />
      <van-goods-action-icon v-else icon="cart-o" text="购物车" :info="amountgoods" @click="jumpto" />
      <!-- 4.3 加入购物车 -->
      <van-goods-action-button type="warning" text="加入购物车" @click="onAddCartClicked" />
      <!-- <van-goods-action-button type="warning" text="加入购物车" @click="showbuy = true" /> -->
      <!-- 4.4 立即购买 -->
      <van-goods-action-button type="danger" text="立即购买" @click="showbuy = true" />
    </van-goods-action>
    <!-- v-model 是否显示sku
    sku 商品sku数据
    goods 商品信息
    goods-id 商品 id
    hide-stock 是否显示商品剩余库存
    hide-quota-text 是否显示限购提示
    quota	限购数，0 表示不限购
    show-add-cart-btn 是否显示加入购物车按钮-->
    <van-sku
      v-model="showbuy"
      :sku="sku"
      :startSaleNum="startSaleNum"
      :goods="goods"
      :goods-id="ids"
      :quota="quota"
      :initial-sku="initialSku"
      :hide-stock="sku.hide_stock"
      :custom-stepper-config="customStepperConfig"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  商品详情"商品评价标识 （0/1）
      indexs: 0,
      container: null,
      // 商品id
      ids: "",
      // 商品信息
      goodsinfo: {},
      // 预览图 默认隐藏
      show: false,
      // 预览图的每个图的图标
      index: 0,
      current: "",
      // 轮播图数组
      images: [],
      // 收藏与否标识
      isCollect: "",
      // 商品评价
      comments: [],
      // 本地存储的用户名
      nickname: "",
      // 购买商品页 默认隐藏
      showbuy: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {},
      customStepperConfig: {},
      // 限购量
      quota: 50,
      // 起售量
      startSaleNum: 2,
      // initialSku 默认选中的 sku
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s1: "1215",
        // 初始选中数量
        selectedNum: 1
      }
    };
  },
  components: {},
  methods: {
    // 商品详情"商品评价互换
    onClick(name, title) {
      this.indexs = name;
    },
    // 返回上一步
    bcakbefore() {
      history.back();
    },
    // 获取单个商品信息
    getGoodOne() {
      this.$api
        .goodOne(this.ids)
        .then(res => {
          if (res.goods.goodsOne !== undefined) {
            this.comments = res.goods.comment;
            // goodsinfo 获取单个商品信息
            this.goodsinfo = res.goods.goodsOne;
            // 预览图的图片数组
            this.images.push(this.goodsinfo.image);
            this.images.push(this.goodsinfo.image);
            this.images.push(this.goodsinfo.image_path);
            this.images.push(this.goodsinfo.image_path);

            this.sku.list = [
              {
                id: this.ids, // skuId，下单时后端需要
                price: this.goodsinfo.present_price * 100, // 价格（单位:分）
                stock_num: 300, // 当前 sku 组合对应的库存
                s1: "1215" // 规格类目 k_s 为 s1 的对应规格值 id
              }
            ];
            this.sku.tree = [
              {
                k: "名称", // skuKeyName：规格类目名称
                v: [
                  {
                    id: "1215",
                    name: this.goodsinfo.name,
                    imgUrl: this.goodsinfo.image,
                    previewImgUrl: this.goodsinfo.image_path
                  }
                ],
                k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
              }
            ];
            this.customStepperConfig = {
              // 自定义步进器超过限制时的回调
              handleOverLimit: data => {
                const {
                  action,
                  limitType,
                  quota,
                  quotaUsed,
                  startSaleNum
                } = data;
                if (action === "minus") {
                  this.$toast(
                    startSaleNum > 1
                      ? `${startSaleNum}件起售`
                      : "至少选择一件商品"
                  );
                } else if (action === "plus") {
                  this.$toast(`单次限购${quota}件`);
                }
              },
              // 步进器变化的回调
              handleStepperChange: currentValue => {}
            };
          } else {
            this.$dialog
              .confirm({
                title: "该商品已下架，请移步到其他相似商品"
              })
              .then(() => {
                this.$router.push("/");
              })
              .catch(() => {
                this.$router.push("/");
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查看商品是否被收藏
    getisCollection() {
      this.$api
        .isCollection(this.ids)
        .then(res => {
          // 将收藏与否的结果 赋值给 收藏与否标识
          this.isCollect = res.isCollection;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 收藏某个商品
    collectGoods() {
      if (this.nickname !== "") {
        this.$api
          .collection(this.goodsinfo)
          .then(res => {
            // 弹框提示
            this.$toast.success(res.msg);
            // 重新查看商品是否被收藏
            this.getisCollection();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$dialog
          .confirm({
            title: "未检测到登录记录，前往登录"
          })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {});
      }
    },
    // 取消收藏
    cancelCollect() {
      this.$api
        .cancelCollection(this.goodsinfo.id)
        .then(res => {
          // 弹框提示
          this.$toast.success(res.msg);
          // 重新查看商品是否被收藏
          this.getisCollection();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 预览图片翻页
    onChange(index) {
      this.index = index;
    },
    // 进入购物车
    jumpto() {
      this.$router.push("/shopingcars");
    },
    // 加入购物车
    onAddCartClicked() {
      if (localStorage.getItem("nickname")) {
        this.$api
          .addShop(this.ids)
          .then(res => {
            this.$toast.success(res.msg);
            // 获取购物车个数
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
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$dialog
          .confirm({
            title: "未检测到登录记录，前往登录"
          })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {});
      }
    },
    // 立即购买
    onBuyClicked(skuData) {
      // 如果登陆了前往支付页面
      if (localStorage.getItem("nickname")) {
        let obj = {
          count: skuData.selectedNum,
          list: this.goodsinfo
        };
        this.$store.state.payone = obj;
        this.$store.state.buyway = 1;
        this.$router.push({ name: "payMent" });
      }
      // 如果未登录 无法跳转
      else {
        this.$dialog
          .confirm({
            title: "未检测到登录记录，前往登录"
          })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {});
      }
    },
    // 在线客服 不在线
    onlineserver() {
      this.$dialog
        .confirm({
          title: "亲亲，非常抱歉，客服小叮咚出去旅游啦"
        })
        .then(() => {})
        .catch(() => {});
    }
  },
  mounted() {
    this.container = this.$refs.container;
    // 获取用户名
    if (localStorage.getItem("nickname")) {
      this.nickname = localStorage.getItem("nickname");
    }
    // 获取商品id
    if (this.$route.query.ids) {
      this.ids = this.$route.query.ids;
    }
    // 获取单个商品信息
    this.getGoodOne();
    // 查看商品是否被收藏
    this.getisCollection();
  },
  watch: {},
  computed: {
    // 获取购物车数量
    amountgoods() {
      return this.$store.state.amountgoods;
    }
  },
  // 路由守卫 浏览数据去重
  beforeRouteLeave(to, from, next) {
    if (!this.$store.state.browsing.some(item => item.id === this.ids)) {
      this.$store.state.browsing.push(this.goodsinfo);
    }
    next();
  }
};
</script>

<style scoped lang='scss'>
// 返回按钮样式
.bcakHome {
  position: absolute;
  top: 0;
  left: 0;
  // background: rgb(253, 253, 253);
  z-index: 999;
}
// 轮播图片的盒子
.swipe-img {
  width: 100%;
  height: 375px;
}
// 轮播图片
.detail-imgs {
  width: 100%;
  height: 375px;
}
// 运费 + 商品量 + 收藏、取消收藏 的盒子格式
.goodsinfos {
  margin: 0 18px;
}
// 暂无数据样式
.goodsinfo-comments {
  height: 80px;
  text-align: center;
  background: rgb(253, 253, 253);
  font-size: 14px;
  color: rgb(73, 151, 151);
}
// 评论用户头像
.user-img {
  width: 55px;
  height: 55px;
  padding-right: 5px;
}
// 用户评论盒子
.comments-header {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
}
.comment-content {
  padding: 5px 0 10px 30px;
  border-bottom: 5px solid rgb(255, 255, 255);
}
// 评论时间
.comments-time {
  font-size: 14px;
  color: #123;
}
.comments-user {
  display: flex;
  width: 200px;
}
.null {
  height: 50px;
}
</style>