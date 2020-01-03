<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <div>最近浏览</div>
    </mytop>

    <!-- 循环显示商品信息 -->
    <!-- <van-cell v-for="item in Collections" :key="item.id">
        <div class="mysearch-list">
          <div @click="gotos(item.id)">
            <img :src="item.image_path" class="search-img" />
          </div>
          <div>
            <div v-html="item.name" class="goods-name" @click="gotos(item.id)"></div>
            <div class="goods-price">
              <div class="persent-price" @click="gotos(item.id)">￥{{item.present_price}}</div>
              <div @click="delcollect(item)">
                <img src="../../assets/cuo.png" class="collect-delbtn" />
              </div>
            </div>
          </div>
        </div>
    </van-cell>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: ""
    };
  },
  components: {},
  methods: {
    // 返回上一个页面
    bcakbefore() {
      history.back();
    },
    // 点击搜索出来的商品 前往商品详情页
    gotos(val) {
      this.$router.push({
        name: "detail",
        query: {
          ids: val
        }
      });
    }
  },
  mounted() {
    if (localStorage.getItem("nickname")) {
      this.nickname = localStorage.getItem("nickname");
    }
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
</style>