<template>
  <!-- 城市菜单 -->

  <div class="mall-bg">
    <van-sticky>
      <mytop>
        <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      </mytop>
    </van-sticky>
    <!-- 预览图片 默认隐藏 当show为true时显示 -->
    <van-image-preview v-model="show" :images="images" @change="onChange">
      <template v-slot:index>{{ index + 1 }}/{{images.length}}</template>
    </van-image-preview>
    <!-- 轮播图 点击使show为true 显示预览 -->
    <van-swipe :autoplay="3000" class="swipe-img">
      <van-swipe-item v-for="(item) in images" :key="item.id" @click="show = true">
        <img :src="item" class="detail-imgs" />
      </van-swipe-item>
    </van-swipe>
    <!-- 搜索名称 + 价格 -->
    <van-panel :title="goodsinfo.name" :desc="`￥${goodsinfo.present_price}`">
      <!-- 运费 + 商品量 + 收藏、取消收藏 -->
      <div class="flexbtw goodsinfos">
        <div>运费：0</div>
        <div>剩余：{{goodsinfo.amount}}</div>
        <div v-if="isCollect===0" @click="collectGoods()">
          收藏
          <van-icon name="like-o" />
        </div>
        <div v-else @click="cancelCollect()">
          取消收藏
          <van-icon name="like" />
        </div>
      </div>

      <van-cell value="进入店铺" is-link icon="shop-o">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span>有名的店</span>
          <van-tag type="danger">官方</van-tag>
        </template>
      </van-cell>
    </van-panel>
    <van-tabs>
      <van-tab v-for="index1 in 2" :key="index1">
        <div slot="title">
          <van-icon v-if="index1===1">商品详情</van-icon>
          <van-icon v-else>商品评价</van-icon>
        </div>
        <div v-if="index1===1">
          <!-- 商品详情 -->
          <div v-html="goodsinfo.detail"></div>
        </div>
        <div v-else>
          <!-- 商品评价 -->
          <!-- <div v-if=''>
            
          </div>-->
        </div>
      </van-tab>
    </van-tabs>
    <!-- 下方菜单栏 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
      <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" />
      <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品id
      ids: "",
      // 商品信息
      goodsinfo: "",
      // 预览图 默认隐藏
      show: false,
      // 预览图的每个图的图标
      index: 0,
      // 轮播图数组
      images: [],
      // 收藏与否标识
      isCollect: ""
    };
  },
  components: {},
  methods: {
    // 直接返回主页
    bcakbefore() {
      history.back();
    },
    // 获取单个商品信息
    getGoodOne() {
      this.$api
        .goodOne(this.ids)
        .then(res => {
          console.log(res.goods.comment);
          this.goodsinfo = res.goods.goodsOne;
          this.images.push(this.goodsinfo.image);
          this.images.push(this.goodsinfo.image_path);
          console.log(this.goodsinfo);
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
          // console.log(res);
          // 将收藏与否的结果 赋值给 收藏与否标识
          this.isCollect = res.isCollection;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 收藏某个商品
    collectGoods() {
      if (localStorage.getItem("nickname")) {
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
        this.$toast.fail("未检测到登录记录，请先登录");
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
    onChange(index) {
      this.index = index;
    }
  },
  mounted() {
    this.ids = this.$route.query.ids;
    // 获取单个商品信息
    this.getGoodOne();
    // 查看商品是否被收藏
    this.getisCollection();
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
  z-index: 2;
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
</style>