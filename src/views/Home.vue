<template>
  <!-- 滑动模块 -->
  <div>
    <div class="mall-bg">
      <div v-if="nu1!==1">
        <!-- 头部 -->
        <van-sticky>
          <mytop>
            <homeheader :nu1="nu1" @send="send"></homeheader>
          </mytop>
        </van-sticky>
        <!-- 主体部分 -->
        <!-- 页面上下平滑滚动 + 下拉刷新 -->
        <refeshs>
          <!-- 轮播图 + 分类 + 广告图 + 滑动查看 -->
          <viewpager
            :images="images"
            :categorys="categorys"
            :recommends="recommends"
            :advertes="advertes"
          ></viewpager>
          <!-- 楼层 + 热门 -->
          <floors
            :floorNames="floorNames"
            :flinfo1="flinfo1"
            :flinfo2="flinfo2"
            :flinfo3="flinfo3"
            :hotgood="hotgood"
          ></floors>
        </refeshs>
      </div>
      <div v-else>
        <homesearch :nu1="nu1" @send="send"></homesearch>
      </div>
    </div>
  </div>
</template>

<script>
// 轮播图 + 分类 + 广告图 + 滑动查
import viewpager from "../components/home/Viewpager.vue";
// 楼层 + 热门
import floors from "../components/home/Floors.vue";
//没有搜索时的头部内容
import homeheader from "../components/home/HomeHeader";
//进入搜索时的页面内容
import homesearch from "../components/home/HomSearch";
import refeshs from "./../components/pullrefush/Refeshs";
import { longStackSupport } from "q";
export default {
  components: {
    viewpager,
    floors,
    homeheader,
    homesearch,
    refeshs
  },
  data() {
    return {
      // 定位城市
      city: "",
      // 搜索标识
      nu1: -1,
      // 轮播图的图片
      images: [],
      // 商品分类
      categorys: [],
      // 广告图
      advertes: "",
      // 商品推荐
      recommends: [],
      // 楼层名称
      floorNames: {},
      // 1f
      flinfo1: [],
      // 2f
      flinfo2: [],
      // 3f
      flinfo3: [],
      // 热门商品
      hotgood: []
    };
  },
  methods: {
    // 获取需要的数据
    getrecommend() {
      this.$api
        .recommend()
        .then(res => {
          // console.log(res);
          // 轮播图的图片
          this.images = res.data.slides;
          // 分类样式
          this.categorys = res.data.category;
          this.$store.state.category = this.categorys;
          // 广告图
          this.advertes = res.data.advertesPicture.PICTURE_ADDRESS;
          // 商品推荐
          this.recommends = res.data.recommend;
          // 楼层名称
          this.floorNames = res.data.floorName;
          // 1f
          this.flinfo1 = res.data.floor1;
          // 2f
          this.flinfo2 = res.data.floor2;
          // 3f
          this.flinfo3 = res.data.floor3;
          // 热门商品
          this.hotgood = res.data.hotGoods;
        })
        .catch(err => {
          console.log(err);
        });
    },
    send(nu1) {
      this.nu1 = nu1;
    },
   
  },
  mounted() {
    this.getrecommend();

  },
  watch: {},

  computed: {}
};
</script>

<style lang='scss'>
.mall-bg {
  line-height: 30px;
  font-size: 16px;
}
.flexbtw {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.flexeve {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
.searchs {
  width: 71%;
  padding: 0 2px;
}
.citys {
  width: 26%;
  font-size: 14px;
  margin: 3px;
}
//搜索历史
.search-His {
  margin: 2px 10px;
  font-size: 14px;
}
</style>